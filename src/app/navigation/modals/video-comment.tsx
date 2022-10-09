import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated as AnimatedRN,
  Dimensions,
  Easing,
  FlatList,
  Keyboard,
  NativeModules,
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
  Icon,
  Image,
  Text,
} from '@components';
import { appActions } from '@redux-slice';
import { capitalize } from '@utils/common';
import dayjs from 'dayjs';

type Comment = {
  id: string;
  avatarImageUrl?: string;
  senderName: string;
  message: string;
  date: Date;
  isLike: boolean;
  isDislike: boolean;
  likeCount: number;
  replies?: Comment[];
  isOpen: boolean;
};
const comments: Comment[] = [
  {
    id: '1',
    avatarImageUrl: 'https://picsum.photos/id/1002/4312/2868',
    senderName: 'Roy Test',
    message: 'hi',
    date: new Date('2022-01-01'),
    isLike: true,
    isDislike: false,
    likeCount: 103,
    replies: [],
    isOpen: false,
  },
  {
    id: '2',
    avatarImageUrl: 'https://picsum.photos/id/1003/1181/1772',
    senderName: 'Roy Lukas',
    message: 'song name?',
    date: new Date('2022-01-03'),
    isLike: false,
    isDislike: false,
    likeCount: 0,
    replies: [
      {
        id: '22',
        avatarImageUrl: 'https://picsum.photos/id/1004/5616/3744',
        senderName: 'Alejandrop Escamilla',
        message: 'abc song...',
        date: new Date('2022-01-04'),
        isLike: false,
        isDislike: false,
        likeCount: 0,
        isOpen: false,
      },
      {
        id: '222',
        avatarImageUrl: 'https://picsum.photos/id/1005/5760/3840',
        senderName: 'Paul Jarvis',
        message: 'not abc song 2...',
        date: new Date('2022-01-04'),
        isLike: false,
        isDislike: false,
        likeCount: 0,
        isOpen: false,
      },
    ],
    isOpen: true,
  },
  {
    id: '3',
    // avatarImageUrl: 'https://picsum.photos/id/1006/3000/2000',
    senderName: 'Tina Rataj',
    message: 'hhhhh',
    date: new Date('2022-01-02'),
    isLike: false,
    isDislike: true,
    likeCount: 39,
    replies: [],
    isOpen: false,
  },
  {
    id: '4',
    avatarImageUrl: 'https://picsum.photos/id/1008/5616/3744',
    senderName: 'Danielle MacInnes',
    message: 'nasa',
    date: new Date('2022-01-05'),
    isLike: false,
    isDislike: false,
    likeCount: 66,
    replies: [
      {
        id: '44',
        avatarImageUrl: 'https://picsum.photos/id/1009/5000/7502',
        senderName: 'Alejandrop New',
        message: 'this is my reply',
        date: new Date('2022-01-04'),
        isLike: false,
        isDislike: false,
        likeCount: 0,
        isOpen: false,
      },
      {
        id: '444',
        avatarImageUrl: 'https://picsum.photos/id/101/2621/1747',
        senderName: 'Paul New',
        message: 'this is new reply',
        date: new Date('2022-01-04'),
        isLike: false,
        isDislike: false,
        likeCount: 0,
        isOpen: false,
      },
    ],
    isOpen: false,
  },
  {
    id: '5',
    avatarImageUrl: 'https://picsum.photos/id/1010/5184/3456',
    senderName: 'Danielle MacInnes',
    message: 'E+N photo',
    date: new Date('2022-01-05'),
    isLike: false,
    isDislike: false,
    likeCount: 66,
    replies: [],
    isOpen: false,
  },
];

