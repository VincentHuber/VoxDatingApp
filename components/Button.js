import { View, Text, TouchableWithoutFeedback, Animated } from "react-native";
import React, { useCallback, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";

const Button = ({ name, size, color, style, onPress }) => {
  
    const scale = useRef(new Animated.Value(1)).current;
  
  const animateScale = useCallback(
    (newValue) => {
      Animated.spring(scale, {
        toValue: newValue,
        triction: 10,
        useNativeDriver: true,
      }).start();
    },
    [scale]
  );

  return (
    <TouchableWithoutFeedback
      onPressIn={() => animateScale(0.8)}
      onPressOut={() => {
        animateScale(1);
      }}
      delayPressIn={0}
      delayPressOut={20}
    >
      <Animated.View
        style={{
          height: 60,
          width: 60,
          backgroundColor: "white",
          elevation: 5,
          borderRadius: 40,
          justifyContent: "center",
          alignItems: "center",
          borderColor: color,
          borderWidth: 1,
          transform: [{ scale }],
          ...style,
        }}
      >
        <FontAwesome name={name} size={size} color={color} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Button;
