import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';

import isEqual from 'react-fast-compare';
import { Extrapolate } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ImageTypes } from '@assets/image';
import { Block, Button, Icon, LocalImage, Screen, Text } from '@components';
import {
  navigate,
  navigateMerge,
  goBack,
} from '@navigation/navigation-service';
import { APP_SCREEN, RootStackParamList } from '@navigation/screen-types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Option } from './type';

const { width } = Dimensions.get('window');
const LOGO_SIZE = 140;
const SCROLL_THROTTLE = 120;
const ANIMATED_HEADER_HEIGHT = 90;
const OPTION_BTN_COLOR = '#E8445A';
const INTEREST_OPTIONS: Option[] = [
  { title: 'Comedy', selected: false },
  { title: 'Daily Life', selected: false },
  { title: 'Entertainment Culture', selected: false },
  { title: 'Outdoors', selected: false },
  { title: 'Travel', selected: false },
  { title: 'Oddly Satisfying', selected: false },
  { title: 'Food & Drink', selected: false },
  { title: 'Auto & Vehicle', selected: false },
  { title: 'Animals', selected: false },
  { title: 'Gaming', selected: false },
  { title: 'Sports', selected: false },
  { title: 'Family', selected: false },
  { title: 'Beauty & Style', selected: false },
  { title: 'DIY', selected: false },
  { title: 'Anime & Comics', selected: false },
  { title: 'Music', selected: false },
  { title: 'Science & Education', selected: false },
  { title: 'Fitness & Health', selected: false },
  { title: 'Home & Garden', selected: false },
  { title: 'Art', selected: false },
  { title: 'Motivation & Advice', selected: false },
  { title: 'Life Hacks', selected: false },
  { title: 'Dance', selected: false },
];
const GIF_IMAGES: ImageTypes[] = [
  'welcome_dog_tiktok',
  'welcome_cat_tiktok',
  'welcome_bird_tiktok',
  'welcome_seal_tiktok',
];
const CAROUSEL_WIDTH = 180;
const CAROUSEL_HEIGHT = 360;
const CAROUSEL_HAND_SIZE = 72;
const CAROUSEL_TOUCH_POINT_SIZE = 36;

