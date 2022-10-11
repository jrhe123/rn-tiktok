import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  NativeModules,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import isEqual from 'react-fast-compare';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { dispatch } from '@common';
import {
  Block,
  BottomSheet,
  BottomSheetRef,
  Button,
  Divider,
  RadioButton,
  Switch,
  Text,
} from '@components';
import { appActions } from '@redux-slice';

const { width, height } = Dimensions.get('window');

const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const SearchFilterComponent = ({
  handleConfirm,
}: {
  handleConfirm: () => void;
}) => {
  const _refBS = useRef<BottomSheetRef>(null);
  const [toggle, setToggle] = useState<boolean>(false);

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
          top: 24,
          left: 12,
          height: 30,
          zIndex: 1,
        }}>
        <Button onPress={handleConfirm}>
          <Text fontSize={15}>Cancel</Text>
        </Button>
      </Block>
      <Block
        style={{
          position: 'absolute',
          top: 24,
          right: 12,
          height: 30,
          zIndex: 1,
        }}>
        <Button onPress={() => {}}>
          <Text fontSize={15}>Apply</Text>
        </Button>
      </Block>
      <Block style={{ marginTop: 24, marginBottom: 18 }} direction={'row'}>
        <Text fontSize={15} center fontWeight={'bold'}>
          Filters
        </Text>
      </Block>
      <Divider height={2} color={'#f1f1f1'} />
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
          <ScrollView>
            {/* main content */}
            <Block
              style={{
                width,
                marginTop: 18,
                paddingBottom: 120,
              }}>
              {/* activity */}
              <Block
                style={{
                  paddingHorizontal: 15,
                }}>
                <Block marginBottom={12}>
                  <Text fontSize={12} color={'#a8a8a8'}>
                    Activity
                  </Text>
                </Block>
                <Block direction={'row'} justifyContent={'space-between'}>
                  <Block>
                    <Block>
                      <Text fontSize={15}>Watched videos</Text>
                    </Block>
                    <Block marginTop={6}>
                      <Text fontSize={11} color={'#a8a8a8'}>
                        Within last 7 days
                      </Text>
                    </Block>
                  </Block>
                  <Block>
                    <Switch initialValue={true} />
                  </Block>
                </Block>
              </Block>
              {/* liked videos */}
              <Block
                marginTop={24}
                marginBottom={24}
                style={{
                  paddingHorizontal: 15,
                }}>
                <Block direction={'row'} justifyContent={'space-between'}>
                  <Block>
                    <Block>
                      <Text fontSize={15}>Liked videos</Text>
                    </Block>
                  </Block>
                  <Block>
                    <Switch />
                  </Block>
                </Block>
              </Block>
              <Divider height={2} color={'#f1f1f1'} />
              {/* date posted */}
              <Block
                style={{
                  marginTop: 24,
                  marginBottom: 24,
                  paddingHorizontal: 15,
                }}>
                <Block marginBottom={12}>
                  <Text fontSize={12} color={'#a8a8a8'}>
                    Date posted
                  </Text>
                </Block>
                {/* all time */}
                <Block direction={'row'} justifyContent={'space-between'}>
                  <Block>
                    <Block>
                      <Text fontSize={15}>All time</Text>
                    </Block>
                  </Block>
                  <Block>
                    <RadioButton
                      activeColor={'#D6525E'}
                      unActiveColor={'#c2c2c2'}
                      sizeDot={15}
                      initialValue={true}
                    />
                  </Block>
                </Block>
                {/* yesterday */}
                <Block
                  direction={'row'}
                  justifyContent={'space-between'}
                  marginTop={24}>
                  <Block>
                    <Block>
                      <Text fontSize={15}>Yesterday</Text>
                    </Block>
                  </Block>
                  <Block>
                    <RadioButton
                      activeColor={'#D6525E'}
                      unActiveColor={'#c2c2c2'}
                      sizeDot={15}
                    />
                  </Block>
                </Block>
                {/* this week */}
                <Block
                  direction={'row'}
                  justifyContent={'space-between'}
                  marginTop={24}>
                  <Block>
                    <Block>
                      <Text fontSize={15}>This week</Text>
                    </Block>
                  </Block>
                  <Block>
                    <RadioButton
                      activeColor={'#D6525E'}
                      unActiveColor={'#c2c2c2'}
                      sizeDot={15}
                    />
                  </Block>
                </Block>
                {!toggle && (
                  <Block marginTop={24}>
                    <TouchableOpacity
                      onPress={() => {
                        setToggle(true);
                      }}>
                      <Block
                        direction={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}>
                        <Block>
                          <Text color={'#a8a8a8'} fontSize={12}>
                            More
                          </Text>
                        </Block>
                        <Block>
                          <VectorIcon
                            icon={'bx_chevron_down'}
                            size={18}
                            color={'#a8a8a8'}
                          />
                        </Block>
                      </Block>
                    </TouchableOpacity>
                  </Block>
                )}
                {toggle && (
                  <>
                    {/* this month */}
                    <Block
                      direction={'row'}
                      justifyContent={'space-between'}
                      marginTop={24}>
                      <Block>
                        <Block>
                          <Text fontSize={15}>This month</Text>
                        </Block>
                      </Block>
                      <Block>
                        <RadioButton
                          activeColor={'#D6525E'}
                          unActiveColor={'#c2c2c2'}
                          sizeDot={15}
                        />
                      </Block>
                    </Block>
                    {/* last 3 months */}
                    <Block
                      direction={'row'}
                      justifyContent={'space-between'}
                      marginTop={24}>
                      <Block>
                        <Block>
                          <Text fontSize={15}>Last 3 months</Text>
                        </Block>
                      </Block>
                      <Block>
                        <RadioButton
                          activeColor={'#D6525E'}
                          unActiveColor={'#c2c2c2'}
                          sizeDot={15}
                        />
                      </Block>
                    </Block>
                    {/* last 6 months */}
                    <Block
                      direction={'row'}
                      justifyContent={'space-between'}
                      marginTop={24}>
                      <Block>
                        <Block>
                          <Text fontSize={15}>Last 6 months</Text>
                        </Block>
                      </Block>
                      <Block>
                        <RadioButton
                          activeColor={'#D6525E'}
                          unActiveColor={'#c2c2c2'}
                          sizeDot={15}
                        />
                      </Block>
                    </Block>
                  </>
                )}
              </Block>
              <Divider height={2} color={'#f1f1f1'} />
              {/* sort by */}
              <Block
                style={{
                  marginTop: 24,
                  marginBottom: 24,
                  paddingHorizontal: 15,
                }}>
                <Block marginBottom={12}>
                  <Text fontSize={12} color={'#a8a8a8'}>
                    Sort by
                  </Text>
                </Block>
                {/* Relevance */}
                <Block direction={'row'} justifyContent={'space-between'}>
                  <Block>
                    <Block>
                      <Text fontSize={15}>Relevance</Text>
                    </Block>
                  </Block>
                  <Block>
                    <RadioButton
                      activeColor={'#D6525E'}
                      unActiveColor={'#c2c2c2'}
                      sizeDot={15}
                      initialValue={true}
                    />
                  </Block>
                </Block>
                {/* Most liked */}
                <Block
                  direction={'row'}
                  justifyContent={'space-between'}
                  marginTop={24}>
                  <Block>
                    <Block>
                      <Text fontSize={15}>Most liked</Text>
                    </Block>
                  </Block>
                  <Block>
                    <RadioButton
                      activeColor={'#D6525E'}
                      unActiveColor={'#c2c2c2'}
                      sizeDot={15}
                    />
                  </Block>
                </Block>
              </Block>
              <Divider height={2} color={'#f1f1f1'} />
              {/* give results feedback */}
              <Block
                style={{
                  marginTop: 24,
                  marginBottom: 24,
                  paddingHorizontal: 15,
                }}>
                <Block
                  direction={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Block direction={'row'}>
                    <Block marginRight={12}>
                      <VectorIcon icon={'bx_file'} size={18} />
                    </Block>
                    <Block>
                      <Text fontSize={15}>Give results feedback</Text>
                    </Block>
                  </Block>
                  <Block>
                    <Button
                      onPress={() => {
                        dispatch(appActions.onModalOpen('RESULT_FEEDBACK'));
                      }}>
                      <VectorIcon
                        icon={'bx_chevron_right'}
                        size={30}
                        color={'#a8a8a8'}
                      />
                    </Button>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export const SearchFilter = memo(SearchFilterComponent, isEqual);
