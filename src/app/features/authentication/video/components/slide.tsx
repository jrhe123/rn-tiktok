import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Animated as AnimatedRN,
  Dimensions,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import isEqual from 'react-fast-compare';
import Video, {
  LoadError,
  OnBufferData,
  OnLoadData,
  OnProgressData,
} from 'react-native-video';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { dispatch } from '@common';
import { Block, LocalImage, Text } from '@components';
import { useSelector } from '@hooks';
import { Slider } from '@miblanchard/react-native-slider';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { appActions } from '@redux-slice';

enum Orientation {
  LANDSCAPE = 'landscape',
  PORTRAIT = 'portrait',
}
enum VIDEO_TYPE {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  LIVE_STREAM = 'LIVE_STREAM',
  FEEDBACK = 'FEEDBACK',
  AD = 'AD',
}
type VideoElem = {
  id: string;
  type: VIDEO_TYPE;
  url?: string;
  image_urls?: string[];
};

const OPTION_BTN_COLOR = '#E8445A';
const BOTTOM_BAR_HEIGHT = 90;
const AVATAR_ICON_SIZE = 48;
const AVATAR_SM_ICON_SIZE = 18;
const { height, width } = Dimensions.get('window');
const aniValue = new AnimatedRN.Value(0);
const aniScaleValue = new AnimatedRN.Value(0);
const aniMiniScaleValue = new AnimatedRN.Value(0);
const SlideComponent = ({
  item,
  active,
}: {
  item: VideoElem;
  active: boolean;
}) => {
  // state
  const { modalOpen, modalType } = useSelector(state => state.app);
  // player
  const ref = useRef<Video | null>(null);
  // video pause
  const [pause, setPause] = useState<boolean>(!active);
  // full screen
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  // playback rate
  const [rate, setRate] = useState<number>(1);
  // progress bar: in percentage
  const [progress, setProgress] = useState<number>(0);
  // current time & total time & natural size info
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [naturalWidth, setNaturalWidth] = useState<number>(0);
  const [naturalHeight, setNaturalHeight] = useState<number>(0);
  const [orientation, setOrientation] = useState<Orientation>(
    Orientation.LANDSCAPE,
  );
  // like & bookmark
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  // full screen btn position
  const videoWidth = width;
  const scaleRatio = naturalWidth === 0 ? 1 : naturalWidth / videoWidth;
  const videoHeight =
    naturalHeight === 0 ? videoWidth : naturalHeight / scaleRatio;
  // video in comment mode
  const isMiniVideo =
    orientation === Orientation.LANDSCAPE &&
    modalOpen &&
    modalType === 'VIDEO_COMMENT';

  const rotateAni = AnimatedRN.loop(
    AnimatedRN.sequence([
      AnimatedRN.timing(aniValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]),
    {
      iterations: -1,
    },
  );
  const scalePauseBtn = aniScaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 1],
  });

  const scaleMiniBlock = aniMiniScaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.67, 1],
  });
  const translateY = aniMiniScaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-height / 3, 0],
  });

  useEffect(() => {
    if (isMiniVideo) {
      AnimatedRN.timing(aniMiniScaleValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    } else {
      AnimatedRN.timing(aniMiniScaleValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [isMiniVideo]);

  useEffect(() => {
    if (!active) {
      setProgress(0);
    } else {
      // reset video from beginning
      ref.current?.seek(0);
    }
    setPause(!active);
  }, [active]);

  useEffect(() => {
    if (!pause) {
      startRotate();
      aniScaleValue.setValue(0);
    } else {
      stopRotate();
      popupPauseBtn();
    }
  }, [pause]);

  useEffect(() => {
    setProgress(currentTime / total);
  }, [currentTime, total]);

  const spin = aniValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const startRotate = () => {
    rotateAni.start();
  };

  const stopRotate = () => {
    rotateAni.stop();
  };

  const popupPauseBtn = () => {
    AnimatedRN.timing(aniScaleValue, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setPause(!pause);
      }}>
      <Block block style={{ position: 'relative' }}>
        {/* pause icon */}
        {!isMiniVideo && progress > 0 && pause && (
          <Block
            style={{
              position: 'absolute',
              left: 0,
              top: (height - BOTTOM_BAR_HEIGHT) / 2 - 45,
              width: width,
              height: 90,
              zIndex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AnimatedRN.View
              style={{
                transform: [
                  {
                    scaleX: scalePauseBtn,
                  },
                  {
                    scaleY: scalePauseBtn,
                  },
                ],
              }}>
              <VectorIcon
                icon={'bx_play1'}
                color={'rgba(255,255,255,0.5)'}
                size={90}
              />
            </AnimatedRN.View>
          </Block>
        )}
        {/* right side bar */}
        {!isMiniVideo && (
          <Block
            style={{
              position: 'absolute',
              right: 0,
              top: (height - BOTTOM_BAR_HEIGHT) / 2 - 100,
              width: 72,
              height: (height - BOTTOM_BAR_HEIGHT) / 2 + 100,
              zIndex: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* user avatar */}
            <Block>
              <TouchableOpacity
                onPress={() => {
                  navigate(APP_SCREEN.USER_VIDEO);
                }}>
                {/* outer white border */}
                <Block
                  style={{
                    height: AVATAR_ICON_SIZE + 2,
                    width: AVATAR_ICON_SIZE + 2,
                    borderRadius: AVATAR_ICON_SIZE + 2,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* avatar */}
                  <Block
                    style={{
                      height: AVATAR_ICON_SIZE,
                      width: AVATAR_ICON_SIZE,
                      borderRadius: AVATAR_ICON_SIZE,
                      backgroundColor: '#B1305B',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                    }}>
                    <Block
                      style={{
                        backgroundColor: OPTION_BTN_COLOR,
                        position: 'absolute',
                        right: AVATAR_ICON_SIZE / 2 - AVATAR_SM_ICON_SIZE / 2,
                        bottom: -9,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: AVATAR_SM_ICON_SIZE,
                        height: AVATAR_SM_ICON_SIZE,
                        borderRadius: AVATAR_SM_ICON_SIZE,
                      }}>
                      {/* add icon */}
                      <TouchableOpacity>
                        <Block
                          style={{
                            width: AVATAR_SM_ICON_SIZE,
                            height: AVATAR_SM_ICON_SIZE,
                            borderRadius: AVATAR_SM_ICON_SIZE,
                          }}>
                          <VectorIcon
                            icon={'bx_plus'}
                            color={'white'}
                            size={AVATAR_SM_ICON_SIZE}
                          />
                        </Block>
                      </TouchableOpacity>
                    </Block>
                    <Text color={'white'} fontSize={21}>
                      J
                    </Text>
                  </Block>
                </Block>
              </TouchableOpacity>
            </Block>
            {/* likes */}
            <Block marginTop={30}>
              <TouchableOpacity
                onPress={() => {
                  setIsLike(!isLike);
                }}>
                <Block>
                  {isLike ? (
                    <VectorIcon
                      icon={'bx_heart_circle'}
                      color={'#C54C58'}
                      size={42}
                    />
                  ) : (
                    <VectorIcon icon={'bx_heart'} color={'white'} size={42} />
                  )}
                </Block>
              </TouchableOpacity>
              <Block>
                <Text fontSize={12} color={'white'} center>
                  5449
                </Text>
              </Block>
            </Block>
            {/* comments */}
            <Block marginTop={18}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(appActions.onModalOpen('VIDEO_COMMENT'));
                }}>
                <Block>
                  <VectorIcon icon={'bx_message'} color={'white'} size={36} />
                </Block>
              </TouchableOpacity>
              <Block>
                <Text fontSize={12} color={'white'} center>
                  172
                </Text>
              </Block>
            </Block>
            {/* bookmarks */}
            <Block marginTop={18}>
              <TouchableOpacity
                onPress={() => {
                  setIsBookmark(!isBookmark);
                }}>
                <Block>
                  {isBookmark ? (
                    <VectorIcon
                      icon={'bx_bookmark_alt'}
                      color={'#ECD064'}
                      size={36}
                    />
                  ) : (
                    <VectorIcon
                      icon={'bx_bookmark'}
                      color={'white'}
                      size={36}
                    />
                  )}
                </Block>
              </TouchableOpacity>
              <Block>
                <Text fontSize={12} color={'white'} center>
                  823
                </Text>
              </Block>
            </Block>
            {/* forward */}
            <Block marginTop={18}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(appActions.onModalOpen('VIDEO_SHARE'));
                }}>
                <Block>
                  <VectorIcon icon={'bx_link'} color={'white'} size={36} />
                </Block>
              </TouchableOpacity>
              <Block>
                <Text fontSize={12} color={'white'} center>
                  2042
                </Text>
              </Block>
            </Block>
            {/* music */}
            <Block marginTop={18}>
              <AnimatedRN.View
                style={{
                  transform: [{ rotate: spin }],
                }}>
                <TouchableOpacity>
                  <Block
                    style={{
                      width: 36,
                      height: 36,
                      position: 'relative',
                    }}>
                    <Block
                      style={{
                        height: 24,
                        width: 24,
                        borderRadius: 24,
                        backgroundColor: '#B1305B',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: 6,
                        left: 6,
                        zIndex: 1,
                      }}>
                      <Text color={'white'} fontSize={15}>
                        J
                      </Text>
                    </Block>
                    <LocalImage resizeMode={'cover'} source={'album'} />
                  </Block>
                </TouchableOpacity>
              </AnimatedRN.View>
            </Block>
          </Block>
        )}
        {!isMiniVideo && (
          <>
            {/* bottom information */}
            <Block
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                zIndex: 1,
                width,
              }}>
              <Block paddingHorizontal={12}>
                <Block marginBottom={9}>
                  <Text color={'white'} fontSize={15} fontWeight={'bold'}>
                    Jrhe1213
                  </Text>
                </Block>
                <Block marginBottom={12}>
                  <Text color={'white'} fontSize={15}>
                    <VectorIcon icon={'bx_music'} color={'white'} size={15} />{' '}
                    original sound - vennolesnevich
                  </Text>
                </Block>
              </Block>
            </Block>
            {/* bottom progress bar */}
            <Block
              style={{
                position: 'absolute',
                bottom: -18,
                left: 0,
                zIndex: 1,
                width,
              }}>
              <Block
                style={{
                  width,
                }}>
                <Slider
                  maximumValue={total}
                  minimumValue={0}
                  value={currentTime}
                  thumbStyle={{
                    width: 12,
                    height: 12,
                  }}
                  onValueChange={(value: number | Array<number>) => {
                    console.log('value: ', value);
                    if (Array.isArray(value)) {
                      ref.current?.seek(value[0]);
                    } else {
                      ref.current?.seek(value);
                    }
                  }}
                />
              </Block>
            </Block>
          </>
        )}
        {/* full screen button: only landscape video support */}
        {!isMiniVideo && orientation === Orientation.LANDSCAPE && (
          <Block
            style={{
              position: 'absolute',
              top:
                (height - BOTTOM_BAR_HEIGHT - videoHeight) / 2 +
                videoHeight +
                12,
              left: (width - 130) / 2,
              zIndex: 1,
              width: 130,
            }}>
            <TouchableOpacity
              onPress={() => {
                ref.current?.presentFullscreenPlayer();
              }}>
              <Block
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'center'}
                paddingVertical={6}
                borderRadius={15}
                borderWidth={0.5}
                borderColor={'#C2C2C2'}>
                <Block marginRight={6}>
                  <VectorIcon
                    icon={'bx_fullscreen'}
                    color={'white'}
                    size={21}
                  />
                </Block>
                <Block>
                  <Text color={'white'} fontSize={15}>
                    full screen
                  </Text>
                </Block>
              </Block>
            </TouchableOpacity>
          </Block>
        )}
        {/* video */}
        <AnimatedRN.View
          style={{
            width,
            height: height - BOTTOM_BAR_HEIGHT,
            transform: [
              {
                scaleX: scaleMiniBlock,
              },
              {
                scaleY: scaleMiniBlock,
              },
              {
                translateY,
              },
            ],
          }}>
          <Video
            source={{ uri: item.url }}
            ref={ref}
            resizeMode={'contain'}
            style={{
              width: '100%',
              height: '100%',
            }}
            repeat={true}
            paused={pause}
            rate={rate}
            fullscreen={fullscreen}
            muted={false}
            // onVideoLoad={() => {
            //   console.log('onVideoLoad');
            // }}
            // onVideoProgress={() => {
            //   console.log('onVideoProgress: ');
            // }}
            // onVideoEnd={() => {
            //   console.log('onVideoEnd: ');
            // }}
            // onVideoBuffer={() => {
            //   console.log('onVideoBuffer: ');
            // }}
            onFullscreenPlayerWillPresent={() => {
              console.log('++++++++ onFullscreenPlayerWillPresent');
            }}
            onFullscreenPlayerDidPresent={() => {
              console.log('++++++++ onFullscreenPlayerDidPresent');
            }}
            onFullscreenPlayerWillDismiss={() => {
              console.log('++++++++ onFullscreenPlayerWillDismiss');
            }}
            onFullscreenPlayerDidDismiss={() => {
              console.log('++++++++ onFullscreenPlayerDidDismiss');
              ref.current?.seek(currentTime);
              setPause(false);
            }}
            onVideoError={() => {
              console.log('++++++++ onVideoError: ');
            }}
            onLoadStart={() => {
              console.log('++++++++ onLoadStart: ');
            }}
            onLoad={(data: OnLoadData) => {
              console.log('++++++++ onload: ', data);
              setTotal(data.duration);
              setNaturalWidth(data.naturalSize.width);
              setNaturalHeight(data.naturalSize.height);
              setOrientation(
                data.naturalSize.orientation === 'landscape'
                  ? Orientation.LANDSCAPE
                  : Orientation.PORTRAIT,
              );
            }}
            onBuffer={(data: OnBufferData) => {
              console.log('++++++++ on buffer: ', data);
            }}
            onError={(error: LoadError) => {
              console.log('++++++++ error: ', error);
            }}
            onProgress={(data: OnProgressData) => {
              console.log('++++++++ onProgress: ', data);
              setCurrentTime(data.currentTime);
            }}
          />
        </AnimatedRN.View>
      </Block>
    </TouchableWithoutFeedback>
  );
};

export const Slide = memo(SlideComponent, isEqual);