const aniLogoValue = new Animated.Value(0);
const FirstP = () => {
  const translateY = aniLogoValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0, -10, 0],
  });
  const opacity = aniLogoValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });
  useEffect(() => {
    // animated logo
    Animated.timing(aniLogoValue, {
      toValue: 1,
      delay: 500,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <Block block paddingTop={0} paddingHorizontal={15}>
      <Screen
        statusBarStyle="dark-content"
        bottomInsetColor="transparent"
        style={{ paddingVertical: 0, paddingHorizontal: 10 }}
        backgroundColor={'transparent'}>
        <Block paddingVertical={15} direction={'column'}>
          <Text fontSize={36} fontWeight="bold">
            Videos to
          </Text>
          <Text fontSize={36} fontWeight="bold">
            Make
          </Text>
          <Text fontSize={36} fontWeight="bold">
            Your Day
          </Text>
        </Block>
        <Animated.View
          style={{
            transform: [{ translateY }],
            opacity,
            width: LOGO_SIZE,
            height: LOGO_SIZE,
            position: 'absolute',
            left: 0,
            bottom: 30,
          }}>
          <Block pointerEvents={'none'} width={140} height={140}>
            <LocalImage resizeMode={'contain'} source={'welcome_tiktok_logo'} />
          </Block>
        </Animated.View>
      </Screen>
    </Block>
  );
};

const SecondP = ({
  options,
  handleSetOptions,
  handleConfirm,
}: {
  options: Option[];
  handleSetOptions: (options: Option[]) => void;
  handleConfirm: () => void;
}) => {
  // animated header
  const insets = useSafeAreaInsets();
  const offset = useRef(new Animated.Value(0)).current;
  const [opacity, setOpacity] = useState<number>(0);
  const headerHeight = offset.interpolate({
    inputRange: [0, ANIMATED_HEADER_HEIGHT + insets.top],
    outputRange: [ANIMATED_HEADER_HEIGHT + insets.top, insets.top + 44],
    extrapolate: Extrapolate.CLAMP,
  });
  //
  useEffect(() => {
    const id = setTimeout(() => {
      Alert.alert(
        '',
        'By tapping "Agree and continue", you agree to our Terms of Service and acknowledge that you have read our Privacy Policy to learn how we collect, use, and share your data',
        [
          {
            text: 'Agree and continue',
            onPress: () => {
              console.log('agreed');
            },
            style: 'default',
          },
        ],
      );
    }, 1000);
    return () => clearTimeout(id);
  }, []);
  //
  const enableInterests = options.some(op => op.selected);
  return (
    <Block block>
      {/* interests list */}
      <Block block paddingTop={0} paddingBottom={90} paddingHorizontal={15}>
        <Screen
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            {
              useNativeDriver: false,
              listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
                const offsetY = e.nativeEvent.contentOffset.y;
                const offsetYAbs = offsetY > 0 ? offsetY : 0;
                const minVal = Math.min(offsetYAbs, SCROLL_THROTTLE);
                setOpacity(minVal / SCROLL_THROTTLE);
              },
            },
          )}
          scroll
          statusBarStyle="dark-content"
          bottomInsetColor="transparent"
          style={{ paddingVertical: 0, paddingHorizontal: 10 }}
          backgroundColor={'transparent'}>
          <Block paddingVertical={15} direction={'column'}>
            <Text fontSize={36} fontWeight="bold">
              Choose your
            </Text>
            <Text fontSize={36} fontWeight="bold">
              interests
            </Text>
          </Block>
          <Block>
            <Text fontSize={18}>Get better video recommendations</Text>
          </Block>
          <Block paddingTop={40} direction="row" flexWrap={'wrap'}>
            {options.map((op, index) => (
              <Button
                key={index}
                style={{
                  backgroundColor: op.selected ? OPTION_BTN_COLOR : 'white',
                  paddingHorizontal: 13,
                  paddingVertical: 12,
                  borderRadius: 24,
                  borderWidth: 0.5,
                  borderColor: op.selected ? OPTION_BTN_COLOR : '#ccc',
                  marginRight: 9,
                  marginBottom: 12,
                }}
                onPress={() => {
                  const updated = options.map((item, i) => {
                    if (i === index) {
                      item.selected = !item.selected;
                    }
                    return item;
                  });
                  handleSetOptions(updated);
                }}>
                <Text color={op.selected ? 'white' : 'black'} fontSize={15}>
                  {op.title}
                </Text>
              </Button>
            ))}
          </Block>
        </Screen>
      </Block>
      {/* hidden header */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          height: headerHeight,
          backgroundColor: '#F2F2F2',
          borderBottomColor: '#ccc',
          borderWidth: 1,
          borderStyle: 'solid',
          opacity,
        }}>
        <Block
          block
          paddingTop={42}
          justifyContent={'center'}
          alignItems={'center'}>
          <Text fontSize={18} fontWeight="bold">
            Choose your interests
          </Text>
        </Block>
      </Animated.View>
      {/* fixed footer */}
      <Block
        block
        style={{
          backgroundColor: '#F2F2F2',
        }}
        paddingTop={15}
        paddingHorizontal={15}
        position={'absolute'}
        left={0}
        bottom={0}
        height={120}
        width={'100%'}
        borderColor={'#ccc'}
        borderTopWidth={1}
        borderStyle={'solid'}
        direction="row">
        <Button
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 13,
            paddingVertical: 15,
            borderWidth: 0.5,
            borderColor: '#ccc',
            marginRight: 9,
            flex: 1,
            height: 50,
          }}
          onPress={handleConfirm}>
          <Text color={'black'} fontSize={15} center>
            Skip
          </Text>
        </Button>
        <Button
          style={{
            backgroundColor: enableInterests ? OPTION_BTN_COLOR : '#ccc',
            paddingHorizontal: 13,
            paddingVertical: 15,
            flex: 1,
            height: 50,
          }}
          disabled={!enableInterests}
          onPress={handleConfirm}>
          <Text color={'white'} fontSize={15} center>
            Next
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

