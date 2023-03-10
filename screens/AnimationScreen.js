import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  lightOrange,
} from "../graphics/colours";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import restaurantSlice from "../redux/reducers/restaurantSlice";

const AnimationScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);

  return (
    <SafeAreaView
      style={tw.style(
        `bg-[${lightOrange}] flex-1 items-center justify-center `
      )}
    >
      <View style={tw.style(`bg-[${lightOrange}] rounded-xl`)}>
        <Animatable.Image
          style={tw.style("w-100 h-80")}
          source={require("../assets/orderedFood.png")}
          animation="slideInUp"
          iterationCount={1}
        />
        <Animatable.Text
          style={tw.style("text-white text-center font-bold text-lg pb-8")}
          animation="slideInUp"
          iterationCount={1}
          delay={100}
        >
          Your order is being processed...
        </Animatable.Text>
      </View>
      <View style={tw.style("py-10")}>
        <Progress.Bar
          progress={0.3}
          width={200}
          indeterminate={true}
          animated={true}
          animationType="spring"
          color="white"
        />
      </View>
    </SafeAreaView>
  );
};

export default AnimationScreen;
