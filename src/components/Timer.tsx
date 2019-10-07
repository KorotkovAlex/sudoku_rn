import React, { useState } from "react";
import { View, Text } from "react-native";
import useInterval from "../scripts/customHooks";
import theme from "./../shared/Constants";

interface ITimer {
  stop: boolean;
}

const Timer = ({ stop }: ITimer) => {
  const [secondsCounter, setSecond] = useState("00");
  const [minutesCounter, setMinute] = useState("00");

  useInterval(() => {
    if (!stop) {
      let num: any = (Number(secondsCounter) + 1).toString();
      let count: any = minutesCounter;
      if (secondsCounter === "59") {
        count = (Number(minutesCounter) + 1).toString();
        num = "00";
        setMinute(count.length === 1 ? "0" + count : count);
      }
      setSecond(num.length === 1 ? "0" + num : num);
    }
  }, 1000);

  return (
    <View>
      <Text
        style={{ color: theme.light.white, fontSize: 20 }}
      >{`${minutesCounter}:${secondsCounter}`}</Text>
    </View>
  );
};

export default Timer;
