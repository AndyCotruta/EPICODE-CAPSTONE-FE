import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/reducers/userSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { darkGreen, lightBeige } from "../graphics/colours";
import ActiveOrder from "../components/ActiveOrder";
import OrderHistory from "../components/OrderHistory";

const OrderHistoryScreen = () => {
  const userData = useSelector(selectUserData);

  return (
    <SafeAreaView style={tw.style("flex-1 bg-white p-4")}>
      {userData.activeOrder ? (
        <ActiveOrder />
      ) : (
        <View>
          <Text style={tw.style("text-3xl font-bold mb-3")}>Active Order</Text>
          <View
            style={tw.style(` bg-[${lightBeige}] p-4 rounded-xl shadow-md`)}
          >
            <Text style={tw.style("text-center font-bold")}>
              There is no current active order
            </Text>
          </View>
        </View>
      )}
      <View style={tw.style("flex-1")}>
        <Text style={tw.style("text-3xl font-bold py-4")}>OrderHistory</Text>
        <ScrollView
          style={tw.style(`bg-[${lightBeige}] rounded-xl shadow-md px-4`)}
        >
          <OrderHistory />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrderHistoryScreen;
