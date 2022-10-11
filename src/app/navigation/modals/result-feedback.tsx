import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  NativeModules,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import isEqual from 'react-fast-compare';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { dispatch } from '@common';
import {
  Block,
  BottomSheet,
  BottomSheetRef,
  Button,
  CheckBox,
  Divider,
  RadioButton,
  Switch,
  Text,
} from '@components';
import { appActions } from '@redux-slice';

type Problem = {
  id: string;
  text: string;
};
const problems: Problem[] = [
  {
    id: '1',
    text: 'Technical difficulties',
  },
  {
    id: '2',
    text: "I couldn't find what I was looking for",
  },
  {
    id: '3',
    text: 'The results were too repetitive',
  },
  {
    id: '4',
    text: "I couldn't find trending content",
  },
  {
    id: '5',
    text: 'The results were outdated',
  },
  {
    id: '6',
    text: "The results didn't make sense",
  },
  {
    id: '7',
    text: 'The results were inappropriate',
  },
  {
    id: '8',
    text: 'The results violated our Community Guidelines',
  },
];
const problems2: Problem[] = [
  {
    id: '1',
    text: 'A popular creator',
  },
  {
    id: '2',
    text: "A popular creator's video",
  },
  {
    id: '3',
    text: "My friend's account",
  },
  {
    id: '4',
    text: "My friend's video",
  },
  {
    id: '5',
    text: 'A video I watched, liked, or commented on',
  },
  {
    id: '6',
    text: 'A specific video',
  },
  {
    id: '7',
    text: 'A hashtag',
  },
  {
    id: '8',
    text: 'A sound',
  },
];

const { width, height } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const ResultFeedbackComponent = ({
  handleConfirm,
}: {
  handleConfirm: () => void;
}) => {
  const _refBS = useRef<BottomSheetRef>(null);
  const [toggle, setToggle] = useState<boolean>(false);

  const onPress = useCallback(() => {
    const isActive = _refBS?.current?.isActive();
    if (!isActive) {
      _refBS?.current?.scrollTo(-height);
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
          top: 18,
          left: 12,
          height: 30,
          zIndex: 1,
        }}>
        <Button
          onPress={() => {
            dispatch(appActions.onModalOpen('SEARCH_FILTER'));
          }}>
          <VectorIcon icon={'bx_chevron_left'} size={30} />
        </Button>
      </Block>
      <Block style={{ marginTop: 24, marginBottom: 18 }} direction={'row'}>
        <Text fontSize={15} center fontWeight={'bold'}>
          Results feedback
        </Text>
      </Block>
      <Divider height={2} color={'#f1f1f1'} />
    </>
  );

  return (
    <GestureHandlerRootView>
      <BottomSheet
        ref={_refBS}
        height={height}
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
          {/* button */}
          <Block
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              zIndex: 1,
              width,
              height: 160,
              paddingHorizontal: 15,
              backgroundColor: 'white',
            }}>
            <Button>
              <Block
                style={{
                  paddingVertical: 15,
                  backgroundColor: '#e2e3e4',
                }}>
                <Text fontSize={15} center>
                  Submit
                </Text>
              </Block>
            </Button>
          </Block>
          <ScrollView>
            {/* main content */}
            <Block
              style={{
                width,
                paddingBottom: 180,
                position: 'relative',
              }}>
              {/*  */}
              <Block
                style={{
                  marginTop: 12,
                  marginBottom: 24,
                  paddingHorizontal: 15,
                }}>
                <Block marginBottom={24}>
                  <Text fontSize={12} color={'#a8a8a8'}>
                    Which problems did you experience after searching?
                  </Text>
                </Block>
                {/* problems */}
                {problems.map(problem => (
                  <Block key={problem.id} marginBottom={12}>
                    <Block
                      direction={'row'}
                      justifyContent={'space-between'}
                      marginBottom={12}>
                      <Block>
                        <Text fontSize={13}>{problem.text}</Text>
                      </Block>
                      <Block>
                        <CheckBox
                          style={{
                            width: 24,
                            height: 24,
                          }}
                          fillStyle={{
                            width: 24,
                            height: 24,
                          }}
                          size={24}
                        />
                      </Block>
                    </Block>
                    <Divider height={2} color={'#f1f1f1'} />
                  </Block>
                ))}
              </Block>
              {/* problems 2 */}
              <Block
                style={{
                  marginTop: 12,
                  marginBottom: 24,
                  paddingHorizontal: 15,
                }}>
                <Block marginBottom={24}>
                  <Text fontSize={12} color={'#a8a8a8'}>
                    What were you trying to find?
                  </Text>
                </Block>
                {problems2.map(problem => (
                  <Block key={problem.id} marginBottom={12}>
                    <Block
                      direction={'row'}
                      justifyContent={'space-between'}
                      marginBottom={12}>
                      <Block>
                        <Text fontSize={13}>{problem.text}</Text>
                      </Block>
                      <Block>
                        <RadioButton
                          activeColor={'#D6525E'}
                          unActiveColor={'#c2c2c2'}
                          sizeDot={15}
                        />
                      </Block>
                    </Block>
                    <Divider height={2} color={'#f1f1f1'} />
                  </Block>
                ))}
              </Block>
              {/* textarea */}
              <Block
                style={{
                  marginBottom: 24,
                }}>
                <Block
                  style={{
                    paddingHorizontal: 15,
                  }}
                  direction={'row'}
                  justifyContent={'space-between'}>
                  <Text fontSize={12} color={'#a8a8a8'}>
                    How else could we improve?
                  </Text>
                  <Text fontSize={12} color={'#a8a8a8'}>
                    0/200
                  </Text>
                </Block>
                {/* input */}
                <Block>
                  <TextInput
                    style={{
                      maxHeight: 120,
                      fontSize: 12,
                      backgroundColor: 'transparent',
                      padding: 4,
                    }}
                    multiline
                    theme={{ colors: { text: 'black' } }}
                    activeUnderlineColor={'transparent'}
                    underlineColor={'transparent'}
                    placeholderTextColor={'#a8a8a8'}
                    placeholder={
                      'Let us know how to make search results better'
                    }
                    // value={''}
                  />
                </Block>
                {/* image */}
                <Block
                  style={{
                    paddingHorizontal: 15,
                  }}>
                  <Button>
                    <Block
                      style={{
                        backgroundColor: '#e2e3e4',
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                      }}>
                      <Block
                        style={{
                          position: 'absolute',
                          bottom: 3,
                          left: 0,
                          zIndex: 1,
                          width: 60,
                        }}>
                        <Text fontSize={12} center>
                          0/4
                        </Text>
                      </Block>
                      <VectorIcon icon={'bx_image_add'} size={30} />
                    </Block>
                  </Button>
                </Block>
              </Block>
              <Divider height={2} color={'#f1f1f1'} />
            </Block>
          </ScrollView>
        </Block>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export const ResultFeedback = memo(ResultFeedbackComponent, isEqual);
