import React, { useCallback, useImperativeHandle } from 'react';
import { Dimensions } from 'react-native';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { styles } from './styles';
import { BottomSheetProps, BottomSheetRefProps } from './type';

const windowHeight = Dimensions.get('window').height;

export type BottomSheetRef = BottomSheetRefProps;
export const BottomSheet = React.forwardRef<
  BottomSheetRefProps,
  BottomSheetProps
>(({ children, height, secondHeight, throttle, toggleModal }, ref) => {
  const MAX_TRANSLATE_Y = -height;
  const translateY = useSharedValue(0);
  const active = useSharedValue(false);

  const scrollTo = useCallback((destination: number) => {
    'worklet';
    active.value = destination !== 0;
    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  const isActive = useCallback(() => {
    return active.value;
  }, []);

  useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
    scrollTo,
    isActive,
  ]);

  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (typeof secondHeight !== 'undefined') {
        const MAX_HALF_TRANSLATE_Y = -secondHeight;
        if (translateY.value > -secondHeight + throttle) {
          scrollTo(0);
          runOnJS(toggleModal)(false);
        } else if (translateY.value > -height + throttle) {
          scrollTo(MAX_HALF_TRANSLATE_Y);
          runOnJS(toggleModal)(true);
        } else {
          scrollTo(MAX_TRANSLATE_Y);
          runOnJS(toggleModal)(true);
        }
      } else {
        if (translateY.value > -height + throttle) {
          scrollTo(0);
          runOnJS(toggleModal)(false);
        } else {
          scrollTo(MAX_TRANSLATE_Y);
          runOnJS(toggleModal)(true);
        }
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y, MAX_TRANSLATE_Y],
      [15, 0],
      Extrapolate.CLAMP,
    );
    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.bottomSheetContainer,
          rBottomSheetStyle,
          {
            height,
            // top: height,
            top: windowHeight,
          },
        ]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
});

// youtube
// https://www.youtube.com/watch?v=KvRqsRwpwhY&t=171s
