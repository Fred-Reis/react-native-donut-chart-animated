import React, { useEffect, useRef } from "react";

import { View, Text, Animated, TextInput, StyleSheet } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

interface DonutProps {
  percentage: number;
  radius: number;
  strokeWidth: number;
  duration: number;
  color: string;
  delay: number;
  textcolor?: any | "tomato";
  max: number;
}

interface Props {
  payload: DonutProps;
}

export default function Donut({ payload }: Props) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef();
  const inputRef = useRef();
  const halfCircle = payload.radius + payload.strokeWidth;
  const circleCircunference = 2 * Math.PI * payload.radius;
  const animation = (
    toValue:
      | number
      | Animated.Value
      | Animated.ValueXY
      | {
          x: number;
          y: number;
        }
      | Animated.AnimatedInterpolation
  ) => {
    return Animated.timing(animatedValue, {
      toValue,
      useNativeDriver: true,
      duration: payload.duration,
      delay: payload.delay,
    }).start();
  };

  useEffect(() => {
    animation(payload.percentage);

    animatedValue.addListener((v) => {
      if (circleRef?.current) {
        const maxPercentage = (100 * v.value) / payload.max;
        const strokeDashoffset =
          circleCircunference - (circleCircunference * maxPercentage) / 100;
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}`,
        });
      }
    });
    return () => {
      animatedValue.removeAllListeners();
    };
  }, [payload.max, payload.percentage]);

  return (
    <View>
      <Svg
        width={payload.radius * 2}
        height={payload.radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={payload.color}
            strokeWidth={payload.strokeWidth}
            fill="transparent"
            r={payload.radius}
            strokeOpacity={0.2}
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={payload.color}
            strokeWidth={payload.strokeWidth}
            fill="transparent"
            r={payload.radius}
            strokeOpacity={1}
            strokeDasharray={circleCircunference}
            strokeDashoffset={circleCircunference}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <AnimatedInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          {
            fontSize: payload.radius / 2,
            color: payload.textcolor ?? payload.color,
            fontWeight: "900",
            textAlign: "center",
          },
        ]}
      />
    </View>
  );
}
