import React from "react";
import { View, Text, Modal } from "react-native";
import CustomButton from "./CustomButton";
import EventEmitter from "../scripts/customEvents";
import ConfigSingleton from "../scripts/ConfigSingleton";

export interface ICustomModal {
  title: string;
  body: JSX.Element;
  isButtonOk: boolean;
  isButtonCancel: boolean;
  isVisible: boolean;
  onPressBackdrop: () => void;
}

const CustomModal = ({
  title,
  body,
  isVisible,
  isButtonOk,
  isButtonCancel,
  onPressBackdrop
}: ICustomModal) => {
  const { dictionary } = ConfigSingleton.shared();
  const _renderButtons = () => {
    return (
      <View
        style={{
          // flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {isButtonCancel ? (
          <CustomButton
            style={{ padding: 5, borderRadius: 5 }}
            onPress={() => EventEmitter.dispatch("cancel")}
          >
            <Text>{dictionary.ALERT.CANCEL}</Text>
          </CustomButton>
        ) : (
          <View />
        )}
        {isButtonOk ? (
          <CustomButton
            style={{ padding: 5, borderRadius: 5 }}
            onPress={() => EventEmitter.dispatch("ok")}
          >
            <Text>{dictionary.ALERT.OK}</Text>
          </CustomButton>
        ) : (
          <View />
        )}
      </View>
    );
  };

  const _renderBodyModal = () => {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          maxHeight: "80%",
          maxWidth: "80%",
          minWidth: "80%",
          paddingVertical: 10,
          borderRadius: 12,
          justifyContent: "center",
          paddingHorizontal: 20
        }}
      >
        {title && (
          <Text
            style={{
              textAlign: "center",
              marginVertical: 5,
              fontSize: 18
            }}
          >
            {title}
          </Text>
        )}
        {body && (
          <View
            style={{
              marginVertical: 15
            }}
          >
            {body}
          </View>
        )}
        {(isButtonCancel || isButtonOk) && _renderButtons()}
      </View>
    );
  };

  return (
    <Modal
      animationType={"fade"}
      visible={isVisible}
      transparent={true}
      onRequestClose={onPressBackdrop}
    >
      <View
        style={{
          margin: 0,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
          flex: 1
        }}
      >
        {_renderBodyModal()}
      </View>
    </Modal>
  );
};

export default CustomModal;
