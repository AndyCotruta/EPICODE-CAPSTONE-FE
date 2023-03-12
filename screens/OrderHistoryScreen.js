import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/reducers/userSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { lightBeige } from "../graphics/colours";

const OrderHistoryScreen = () => {
  const userData = useSelector(selectUserData);

  return (
    <SafeAreaView style={tw.style("flex-1 bg-white p-4")}>
      <Text style={tw.style("text-3xl font-bold")}>Active Order</Text>
      <View style={tw.style(`bg-[${lightBeige}] p-4 rounded-xl`)}>
        <Text>{userData.activeOrder._id}</Text>
      </View>
    </SafeAreaView>
  );
};

export default OrderHistoryScreen;
