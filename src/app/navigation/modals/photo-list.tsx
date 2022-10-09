import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Dimensions, NativeModules, TouchableOpacity } from 'react-native';

import isEqual from 'react-fast-compare';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { dispatch } from '@common';
import {
  Block,
  BottomSheet,
  BottomSheetRef,
  Button,
  Icon,
  Image,
  Text,
} from '@components';
import { appActions } from '@redux-slice';

const { width, height } = Dimensions.get('window');
const images: string[] = [
  'https://picsum.photos/id/1002/4312/2868',
  'https://picsum.photos/id/1003/1181/1772',
  'https://picsum.photos/id/1004/5616/3744',
  'https://picsum.photos/id/1005/5760/3840',
  'https://picsum.photos/id/1006/3000/2000',
  'https://picsum.photos/id/1008/5616/3744',
  'https://picsum.photos/id/1009/5000/7502',
  'https://picsum.photos/id/101/2621/1747',
  'https://picsum.photos/id/1010/5184/3456',
  'https://picsum.photos/id/10/2500/3456',
  'https://picsum.photos/id/10/2500/167',
  'https://picsum.photos/id/10/2500/90',
  'https://picsum.photos/id/10/2500/1667',
  'https://picsum.photos/id/10/2500/888',
  'https://picsum.photos/id/1001/5616/3744',
  'https://picsum.photos/id/1001/300/3744',
  'https://picsum.photos/id/1001/5616/404',
  'https://picsum.photos/id/1015/6000/4000',
  'https://picsum.photos/id/1015/6000/3000',
  'https://picsum.photos/id/1015/6000/20',
  'https://picsum.photos/id/1025/4951/3301',
  'https://picsum.photos/id/1025/4951/301',
];

const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const PhotoListComponent = ({
  handleConfirm,
}: {
  handleConfirm: () => void;
}) => {
  const _refBS = useRef<BottomSheetRef>(null);

  const onPress = useCallback(() => {
    const isActive = _refBS?.current?.isActive();
    if (!isActive) {
      _refBS?.current?.scrollTo(-(height - statusBarHeight));
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
          top: 21,
          left: 24,
          width: 30,
          height: 30,
          zIndex: 1,
        }}>
        <Button onPress={handleConfirm}>
          <Icon icon={'close'} size={30} />
        </Button>
      </Block>
      <Button>
        <Block style={{ marginTop: 24 }} direction={'row'}>
          <Text fontSize={18} center fontWeight={'bold'}>
            Recents
          </Text>
          <VectorIcon icon={'bx_chevron_down'} size={24} />
        </Block>
      </Button>
    </>
  );

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
          <Block
            style={{ width, marginTop: 36, paddingBottom: 120 }}
            direction={'row'}
            flexWrap={'wrap'}>
            {images.map((url, index) => (
              <TouchableOpacity key={index}>
                <Block
                  style={{
                    width: (width - 6) / 4,
                    height: (width - 6) / 4,
                    marginBottom: 2,
                    marginLeft: index % 4 === 0 ? 0 : 2,
                  }}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    source={{ uri: url }}
                  />
                </Block>
              </TouchableOpacity>
            ))}
          </Block>
        </Block>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export const PhotoList = memo(PhotoListComponent, isEqual);
