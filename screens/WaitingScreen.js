import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { darkOrange, lightBeige } from "../graphics/colours";
import * as Progress from "react-native-progress";

const WaitingScreen = () => {
  return (
    <SafeAreaView
      style={tw.style(`flex-1 bg-[#f5f1ee] justify-center items-center p-4`)}
    >
      <View style={tw.style(" w-full")}>
        <Image
          style={tw.style("w-full h-110")}
          source={require("../assets/waitingScreen.png")}
        />
      </View>

      <Text style={tw.style("text-2xl text-center font-bold")}>
        Waiting for the host to pick up a Restaurant
      </Text>
      <View style={tw.style("py-10")}>
        <Progress.Bar
          progress={0.3}
          width={200}
          indeterminate={true}
          animated={true}
          animationType="spring"
          color="#f56f40"
        />
      </View>
    </SafeAreaView>
  );
};

export default WaitingScreen;
