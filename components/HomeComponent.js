import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";

const HomeComponent = () => {
  return (
    <View style={tw.style("flex-1 px-4")}>
      <Text>HomeComponent</Text>
    </View>
  );
};

export default HomeComponent;