const REPLY_BOX_HEIGHT = 180;
const AVATAR_ICON_SIZE = 36;
const REPLAY_AVATAR_ICON_SIZE = 24;
const viewabilityConfig = {
  itemVisiblePercentThreshold: 40,
  waitForInteraction: true,
};
const aniValue = new AnimatedRN.Value(0);
const { width, height } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const VideoCommentComponent = ({
  handleConfirm,
}: {
  handleConfirm: () => void;
}) => {
  const _refBS = useRef<BottomSheetRef>(null);
  const _refRoot = useRef<FlatList>(null);
  const [visibleItemIndex, setVisibleItemIndex] = useState<number>(0);

  //
  const translateY = aniValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -320],
  });

  //
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
      AnimatedRN.timing(aniValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      AnimatedRN.timing(aniValue, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  //
  const onViewableItemsChanged = useCallback(({ changed }) => {
    if (changed && changed.length > 0) {
      setVisibleItemIndex(changed[0].index);
    }
  }, []);
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged: onViewableItemsChanged },
  ]);

  const onPress = useCallback(() => {
    const isActive = _refBS?.current?.isActive();
    if (!isActive) {
      _refBS?.current?.scrollTo((-(height - statusBarHeight) / 3) * 2);
    }
  }, []);

  useEffect(() => {
    onPress();
  }, [onPress]);

  const renderTopBar = () => (
    <>
      {/* top right btn */}
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

  const renderCommentItem = ({ item }: { item: Comment }) => {
    return (
      <Block direction={'row'} marginBottom={12} paddingHorizontal={18}>
        {/* avatar */}
        <Block
          style={{
            width: AVATAR_ICON_SIZE,
            height: AVATAR_ICON_SIZE,
            borderRadius: AVATAR_ICON_SIZE,
            overflow: 'hidden',
            marginRight: 9,
          }}>
          {item.avatarImageUrl ? (
            <Image
              style={{
                width: AVATAR_ICON_SIZE,
                height: AVATAR_ICON_SIZE,
              }}
              source={{ uri: item.avatarImageUrl }}
            />
          ) : (
            <Block
              style={{
                height: AVATAR_ICON_SIZE,
                width: AVATAR_ICON_SIZE,
                borderRadius: AVATAR_ICON_SIZE,
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text color={'white'} fontSize={21}>
                {capitalize(item.senderName.substring(0, 1))}
              </Text>
            </Block>
          )}
        </Block>
        {/* main */}
        <Block style={{ flexGrow: 1 }}>
          <Block marginBottom={3}>
            <Text fontSize={13} fontWeight={'bold'}>
              {item.senderName}
            </Text>
          </Block>
          <Block marginBottom={3}>
            <Text fontSize={15}>{item.message}</Text>
          </Block>
          <Block
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            style={{
              flex: 1,
            }}>
            <Block
              direction={'row'}
              style={{
                flex: 1,
              }}>
              <Block marginRight={18}>
                <Text color={'#8a8a8a'} fontSize={12}>
                  {dayjs(item.date.toDateString()).format('MM-DD')}
                </Text>
              </Block>
              <Block>
                <Button>
                  <Text color={'#8a8a8a'} fontSize={12}>
                    Reply
                  </Text>
                </Button>
              </Block>
            </Block>
            {/* icons */}
            <Block
              direction={'row'}
              style={{
                flex: 1,
              }}>
              <Block
                flex={1}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'flex-end'}>
                <Button>
                  <VectorIcon
                    color={item.isLike ? '#C54C58' : '#8a8a8a'}
                    icon={'bx_heart'}
                    size={21}
                  />
                </Button>
                {item.likeCount > 0 && (
                  <Block marginLeft={3}>
                    <Text
                      color={item.isLike ? '#C54C58' : '#8a8a8a'}
                      fontSize={12}>
                      {item.likeCount}
                    </Text>
                  </Block>
                )}
              </Block>
              <Block flex={1} alignItems={'flex-end'}>
                <Button>
                  <VectorIcon
                    color={item.isDislike ? '#ECD064' : '#8a8a8a'}
                    icon={'bx_dislike'}
                    size={21}
                  />
                </Button>
              </Block>
            </Block>
          </Block>
          {/* collapse replies */}
          {item.replies && item.replies.length > 0 && !item.isOpen && (
            <Block marginTop={12}>
              <Button>
                <Block direction={'row'} alignItems={'center'}>
                  <Text color={'#8a8a8a'} fontSize={12}>
                    View {item.replies?.length} reply
                  </Text>
                  <VectorIcon
                    color={'#8a8a8a'}
                    icon={'bx_chevron_down'}
                    size={21}
                  />
                </Block>
              </Button>
            </Block>
          )}
          {/* open replies */}
          {item.replies && item.replies.length > 0 && item.isOpen && (
            <Block flex={1}>
              {item.replies.map(reply => {
                return (
                  <Block key={reply.id} direction={'row'} marginTop={12}>
                    {/* avatar */}
                    <Block
                      style={{
                        width: REPLAY_AVATAR_ICON_SIZE,
                        height: REPLAY_AVATAR_ICON_SIZE,
                        borderRadius: REPLAY_AVATAR_ICON_SIZE,
                        overflow: 'hidden',
                        marginRight: 9,
                      }}>
                      {reply.avatarImageUrl ? (
                        <Image
                          style={{
                            width: REPLAY_AVATAR_ICON_SIZE,
                            height: REPLAY_AVATAR_ICON_SIZE,
                          }}
                          source={{ uri: reply.avatarImageUrl }}
                        />
                      ) : (
                        <Block
                          style={{
                            height: REPLAY_AVATAR_ICON_SIZE,
                            width: REPLAY_AVATAR_ICON_SIZE,
                            borderRadius: REPLAY_AVATAR_ICON_SIZE,
                            backgroundColor: 'black',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text color={'white'} fontSize={21}>
                            {capitalize(reply.senderName.substring(0, 1))}
                          </Text>
                        </Block>
                      )}
                    </Block>
                    <Block style={{ flexGrow: 1 }}>
                      <Block marginBottom={3}>
                        <Text fontSize={13} fontWeight={'bold'}>
                          {reply.senderName}
                        </Text>
                      </Block>
                      <Block marginBottom={3}>
                        <Text fontSize={15}>{reply.message}</Text>
                      </Block>
                      <Block
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        style={{
                          flex: 1,
                        }}>
                        <Block
                          direction={'row'}
                          style={{
                            flex: 1,
                          }}>
                          <Block marginRight={18}>
                            <Text color={'#8a8a8a'} fontSize={12}>
                              {dayjs(reply.date.toDateString()).format('MM-DD')}
                            </Text>
                          </Block>
                          <Block>
                            <Button>
                              <Text color={'#8a8a8a'} fontSize={12}>
                                Reply
                              </Text>
                            </Button>
                          </Block>
                        </Block>
                        {/* icons */}
                        <Block
                          direction={'row'}
                          style={{
                            flex: 1,
                          }}>
                          <Block
                            flex={1}
                            direction={'row'}
                            alignItems={'center'}
                            justifyContent={'flex-end'}>
                            <Button>
                              <VectorIcon
                                color={reply.isLike ? '#C54C58' : '#8a8a8a'}
                                icon={'bx_heart'}
                                size={21}
                              />
                            </Button>
                            {reply.likeCount > 0 && (
                              <Block marginLeft={3}>
                                <Text
                                  color={reply.isLike ? '#C54C58' : '#8a8a8a'}
                                  fontSize={12}>
                                  {reply.likeCount}
                                </Text>
                              </Block>
                            )}
                          </Block>
                          <Block flex={1} alignItems={'flex-end'}>
                            <Button>
                              <VectorIcon
                                color={reply.isDislike ? '#ECD064' : '#8a8a8a'}
                                icon={'bx_dislike'}
                                size={21}
                              />
                            </Button>
                          </Block>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                );
              })}
              <Block flex={1} alignItems={'flex-end'} marginTop={12}>
                <Button>
                  <Block direction={'row'} alignItems={'center'}>
                    <Text color={'#8a8a8a'} fontSize={12}>
                      Hide
                    </Text>
                    <VectorIcon
                      color={'#8a8a8a'}
                      icon={'bx_chevron_up'}
                      size={21}
                    />
                  </Block>
                </Button>
              </Block>
            </Block>
          )}
        </Block>
      </Block>
    );
  };

  const renderCommentList = () => {
    return (
      <FlatList
        ref={_refRoot}
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id}
        style={{
          width,
          height: (2 / 3) * height - REPLY_BOX_HEIGHT - 12,
        }}
        showsVerticalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    );
  };

  return (
    <GestureHandlerRootView>
      <BottomSheet
        ref={_refBS}
        height={((height - statusBarHeight) / 3) * 2}
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
            block
            style={{
              width,
              marginTop: 15,
            }}>
            <Block>
              <Text fontSize={12} center>
                57 comments
              </Text>
            </Block>
            {/* comments */}
            <Block style={{ paddingTop: 18 }}>{renderCommentList()}</Block>
            {/* reply box */}
            <AnimatedRN.View
              style={{
                backgroundColor: 'white',
                position: 'absolute',
                bottom: 64,
                left: 0,
                zIndex: 1,
                width,
                transform: [
                  {
                    translateY,
                  },
                ],
              }}>
              <Block direction={'row'} paddingHorizontal={18} marginTop={12}>
                <Block
                  style={{
                    width: AVATAR_ICON_SIZE,
                    height: AVATAR_ICON_SIZE,
                    borderRadius: AVATAR_ICON_SIZE,
                    overflow: 'hidden',
                    marginRight: 9,
                  }}>
                  <Block
                    style={{
                      height: AVATAR_ICON_SIZE,
                      width: AVATAR_ICON_SIZE,
                      borderRadius: AVATAR_ICON_SIZE,
                      backgroundColor: '#B1305B',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text color={'white'} fontSize={21}>
                      J
                    </Text>
                  </Block>
                </Block>
                <Block
                  style={{
                    flexGrow: 1,
                    backgroundColor: '#F1F1F1',
                    borderRadius: 12,
                    overflow: 'hidden',
                  }}>
                  <TextInput
                    right={
                      <TextInput.Icon
                        name={() => (
                          <Block direction={'row'}>
                            <VectorIcon
                              color={'black'}
                              icon={'bx_at'}
                              size={24}
                            />
                          </Block>
                        )}
                      />
                    }
                    style={{
                      height: 42,
                      fontSize: 15,
                    }}
                    theme={{ colors: { text: 'black' } }}
                    activeUnderlineColor={'transparent'}
                    underlineColor={'transparent'}
                    placeholderTextColor={'#a8a8a8'}
                    placeholder={'Add comment..'}
                    // value={''}
                  />
                </Block>
              </Block>
            </AnimatedRN.View>
          </Block>
        </Block>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export const VideoComment = memo(VideoCommentComponent, isEqual);
