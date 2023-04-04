import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/reducers/userSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { darkGreen, lightBeige } from "../graphics/colours";
import ActiveOrder from "../components/ActiveOrder";
import OrderHistory from "../components/OrderHistory";
import SharedOrder from "../components/SharedOrder";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const OrderHistoryScreen = () => {
  const navigation = useNavigation();

  const userData = useSelector(selectUserData);

  return (
    <SafeAreaView style={tw.style("flex-1 bg-white")}>
      <TouchableOpacity
        style={tw.style(
          `w-10 h-10 mx-4 my-4 bg-[${lightBeige}] rounded-full items-center justify-center`
        )}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <ArrowLeftIcon size={20} color={darkGreen} />
      </TouchableOpacity>

      <ScrollView style={tw.style("")}>
        {userData.activeOrder ? (
          <View style={tw.style("mt-3")}>
            <ActiveOrder />
          </View>
        ) : (
          <View style={tw.style("mt-3 px-4")}>
            <Text style={tw.style("text-3xl font-bold mb-3")}>
              Active Order
            </Text>
            <View
              style={tw.style(` bg-[${lightBeige}] p-4 rounded-xl shadow-md`)}
            >
              <Text style={tw.style("text-center font-bold")}>
                There is no current active order
              </Text>
            </View>
          </View>
        )}
        {userData.sharedOrder ? (
          <View style={tw.style("mt-3")}>
            <ActiveOrder shared={"true"} />
          </View>
        ) : (
          <View style={tw.style("px-4")}>
            <Text style={tw.style("text-3xl font-bold my-3")}>
              Active Shared Order
            </Text>
            <View
              style={tw.style(` bg-[${lightBeige}] p-4 rounded-xl shadow-md`)}
            >
              <Text style={tw.style("text-center font-bold")}>
                There is no current active shared order
              </Text>
            </View>
          </View>
        )}
        <View
          style={
            userData.orderHistory?.length === 0
              ? tw.style("w-full h-30 mb-4")
              : tw.style("flex-1")
          }
        >
          {userData.orderHistory?.length === 0 ? (
            <View style={tw.style("px-4 pb-4")}>
              <Text style={tw.style("text-3xl font-bold my-3")}>
                Order History
              </Text>
              <View
                style={tw.style(` bg-[${lightBeige}] p-4 rounded-xl shadow-md`)}
              >
                <Text style={tw.style("text-center font-bold")}>
                  You have no orders in history.
                </Text>
              </View>
            </View>
          ) : (
            <View style={tw.style("px-4 pb-4")}>
              <Text style={tw.style("text-3xl font-bold py-4")}>
                OrderHistory
              </Text>
              <ScrollView
                style={tw.style(`bg-[${lightBeige}] rounded-xl shadow-md px-4`)}
              >
                <OrderHistory />
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderHistoryScreen;
