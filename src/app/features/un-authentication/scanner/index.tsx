import React, { memo, useEffect } from 'react';
import {
  Animated as AnimatedRN,
  Dimensions,
  Easing,
  NativeModules,
} from 'react-native';

import isEqual from 'react-fast-compare';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { dispatch } from '@common';
import { Block, Button, Screen, Text } from '@components';
import { goBack, navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { appActions } from '@redux-slice';

const { height, width } = Dimensions.get('window');
const MAIN_HEADER_HEIGHT = 48;
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const aniValue = new AnimatedRN.Value(0);
const MARKER_SIZE = width - 120;
const ANIMATION_SIZE = 54;
const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const cols = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 1, 2,
  3, 4, 5, 6, 7, 8, 9, 10, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
];
const BOX_SIZE = MARKER_SIZE / cols.length;

const ScannerComponent = () => {
  const translateY = aniValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-ANIMATION_SIZE, MARKER_SIZE - ANIMATION_SIZE],
  });

  const slideAni = AnimatedRN.loop(
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

  const startSlide = () => {
    slideAni.start();
  };

  useEffect(() => {
    startSlide();
  }, []);

  const renderTopBar = () => (
    <Block
      style={{
        marginTop: statusBarHeight,
        position: 'relative',
        height: MAIN_HEADER_HEIGHT,
      }}>
      <Block
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: MAIN_HEADER_HEIGHT,
          width,
          flexDirection: 'row',
          zIndex: 99,
        }}>
        <Block
          style={{
            position: 'absolute',
            left: 6,
            top: 0,
            height: MAIN_HEADER_HEIGHT,
            width: MAIN_HEADER_HEIGHT,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}>
          <Button
            onPress={() => {
              goBack();
            }}>
            <VectorIcon icon={'bx_chevron_left1'} size={48} color={'white'} />
          </Button>
        </Block>
        <Block
          style={{
            position: 'absolute',
            right: 15,
            top: 0,
            width: MAIN_HEADER_HEIGHT,
            height: MAIN_HEADER_HEIGHT,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}>
          <Button
            onPress={() => {
              // navigate(APP_SCREEN.SCANNER);
            }}>
            <Text fontSize={13} color={'white'}>
              Photos
            </Text>
          </Button>
        </Block>
        <Block
          block
          style={{
            position: 'relative',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text fontSize={18} color={'white'}>
            Scan
          </Text>
        </Block>
      </Block>
    </Block>
  );
  return (
    <Block
      block
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
        position: 'relative',
      }}>
      <Screen
        unsafe
        statusBarStyle="light-content"
        bottomInsetColor="transparent"
        backgroundColor={'transparent'}>
        {/* Top bar */}
        {renderTopBar()}
        {/* bottom info */}
        <Block
          style={{
            position: 'absolute',
            top: height / 2 + 120,
            left: 0,
            width,
          }}>
          <Block justifyContent={'space-between'}>
            <Block marginTop={18}>
              <Text color={'white'} fontSize={12} center>
                Align QR code in frame to scan
              </Text>
            </Block>
            <Block marginTop={60}>
              <Button>
                <Block alignItems={'center'}>
                  <VectorIcon icon={'bx_id_card'} color={'white'} size={42} />
                  <Text
                    color={'white'}
                    fontWeight={'bold'}
                    center
                    fontSize={12}>
                    Your QR code
                  </Text>
                </Block>
              </Button>
            </Block>
          </Block>
        </Block>
        {/* scanner */}
        <Block
          style={{
            position: 'absolute',
            height,
            width,
            zIndex: -1,
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          <QRCodeScanner
            onRead={e => {
              console.log('data: ', e);
            }}
            cameraType={'back'}
            showMarker={true}
            flashMode={RNCamera.Constants.FlashMode.off}
            notAuthorizedView={
              <Block
                justifyContent={'center'}
                alignItems={'center'}
                block
                style={{}}>
                <Text>notAuthorizedView</Text>
              </Block>
            }
            containerStyle={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.3)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            // cameraContainerStyle={{
            //   // width,
            //   // height,
            //   borderWidth: 3,
            //   borderColor: 'red',
            //   height,
            // }}
            cameraStyle={{
              width,
              height,
            }}
            customMarker={
              <Block
                style={{
                  width: MARKER_SIZE,
                  height: MARKER_SIZE,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                {/* animation */}
                <AnimatedRN.View
                  style={{
                    width: MARKER_SIZE,
                    height: MARKER_SIZE,
                    transform: [
                      {
                        translateY,
                      },
                    ],
                  }}>
                  <Block
                    style={{
                      width: MARKER_SIZE,
                      height: ANIMATION_SIZE,
                      borderBottomColor: 'white',
                      borderBottomWidth: 2,
                    }}>
                    {rows.map((i, index) => (
                      <Block
                        key={index}
                        direction={'row'}
                        style={{
                          height: BOX_SIZE,
                        }}>
                        {cols.map((ii, indexx) => {
                          const color = 0 + 0.15 * index;
                          return (
                            <Block
                              key={indexx}
                              style={{
                                width: BOX_SIZE,
                                height: BOX_SIZE,
                                borderWidth: 0.5,
                                borderColor: `rgba(255,255,255,${color})`,
                                borderTopWidth: 0,
                              }}
                            />
                          );
                        })}
                      </Block>
                    ))}
                  </Block>
                </AnimatedRN.View>
                {/* left top */}
                <Block
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}>
                  <Block
                    style={{
                      width: 18,
                      height: 3,
                      backgroundColor: 'white',
                    }}
                  />
                  <Block
                    style={{
                      height: 15,
                      width: 3,
                      backgroundColor: 'white',
                    }}
                  />
                </Block>
                {/* right top */}
                <Block
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  <Block
                    style={{
                      width: 18,
                      height: 3,
                      backgroundColor: 'white',
                    }}
                  />
                  <Block
                    style={{
                      height: 15,
                      width: 3,
                      backgroundColor: 'white',
                    }}
                  />
                </Block>
                {/* left bottom */}
                <Block
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                  }}>
                  <Block
                    style={{
                      height: 15,
                      width: 3,
                      backgroundColor: 'white',
                    }}
                  />
                  <Block
                    style={{
                      width: 18,
                      height: 3,
                      backgroundColor: 'white',
                    }}
                  />
                </Block>
                {/* right bottom */}
                <Block
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    alignItems: 'flex-end',
                  }}>
                  <Block
                    style={{
                      height: 15,
                      width: 3,
                      backgroundColor: 'white',
                    }}
                  />
                  <Block
                    style={{
                      width: 18,
                      height: 3,
                      backgroundColor: 'white',
                    }}
                  />
                </Block>
              </Block>
            }
          />
        </Block>
      </Screen>
    </Block>
  );
};

export const Scanner = memo(ScannerComponent, isEqual);
