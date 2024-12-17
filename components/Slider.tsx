import { View, Text, Platform, Animated } from 'react-native'
import React, { SetStateAction } from 'react'
import { OnboardingSlideType } from '@/types/configs/constantsTypes'
import { runOnJS, SharedValue, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { snapPoint, useVector, Vector } from 'react-native-redash'
import { HEIGHT, LEFT_SNAP_POINT, MARGIN_WIDTH, MIN_LEDGE, NEXT, PREV, RIGHT_SNAP_POINT, WIDTH } from '@/configs/Constant'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

interface SliderProps {
    index: number,
    setIndex: (value: number) => void
    children: React.ReactNode
    prev?: React.ReactNode,
    next?: React.ReactNode
}

interface SlideProps {
    slide: OnboardingSlideType,
    totalSlides: number
}

enum Slid {
    'LEFT',
    'RIGHT',
    'NONE'
}

interface WaveProps {
    side: Slid
    position: Vector<SharedValue<number>>
    isTransitioning: SharedValue<boolean>
}

export function Slider({
        index,
        setIndex,
        prev,
        next,
        children: current
    }: SliderProps
) {
    // create constants 
    const hasPrev = !!prev
    const hasNext = !!next
    const zIndex = useSharedValue(0)
    const activeSide = useSharedValue(Slid.NONE)
    const isTransitionLeft = useSharedValue(false)
    const isTransitionRight = useSharedValue(false)
    const left = useVector(MIN_LEDGE, HEIGHT / 2)
    const right = useVector(MIN_LEDGE, HEIGHT / 2)

    const panGesture = Gesture.Pan()
    .onStart(({x}) => {
        if(x <= MARGIN_WIDTH && hasPrev) {
            activeSide.value = Slid.LEFT
            zIndex.value = 100
        } else if(x >= WIDTH - MARGIN_WIDTH && hasNext) {
            activeSide.value = Slid.RIGHT
        } else {
            activeSide.value = Slid.NONE
        }
    })
    .onUpdate(({x, y}) => {
        if(activeSide.value === Slid.LEFT) {
            left.x.value = Math.max(x, MARGIN_WIDTH)
            left.y.value = y
        } else if(activeSide.value === Slid.RIGHT) {
            right.x.value = Math.max(WIDTH - x, MARGIN_WIDTH)
        }
    })
    .onEnd(({ x, velocityX, velocityY }) => {
        if (activeSide.value === Slid.LEFT) {
          const dest = snapPoint(x, velocityX, LEFT_SNAP_POINT);
          isTransitionLeft.value = dest === PREV;
          left.x.value = withSpring(
            dest,
            {
              velocity: velocityX,
              overshootClamping: isTransitionLeft.value ? true : false,
              restSpeedThreshold: isTransitionLeft.value ? 100 : 0.01,
              restDisplacementThreshold: isTransitionLeft.value ? 100 : 0.01,
            },
            () => {
              if (isTransitionLeft.value) {
                runOnJS(setIndex)(index - 1);
              } else {
                zIndex.value = 0;
                activeSide.value = Slid.NONE;
              }
            }
          );
          left.y.value = withSpring(HEIGHT / 2, { velocity: velocityY });
        } else if (activeSide.value === Slid.RIGHT) {
          const dest = snapPoint(x, velocityX, RIGHT_SNAP_POINT);
          isTransitionRight.value = dest === NEXT;
          right.x.value = withSpring(
            WIDTH - dest,
            {
              velocity: velocityX,
              overshootClamping: isTransitionRight.value ? true : false,
              restSpeedThreshold: isTransitionRight.value ? 100 : 0.01,
              restDisplacementThreshold: isTransitionRight.value ? 100 : 0.01,
            },
            () => {
              if (isTransitionRight.value) {
                runOnJS(setIndex)(index + 1);
              } else {
                activeSide.value = Slid.NONE;
              }
            }
          );
          right.y.value = withSpring(HEIGHT / 2, { velocity: velocityY });
        }
      });

      const leftStyle = useAnimatedStyle(() => ({
        zIndex: zIndex.value,
      }));
    
      React.useEffect(() => {
        if (Platform.OS === "ios") {
          right.x.value = withSpring(WIDTH * 0.167);
        } else {
          right.x.value = withSpring(WIDTH * 0.185);
        }
      }, [left, right]);

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={StyleSheet.absoluteFill}>
        {current}
        {prev && (
          <Animated.View style={[StyleSheet.absoluteFill, leftStyle]}>
            <Wave
              side={Slid.LEFT}
              position={left}
              isTransitioning={isTransitionLeft}
            >
              {prev}
            </Wave>
          </Animated.View>
        )}
        {next && (
          <View style={StyleSheet.absoluteFill}>
            <Wave
              side={Slid.RIGHT}
              position={right}
              isTransitioning={isTransitionRight}
            >
              {next}
            </Wave>
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  )
}

export function Slide({
        slide,
        totalSlides
    }: SlideProps) {
    return (
        <View>
            <Text>Slide</Text>
        </View>
    )
}

export function Wave({
    side,
    position,
    isTransitioning
}: WaveProps) {
    return (
        <View>
            <Text>Wave</Text>
        </View>
    )
}