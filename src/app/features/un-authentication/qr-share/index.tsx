import React, { memo, useState } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  NativeModules,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import isEqual from 'react-fast-compare';
import LinearGradient from 'react-native-linear-gradient';
import QRCode from 'react-native-qrcode-svg';

import { VectorIcon, VectorIconIcon } from '@assets/vector-icon/vector-icon';
import { dispatch } from '@common';
import { Block, Button, LocalImage, Screen, Text } from '@components';
import { useStateCallback } from '@hooks';
import { Motion, TransformOrigin } from '@legendapp/motion';
import { goBack, navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { appActions } from '@redux-slice';

type Media = {
  id: number;
  title: string;
  color?: string;
  gradient?: string[];
  icon: VectorIconIcon;
};
const medias: Media[] = [
  {
    id: 0,
    title: 'Download',
    color: '#D6525E',
    icon: 'bx_download',
  },
  {
    id: 1,
    title: 'SMS',
    color: '#89D489',
    icon: 'bx_message',
  },
  {
    id: 2,
    title: 'WhatsApp',
    color: '#84CB7D',
    icon: 'bx_phone',
  },
  {
    id: 5,
    title: 'Instagram',
    gradient: ['#7946B9', '#CA6165', '#E9BF70'],
    icon: 'bx_camera',
  },
  {
    id: 6,
    title: 'Stories',
    gradient: ['#7946B9', '#CA6165', '#E9BF70'],
    icon: 'bx_plus_circle',
  },
  {
    id: 7,
    title: 'Email',
    color: '#74B8E7',
    icon: 'bx_mail_send',
  },
  {
    id: 8,
    title: 'Facebook',
    color: '#4075E6',
    icon: 'bx_face',
  },
  {
    id: 9,
    title: 'Other',
    color: '#6A99ED',
    icon: 'bx_dots_horizontal',
  },
];

const { height, width } = Dimensions.get('window');
const CARD_SIZE = width - 72;
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const MAIN_HEADER_HEIGHT = 48;
const AVATAR_ICON_SIZE = 48;
const LG_AVATAR_ICON_SIZE = 60;
const UPPER_AREA_HEIGHT =
  CARD_SIZE + 30 + MAIN_HEADER_HEIGHT + statusBarHeight + 48;

type Origin = {
  x: TransformOrigin;
  y: TransformOrigin;
};
const QRShareComponent = () => {
  const [oldColor1, setOldColor1] = useState<string>('#DA8491');
  const [oldColor2, setOldColor2] = useState<string>('#ff0000');
  const [color1, setColor1] = useState<string>('#DA8491');
  const [color2, setColor2] = useState<string>('#ff0000');
  const [startX, setStartX] = useState<number>(0.25);
  const [startY, setStartY] = useState<number>(0.25);
  const [endX, setEndX] = useState<number>(0.5);
  const [endY, setEndY] = useState<number>(0.5);
  const [toggle, setToggle] = useStateCallback<boolean>(false);
  const [origin, setOrigin] = useStateCallback<Origin>({
    x: '0%',
    y: '0%',
  });

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
            right: 6,
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
              goBack();
            }}>
            <VectorIcon icon={'bx_scan'} size={24} color={'white'} />
          </Button>
        </Block>
      </Block>
    </Block>
  );

  const renderMediaList = () => {
    return medias.map(m => (
      <Block
        key={m.id}
        style={{
          alignItems: 'center',
        }}
        paddingHorizontal={12}>
        <TouchableOpacity>
          {m.color && (
            <Block
              style={{
                height: AVATAR_ICON_SIZE,
                width: AVATAR_ICON_SIZE,
                borderRadius: AVATAR_ICON_SIZE,
                backgroundColor: m.color,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <VectorIcon icon={m.icon} color={'white'} size={27} />
            </Block>
          )}
          {m.gradient && (
            <LinearGradient
              colors={m.gradient}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 0.5, y: 3.0 }}
              locations={[0, 0.5, 1.0]}
              style={{
                height: AVATAR_ICON_SIZE,
                width: AVATAR_ICON_SIZE,
                borderRadius: AVATAR_ICON_SIZE,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <VectorIcon icon={m.icon} color={'white'} size={33} />
            </LinearGradient>
          )}
        </TouchableOpacity>
        <Block marginTop={6}>
          <Text color={'#6F7681'} center>
            {m.title}
          </Text>
        </Block>
      </Block>
    ));
  };

  return (
    <Block
      block
      style={{
        position: 'relative',
      }}>
      <Screen
        unsafe
        statusBarStyle="light-content"
        bottomInsetColor="transparent"
        backgroundColor={'transparent'}>
        {/* Top bar */}
        {renderTopBar()}
        {/* main content */}
        <Block paddingHorizontal={36}>
          <Block
            marginTop={30}
            style={{
              backgroundColor: 'white',
              width: CARD_SIZE,
              height: CARD_SIZE,
              borderRadius: 12,
              position: 'relative',
            }}>
            {/* icon */}
            <Block
              style={{
                backgroundColor: 'white',
                position: 'absolute',
                top: -LG_AVATAR_ICON_SIZE / 2 - 3,
                left: (CARD_SIZE - LG_AVATAR_ICON_SIZE) / 2 - 3,
                zIndex: 1,
                width: LG_AVATAR_ICON_SIZE + 6,
                height: LG_AVATAR_ICON_SIZE + 6,
                borderRadius: LG_AVATAR_ICON_SIZE + 6,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity>
                <Block
                  style={{
                    height: LG_AVATAR_ICON_SIZE,
                    width: LG_AVATAR_ICON_SIZE,
                    borderRadius: LG_AVATAR_ICON_SIZE,
                    backgroundColor: '#B1305B',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                  }}>
                  <Text color={'white'} fontSize={30}>
                    J
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>
            {/* content */}
            <Block marginTop={36}>
              <Text center fontSize={12} fontWeight={'bold'}>
                jrhe12
              </Text>
            </Block>
            <Block alignItems={'center'} marginTop={12}>
              <Block
                style={{
                  borderRadius: 12,
                  borderWidth: 3,
                  borderColor: '#1E1E1E',
                  padding: 12,
                  position: 'relative',
                }}>
                {/* 4 blockers */}
                <Block
                  style={{
                    position: 'absolute',
                    width: 12,
                    backgroundColor: 'white',
                    height: 150,
                    top: 12,
                    left: -6,
                  }}
                />
                <Block
                  style={{
                    position: 'absolute',
                    width: 12,
                    backgroundColor: 'white',
                    height: 150,
                    top: 12,
                    right: -6,
                  }}
                />
                <Block
                  style={{
                    position: 'absolute',
                    height: 12,
                    backgroundColor: 'white',
                    width: 150,
                    left: 12,
                    top: -6,
                  }}
                />
                <Block
                  style={{
                    position: 'absolute',
                    height: 12,
                    backgroundColor: 'white',
                    width: 150,
                    left: 12,
                    bottom: -6,
                  }}
                />
                {/* outer border */}
                <Block
                  style={{
                    width: 150 + 24 + 6,
                    height: 150 + 24 + 6,
                    position: 'absolute',
                    top: -4,
                    left: -4,
                    zIndex: -1,
                    borderRadius: 12,
                    borderWidth: 0.5,
                    borderColor: '#67D1E8',
                  }}
                />
                {/* inner border */}
                <Block
                  style={{
                    width: 150 + 24 + 6,
                    height: 150 + 24 + 6,
                    position: 'absolute',
                    top: -2,
                    left: -2,
                    zIndex: -1,
                    borderRadius: 12,
                    borderWidth: 0.5,
                    borderColor: '#E7426D',
                  }}
                />
                {/* qr code */}
                <QRCode
                  value="https://github.com/jrhe123/rn-tiktok/blob/master/README.md"
                  size={150}
                  logoBackgroundColor="transparent"
                  enableLinearGradient={true}
                  linearGradient={[color1, color2]}
                />
              </Block>
              {/* info */}
              <Block marginTop={12}>
                <Text fontSize={9} center>
                  Share your QR code so others can follow you
                </Text>
              </Block>
              {/* logo */}
              <Block marginTop={12} direction={'row'}>
                <Block pointerEvents={'none'} width={18} height={18}>
                  <LocalImage resizeMode={'contain'} source={'pure_tiktok'} />
                </Block>
                <Block marginLeft={3}>
                  <Text fontSize={15} fontWeight={'bold'}>
                    TikTok
                  </Text>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
        {/* touch change background color */}
        <TouchableWithoutFeedback
          onPress={(evt: GestureResponderEvent) => {
            const c1 = randomHex();
            const c2 = randomHex();
            setColor1(c1);
            setColor2(c2);
            setTimeout(() => {
              setOldColor1(c1);
              setOldColor2(c2);
            }, 500);
            // console.log(evt.nativeEvent.locationX, evt.nativeEvent.locationY);
            const x = evt.nativeEvent.locationX / width;
            const y = evt.nativeEvent.locationY;
            let xPos = 0;
            let yPos = 0;
            if (x <= 1 / 3) {
              xPos = 0;
            } else if (x <= 2 / 3) {
              xPos = 1;
            } else {
              xPos = 2;
            }
            if (y < 60) {
              yPos = 0;
            } else if (y < 120) {
              yPos = 1;
            } else {
              yPos = 2;
            }
            // reset
            evt.persist();
            const tempX = ((evt.nativeEvent.locationX / width) * 100).toFixed(
              2,
            );
            const tempY = (
              ((UPPER_AREA_HEIGHT + evt.nativeEvent.locationY) / height) *
              100
            ).toFixed(2);
            setOrigin(
              {
                x: `${Number(tempX)}%`,
                y: `${Number(tempY)}%`,
              },
              _ => {
                setToggle(true, () => {
                  setTimeout(() => {
                    setToggle(false);
                  }, 500);
                });
              },
            );

            if (xPos === 0) {
              if (yPos === 0) {
                // left upper
                // start={{ x: 0.5, y: 0.0 }}
                // end={{ x: 0.25, y: 0.25 }}
                setStartX(0.5);
                setStartY(0.0);
                setEndX(0.25);
                setEndY(0.25);
              } else if (yPos === 1) {
                // left
                // start={{ x: 0.5, y: 0.25 }}
                // end={{ x: 0.25, y: 0.5 }}
                setStartX(0.5);
                setStartY(0.25);
                setEndX(0.25);
                setEndY(0.5);
              } else {
                // left depper
                // start={{ x: 0.5, y: 0.5 }}
                // end={{ x: 0.25, y: 0.75 }}
                setStartX(0.5);
                setStartY(0.5);
                setEndX(0.25);
                setEndY(0.75);
              }
            } else if (xPos === 1) {
              if (yPos === 0) {
                // middle upper
                // start={{ x: 0.25, y: 0.0 }}
                // end={{ x: 0.25, y: 0.25 }}
                setStartX(0.25);
                setStartY(0.0);
                setEndX(0.25);
                setEndY(0.25);
              } else if (yPos === 1) {
                // middle
                // start={{ x: 0.25, y: 0.25 }}
                // end={{ x: 0.25, y: 0.5 }}
                setStartX(0.25);
                setStartY(0.25);
                setEndX(0.25);
                setEndY(0.5);
              } else {
                // middle depper
                // start={{ x: 0.25, y: 0.5 }}
                // end={{ x: 0.25, y: 0.75 }}
                setStartX(0.25);
                setStartY(0.5);
                setEndX(0.25);
                setEndY(0.75);
              }
            } else {
              if (yPos === 0) {
                // right upper
                // start={{ x: 0.25, y: 0.0 }}
                // end={{ x: 0.5, y: 0.25 }}
                setStartX(0.25);
                setStartY(0.0);
                setEndX(0.5);
                setEndY(0.25);
              } else if (yPos === 1) {
                // right
                // start={{ x: 0.25, y: 0.25 }}
                // end={{ x: 0.5, y: 0.5 }}
                setStartX(0.25);
                setStartY(0.25);
                setEndX(0.5);
                setEndY(0.5);
              } else {
                // right depper
                // start={{ x: 0.25, y: 0.5 }}
                // end={{ x: 0.5, y: 0.75 }}
                setStartX(0.25);
                setStartY(0.5);
                setEndX(0.5);
                setEndY(0.75);
              }
            }
          }}>
          <Block
            paddingTop={18}
            style={{
              flex: 1,
            }}>
            <Text center color={'white'} fontSize={12}>
              Tap background to change color
            </Text>
          </Block>
        </TouchableWithoutFeedback>
        {/* bottom share bar */}
        <Block
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            zIndex: 1,
            width,
            height: 210,
            backgroundColor: 'white',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}>
          <Block marginTop={12}>
            <Text center fontSize={12}>
              Share to
            </Text>
          </Block>
          <Block marginTop={18}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {renderMediaList()}
            </ScrollView>
          </Block>
        </Block>
        {/* gradient background */}
        {/* new color */}
        <Block
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width,
            height,
            zIndex: -1,
          }}>
          <Motion.View
            style={{
              width,
              height,
              overflow: 'hidden',
              opacity: toggle ? 1 : 0,
            }}
            animate={{
              scale: toggle ? 1 : 0,
            }}
            transformOrigin={origin}>
            <LinearGradient
              colors={[color1, color2]}
              start={{ x: startX, y: startY }}
              end={{ x: endX, y: endY }}
              locations={[0, 1]}
              style={{
                flex: 1,
              }}
            />
          </Motion.View>
        </Block>
        {/* old color */}
        <Block
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width,
            height,
            zIndex: -2,
          }}>
          <LinearGradient
            colors={[oldColor1, oldColor2]}
            start={{ x: startX, y: startY }}
            end={{ x: endX, y: endY }}
            locations={[0, 1]}
            style={{
              flex: 1,
            }}
          />
        </Block>
      </Screen>
    </Block>
  );
};

export const QRShare = memo(QRShareComponent, isEqual);

const hexify = (r: number, g: number, b: number) => {
  return `#${[r, g, b]
    .map(n =>
      n.toString(16).length === 1 ? '0' + n.toString(16) : n.toString(16),
    )
    .join('')}`;
};
const randomNumber = () => Math.floor(Math.random() * (255 + 1));
const randomHex = () => {
  return hexify(randomNumber(), randomNumber(), randomNumber());
};
