import React, { memo, useEffect, useState } from 'react';
import {
  Animated as AnimatedRN,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import isEqual from 'react-fast-compare';
import Video from 'react-native-video';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { Block, LocalImage, Slider, Text } from '@components';

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
const SlideComponent = ({
  item,
  active,
}: {
  item: VideoElem;
  active: boolean;
}) => {
  const [pause, setPause] = useState<boolean>(!active);
  const [sliderProgress, setSliderProgress] = useState<number>(0);

  useEffect(() => {
    startRotate();
  }, []);

  const spin = aniValue.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['0deg', '90deg', '180deg', '270deg', '360deg'],
  });

  const startRotate = () => {
    AnimatedRN.loop(
      AnimatedRN.sequence([
        AnimatedRN.timing(aniValue, {
          toValue: 0.25,
          duration: 800,
          useNativeDriver: true,
        }),
        AnimatedRN.timing(aniValue, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true,
        }),
        AnimatedRN.timing(aniValue, {
          toValue: 0.75,
          duration: 800,
          useNativeDriver: true,
        }),
        AnimatedRN.timing(aniValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1,
      },
    ).start();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setPause(!pause);
      }}>
      <Block block style={{ position: 'relative' }}>
        {/* pause icon */}
        {pause && (
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
            <VectorIcon
              icon={'bx_play1'}
              color={'rgba(255,255,255,0.5)'}
              size={90}
            />
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
            <TouchableOpacity>
              <Block>
                <VectorIcon icon={'bx_heart'} color={'white'} size={42} />
              </Block>
              <Block>
                <Text fontSize={12} color={'white'} center>
                  5449
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>
          {/* comments */}
          <Block marginTop={18}>
            <TouchableOpacity>
              <Block>
                <VectorIcon icon={'bx_message'} color={'white'} size={36} />
              </Block>
              <Block>
                <Text fontSize={12} color={'white'} center>
                  172
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>
          {/* bookmarks */}
          <Block marginTop={18}>
            <TouchableOpacity>
              <Block>
                <VectorIcon icon={'bx_bookmark'} color={'white'} size={36} />
              </Block>
              <Block>
                <Text fontSize={12} color={'white'} center>
                  823
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>
          {/* forward */}
          <Block marginTop={18}>
            <TouchableOpacity>
              <Block>
                <VectorIcon icon={'bx_link'} color={'white'} size={36} />
              </Block>
              <Block>
                <Text fontSize={12} color={'white'} center>
                  2042
                </Text>
              </Block>
            </TouchableOpacity>
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
        {/* bottom progress bar */}
        <Block
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            zIndex: 1,
            width,
            height: 60,
            justifyContent: 'flex-end',
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
          <Block
            style={{
              width,
              height: 26,
              marginBottom: -15,
            }}>
            <Slider type={'linear'} onChangeLinear={setSliderProgress} />
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
          resizeMode={'contain'}
          repeat={true}
          paused={pause}
          onVideoLoad={() => {
            console.log('onVideoLoad');
          }}
          onVideoError={() => {
            console.log('onVideoError: ');
          }}
          onVideoProgress={() => {
            console.log('onVideoProgress: ');
          }}
          onVideoEnd={() => {
            console.log('onVideoEnd: ');
          }}
          onVideoBuffer={() => {
            console.log('onVideoBuffer: ');
          }}
        />
      </Block>
    </TouchableWithoutFeedback>
  );
};

export const Slide = memo(SlideComponent, isEqual);
