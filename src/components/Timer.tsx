import React, { useState } from "react";
import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import useInterval from "../scripts/customHooks";

interface ITimer {
  styleContent?: StyleProp<ViewStyle | TextStyle>;
  styleText?: StyleProp<ViewStyle | TextStyle>;
}

const Timer = ({styleContent, styleText}: ITimer) => {
  const [secondsCounter, setSecond] = useState("00");
  const [minutesCounter, setMinute] = useState("00");

  useInterval(() => {
    let num: any = (Number(secondsCounter) + 1).toString();
    let count: any = minutesCounter;
    if (secondsCounter === "59") {
      count = (Number(minutesCounter) + 1).toString();
      num = "00";
      setMinute(count.length === 1 ? "0" + count : count);
    }
    setSecond(num.length === 1 ? "0" + num : num);
  }, 1000);

  return (
    <View style={styleContent}>
      <Text style={styleText}>{`${minutesCounter}:${secondsCounter}`}</Text>
    </View>
  );
};

export default Timer;