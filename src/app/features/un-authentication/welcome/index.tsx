import React, { memo, useRef, useState, useCallback, useEffect } from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import isEqual from 'react-fast-compare';
import { Extrapolate } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Block, Button, LocalImage, Screen, Text } from '@components';

interface Option {
  title: string;
  selected: boolean;
}

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

const FirstP = () => {
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
        <Block
          pointerEvents={'none'}
          position={'absolute'}
          left={0}
          bottom={30}
          width={140}
          height={140}>
          <LocalImage resizeMode={'contain'} source={'welcome_tiktok_logo'} />
        </Block>
      </Screen>
    </Block>
  );
};

const SecondP = ({
  options,
  handleSetOptions,
}: {
  options: Option[];
  handleSetOptions: (options: Option[]) => void;
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
          onPress={() => {}}>
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
          onPress={() => {}}>
          <Text color={'white'} fontSize={15} center>
            Next
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

const WelcomeComponent = () => {
  const [step, setStep] = useState<number>(1);
  const [options, setOptions] = useState<Option[]>(INTEREST_OPTIONS);

  useEffect(() => {
    const id = setTimeout(() => {
      setStep(2);
    }, 3000);
    return () => clearTimeout(id);
  }, []);

  if (step === 1) {
    return <FirstP />;
  }
  if (step === 2) {
    return (
      <SecondP
        options={options}
        handleSetOptions={options => setOptions(options)}
      />
    );
  }
  return null;
};

export const Welcome = memo(WelcomeComponent, isEqual);
