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
  OnProgressData,
} from 'react-native-video';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { Block, LocalImage, Text } from '@components';
import { Slider } from '@miblanchard/react-native-slider';

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
const SlideComponent = ({
  item,
  active,
}: {
  item: VideoElem;
  active: boolean;
}) => {
  const ref = useRef<Video | null>(null);
  const [pause, setPause] = useState<boolean>(!active);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

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
        {progress > 0 && pause && (
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
            <TouchableOpacity>
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
            <TouchableOpacity>
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
                  <VectorIcon icon={'bx_bookmark'} color={'white'} size={36} />
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
            <TouchableOpacity>
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
        {/* main content */}
        {/* #1 video */}
        <Video
          source={{ uri: item.url }}
          style={{
            width: width,
            height: height - BOTTOM_BAR_HEIGHT,
          }}
          ref={ref}
          resizeMode={'contain'}
          repeat={true}
          paused={pause}
          rate={rate}
          fullscreen={fullscreen}
          muted={false}
          // onVideoLoad={() => {
          //   console.log('onVideoLoad');
          // }}
          onVideoError={() => {
            console.log('onVideoError: ');
          }}
          // onVideoProgress={() => {
          //   console.log('onVideoProgress: ');
          // }}
          // onVideoEnd={() => {
          //   console.log('onVideoEnd: ');
          // }}
          // onVideoBuffer={() => {
          //   console.log('onVideoBuffer: ');
          // }}
          onBuffer={(data: OnBufferData) => {
            console.log('on buffer: ', data);
          }}
          onError={(error: LoadError) => {
            console.log('error: ', error);
          }}
          onProgress={(data: OnProgressData) => {
            setTotal(data.seekableDuration);
            setCurrentTime(data.currentTime);
          }}
        />
      </Block>
    </TouchableWithoutFeedback>
  );
};

export const Slide = memo(SlideComponent, isEqual);
