import { View, Text, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/reducers/userSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { darkGreen, lightBeige } from "../graphics/colours";
import ActiveOrder from "../components/ActiveOrder";

const OrderHistoryScreen = () => {
  const userData = useSelector(selectUserData);
  // // const newArray = userData.activeOrder.restaurantId.dishes.filter(
  // //   (existingDish) => userData.activeOrder.dishes.includes(existingDish._id)
  // // );

  // const array1 = userData.activeOrder.restaurantId.dishes;
  // const array2 = userData.activeOrder.dishes;

  // const count = array2.reduce((acc, id) => {
  //   acc[id] = (acc[id] || 0) + 1;
  //   return acc;
  // }, {});

  // const newArray = array1
  //   .filter((item) => array2.includes(item._id.toString()))
  //   .map((item) => ({ ...item, count: count[item._id.toString()] }));

  // console.log(newArray);

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
    </SafeAreaView>
  );
};

export default OrderHistoryScreen;
