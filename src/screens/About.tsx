import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
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
                activeOpacity={0.5}
                onPress={() => navigation.goBack()}
                hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
              >
                <Image
                  source={require("../../assets/icons/LeftArrow.png")}
                  style={{
                    height: 25,
                    width: 25,
                    tintColor: theme.light.white
                  }}
                />
              </TouchableOpacity>
            }
            centerItem={
              <Text style={{ color: theme.light.white, fontSize: 16 }}>
                {dictionary.ABOUT.TITLE}
              </Text>
            }
          />
        </LinearGradient>
      </View>
      <ScrollView>
        <View style={{ padding: 10 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "500",
              marginBottom: 20
            }}
          >
            {dictionary.ABOUT.ABOUT_TITLE}
          </Text>
          <Text style={{ textAlign: "justify", fontSize: 16 }}>
            {dictionary.ABOUT.ABOUT_APP}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              textAlign: "center",
              marginVertical: 20
            }}
          >
            {dictionary.ABOUT.RULES_TITLE}
          </Text>
          <Text style={{ textAlign: "justify", fontSize: 16 }}>
            {dictionary.ABOUT.RULES_APP}
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default About;
