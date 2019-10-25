import React, { useState, useImperativeHandle, forwardRef } from "react";
import { View, Text, AsyncStorage } from "react-native";

import useInterval from "../scripts/customHooks";
import theme from "./../shared/Constants";

interface ITimer {
  stop: boolean;
}

const Timer = forwardRef(({ stop }: ITimer, ref) => {
  const [secondsCounter, setSecond] = useState("00");
  const [minutesCounter, setMinute] = useState("00");

  useImperativeHandle(ref, () => ({
    resetTimer() {
      setSecond("00");
      setMinute("00");
    },

    async setTimer() {
      let board: any = await AsyncStorage.getItem("board");
      const { timer } = JSON.parse(board);
      if (!timer) {
        timer.seconds = "00";
        timer.minutes = "00";
      }
      setSecond(timer.seconds);
      setMinute(timer.minutes);

      return true;
    },

    getTimer() {
      return {
        seconds: secondsCounter,
        minutes: minutesCounter
      };
    }
  }));

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
});

export default Timer;