const aniHandValue = new Animated.Value(0);
const ThirdP = ({ handleConfirm }: { handleConfirm: () => void }) => {
  const _refRoot = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState<number>(0);
  const [enableBtn, setEnableBtn] = useState<boolean>(false);

  const spin = aniHandValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: ['0deg', '60deg', '0deg'],
  });
  const translateY = aniHandValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0, -100, 0],
  });
  const opacity = aniHandValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [1, 0, 0],
  });

  useEffect(() => {
    // animated hand
    Animated.loop(
      Animated.timing(aniHandValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
    // carousel auto scroll
    const id = setInterval(() => {
      setIndex(prevIndex => prevIndex + 1);
    }, 2000);
    // enable btn
    const tid = setTimeout(() => {
      setEnableBtn(true);
    }, 3000);
    return () => {
      clearInterval(id);
      clearTimeout(tid);
    };
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      delay: 3000,
      toValue: 1,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    const scrollIndex = index % GIF_IMAGES.length;
    if (_refRoot.current) {
      _refRoot.current?.scrollTo({
        x: 0,
        y: (CAROUSEL_HEIGHT + 20) * scrollIndex,
        animated: true,
      });
    }
  }, [index]);

  return (
    <Block block paddingTop={0} paddingHorizontal={15}>
      <Screen
        statusBarStyle="dark-content"
        bottomInsetColor="transparent"
        style={{ paddingVertical: 0, paddingHorizontal: 10 }}
        backgroundColor={'transparent'}>
        <Block paddingVertical={15} direction={'column'}>
          <Text fontSize={36} fontWeight="bold">
            Swipe up
          </Text>
        </Block>
        <Block paddingVertical={6} direction={'column'} paddingRight={30}>
          <Text fontSize={18} lineHeight={24}>
            Videos are personalized for you based on what you watch, like, and
            share.
          </Text>
        </Block>
        {/* carousel */}
        <Block
          marginTop={40}
          alignItems={'center'}
          height={CAROUSEL_HEIGHT}
          position="relative">
          {/* iphone frame */}
          <Block
            width={CAROUSEL_WIDTH}
            height={CAROUSEL_HEIGHT}
            position="absolute"
            top={0}
            left={width / 2 - 35 - CAROUSEL_WIDTH / 2}
            zIndex={99}>
            <LocalImage resizeMode={'contain'} source={'welcome_iphone'} />
          </Block>
          {/* animated touch point */}
          <Block
            width={CAROUSEL_TOUCH_POINT_SIZE}
            height={CAROUSEL_TOUCH_POINT_SIZE}
            position="absolute"
            top={(CAROUSEL_HEIGHT - CAROUSEL_TOUCH_POINT_SIZE) / 2 + 90}
            right={width / 2 - 35 - CAROUSEL_TOUCH_POINT_SIZE / 2}
            zIndex={99}>
            <Animated.View
              style={{
                transform: [{ translateY }],
                opacity,
                width: CAROUSEL_TOUCH_POINT_SIZE,
                height: CAROUSEL_TOUCH_POINT_SIZE,
                backgroundColor: '#ccc',
                borderRadius: CAROUSEL_TOUCH_POINT_SIZE,
              }}
            />
          </Block>
          {/* animated hand */}
          <Block
            width={CAROUSEL_HAND_SIZE}
            height={CAROUSEL_HAND_SIZE}
            style={{
              transform: [{ rotate: '-90deg' }],
            }}
            position="absolute"
            top={(CAROUSEL_HEIGHT - CAROUSEL_HAND_SIZE) / 2 + 90}
            right={width / 2 - 35 - CAROUSEL_WIDTH / 2 - 20}
            zIndex={99}>
            <Animated.View
              style={{
                transform: [{ rotate: spin }],
                width: 200,
                height: 200,
              }}>
              <Icon icon={'hand'} size={CAROUSEL_HAND_SIZE} />
            </Animated.View>
          </Block>
          {/* actual carousel */}
          <ScrollView
            ref={_refRoot}
            style={{
              width: CAROUSEL_WIDTH,
              height: CAROUSEL_HEIGHT,
              borderRadius: 18,
            }}
            pagingEnabled>
            {GIF_IMAGES.map((img, index) => (
              <Block
                key={index}
                width={CAROUSEL_WIDTH - 10}
                height={CAROUSEL_HEIGHT}
                borderRadius={18}
                overflow={'hidden'}>
                <LocalImage resizeMode={'cover'} source={img} />
              </Block>
            ))}
          </ScrollView>
        </Block>
        {/* bottom button */}
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            bottom: 30,
            width: '100%',
            height: 50,
            opacity: fadeAnim,
          }}>
          <Button
            style={{
              backgroundColor: OPTION_BTN_COLOR,
              paddingHorizontal: 13,
              paddingVertical: 15,
              flex: 1,
              height: 50,
            }}
            disabled={!enableBtn}
            onPress={handleConfirm}>
            <Text color={'white'} fontSize={15} center>
              Start watching
            </Text>
          </Button>
        </Animated.View>
      </Screen>
    </Block>
  );
};

type unauthScreenNavigationType = StackNavigationProp<
  RootStackParamList,
  APP_SCREEN.DETAIL
>;
const WelcomeComponent = () => {
  const nav = useNavigation<unauthScreenNavigationType>();
  const [step, setStep] = useState<number>(1);
  const [options, setOptions] = useState<Option[]>(INTEREST_OPTIONS);

  useEffect(() => {
    const id = setTimeout(() => {
      if (step === 1) {
        setStep(2);
      }
      // nav.navigate(APP_SCREEN.DETAIL, {
      //   id: 999,
      // });
      // navigate(APP_SCREEN.DETAIL, {
      //   id: 996,
      // });
    }, 3000);
    return () => clearTimeout(id);
  }, []);

  if (step === 1) {
    return <FirstP />;
  } else if (step === 2) {
    return (
      <SecondP
        options={options}
        handleSetOptions={options => setOptions(options)}
        handleConfirm={() => setStep(3)}
      />
    );
  } else if (step === 3) {
    return <ThirdP handleConfirm={() => setStep(4)} />;
  }
  return null;
};

export const Welcome = memo(WelcomeComponent, isEqual);
