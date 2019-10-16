import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import ConfigSingleton from "../scripts/ConfigSingleton";
import LinearGradient from "react-native-linear-gradient";
import CustomHeader from "../components/Header";
import theme from "../shared/Constants";
import { ScrollView } from "react-native-gesture-handler";

const About = ({ navigation }: any) => {
  const { dictionary } = ConfigSingleton.shared();
  return (
    <>
      <View
        style={{
          height: 90
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={theme.light.linear_gradient}
          style={{ flex: 1 }}
        >
          <CustomHeader
            leftItem={
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => navigation.goBack()}
              >
                <Text style={{ color: theme.light.white }}>Go back</Text>
              </TouchableOpacity>
            }
            centerItem={
              <Text style={{ padding: 10, color: theme.light.white }}>
                About application
              </Text>
            }
          />
        </LinearGradient>
      </View>
      <ScrollView style={{ padding: 10 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "500",
            marginBottom: 20
          }}
        >
          Информация о приложении
        </Text>
        <Text style={{ textAlign: "justify", fontSize: 16 }}>
          Приложение ...
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            textAlign: "center",
            marginVertical: 20
          }}
        >
          Правила игры
        </Text>
        <Text style={{ textAlign: "justify", fontSize: 16 }}>
          {dictionary.RULES_APP}
        </Text>
      </ScrollView>
    </>
  );
};

export default About;
