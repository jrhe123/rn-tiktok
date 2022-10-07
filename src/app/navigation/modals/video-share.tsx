import React, { memo, useCallback, useEffect, useRef } from 'react';
import {
  Dimensions,
  NativeModules,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import isEqual from 'react-fast-compare';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

import { VectorIcon, VectorIconIcon } from '@assets/vector-icon/vector-icon';
import { dispatch } from '@common';
import {
  Block,
  BottomSheet,
  BottomSheetRef,
  Button,
  Divider,
  Icon,
  Text,
} from '@components';
import { appActions } from '@redux-slice';
import { capitalize } from '@utils/common';

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
    title: 'Friends',
    color: '#D6525E',
    icon: 'bx_send',
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
    id: 3,
    title: 'Status',
    color: '#84CB7D',
    icon: 'bx_phone_call',
  },
  {
    id: 4,
    title: 'Copy',
    color: '#7085EB',
    icon: 'bx_copy',
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
type Action = {
  id: number;
  title: string;
  icon: VectorIconIcon;
};
const actions: Action[] = [
  {
    id: 1,
    title: 'Report',
    icon: 'bx_flag',
  },
  {
    id: 2,
    title: 'Ignore',
    icon: 'bx_heart_square',
  },
  {
    id: 3,
    title: 'Save',
    icon: 'bx_download',
  },
  {
    id: 4,
    title: 'Duet',
    icon: 'bx_copyright',
  },
  {
    id: 5,
    title: 'Stitch',
    icon: 'bx_copy_alt',
  },
  {
    id: 6,
    title: 'Favourites',
    icon: 'bx_bookmark',
  },
  {
    id: 7,
    title: 'Speed',
    icon: 'bx_timer',
  },
  {
    id: 8,
    title: 'Live',
    icon: 'bx_video_recording',
  },
  {
    id: 9,
    title: 'Gif',
    icon: 'bx_gift',
  },
];
type Friend = {
  id: number;
  title: string;
  color: string;
  icon?: VectorIconIcon;
};
const friends: Friend[] = [
  {
    id: 0,
    title: 'Repost',
    color: '#ECD064',
    icon: 'bx_refresh',
  },
  {
    id: 1,
    title: 'jrhe12',
    color: '#C54C58',
  },
  {
    id: 2,
    title: 'roy',
    color: '#ECD064',
  },
  {
    id: 3,
    title: 'tester',
    color: '#6DDDCA',
  },
  {
    id: 4,
    title: 'roytest',
    color: '#5DC3F0',
  },
  {
    id: 5,
    title: 'More',
    color: '#C2C2C2',
    icon: 'bx_chevron_right',
  },
];

const AVATAR_ICON_SIZE = 48;
const { width, height } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const VideoShareComponent = ({
  handleConfirm,
}: {
  handleConfirm: () => void;
}) => {
  const _refBS = useRef<BottomSheetRef>(null);

  const onPress = useCallback(() => {
    const isActive = _refBS?.current?.isActive();
    if (!isActive) {
      _refBS?.current?.scrollTo(-(height - statusBarHeight) / 2);
    }
  }, []);

  useEffect(() => {
    onPress();
  }, [onPress]);

  const renderTopBar = () => (
    <>
      {/* top left btn */}
      <Block
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          width: 30,
          height: 30,
          zIndex: 1,
        }}>
        <Button onPress={handleConfirm}>
          <Icon icon={'close'} size={18} />
        </Button>
      </Block>
    </>
  );

  const renderFriendList = () => {
    return friends.map(f => (
      <Block
        key={f.id}
        style={{
          alignItems: 'center',
        }}
        paddingHorizontal={12}>
        <TouchableOpacity>
          <Block
            style={{
              height: AVATAR_ICON_SIZE,
              width: AVATAR_ICON_SIZE,
              borderRadius: AVATAR_ICON_SIZE,
              backgroundColor: f.color,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {f.icon ? (
              <VectorIcon icon={f.icon} color={'white'} size={33} />
            ) : (
              <Text color={'white'} fontSize={21}>
                {capitalize(f.title.substring(0, 1))}
              </Text>
            )}
          </Block>
        </TouchableOpacity>
        <Block marginTop={6}>
          <Text color={'#6F7681'}>{f.title}</Text>
        </Block>
      </Block>
    ));
  };

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

  const renderActionList = () => {
    return actions.map(a => (
      <Block
        key={a.id}
        style={{
          alignItems: 'center',
        }}
        paddingHorizontal={12}>
        <TouchableOpacity>
          <Block
            style={{
              height: AVATAR_ICON_SIZE,
              width: AVATAR_ICON_SIZE,
              borderRadius: AVATAR_ICON_SIZE,
              backgroundColor: '#F1F1F1',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <VectorIcon icon={a.icon} color={'black'} size={27} />
          </Block>
        </TouchableOpacity>
        <Block marginTop={6}>
          <Text color={'#6F7681'} center>
            {a.title}
          </Text>
        </Block>
      </Block>
    ));
  };

  return (
    <GestureHandlerRootView>
      <BottomSheet
        ref={_refBS}
        height={height - statusBarHeight}
        throttle={100}
        toggleModal={toggle => {
          if (!toggle) {
            dispatch(appActions.onModalClose());
          }
        }}>
        <Block
          block
          style={{
            alignItems: 'center',
            position: 'relative',
            backgroundColor: 'white',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}>
          {renderTopBar()}
          {/* main content */}
          <Block
            style={{ width: width - 48, marginTop: 15, paddingBottom: 120 }}>
            <Block>
              <Text fontSize={12} center>
                Send to
              </Text>
            </Block>
            <Block marginTop={18} marginBottom={18}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {renderFriendList()}
              </ScrollView>
            </Block>
            <Divider color="#ccc" height={0.5} />
            <Block marginTop={18} marginBottom={9}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {renderMediaList()}
              </ScrollView>
            </Block>
            <Block marginTop={18}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {renderActionList()}
              </ScrollView>
            </Block>
          </Block>
        </Block>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export const VideoShare = memo(VideoShareComponent, isEqual);
