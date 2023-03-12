import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/reducers/userSlice";
import { lightBeige } from "../graphics/colours";
import { format } from "date-fns";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderHistory = () => {
  const userData = useSelector(selectUserData);

  return (
    <View style={tw.style("")}>
      {userData.orderHistory
        .slice()
        .reverse()
        .map((order, i) => (
          <View style={tw.style(` `)} key={i}>
            <View
              style={tw.style(
                "flex-row justify-between items-center border-b border-gray-200 py-4"
              )}
            >
              <Image
                style={tw.style("w-10 h-10 rounded-xl mr-4")}
                source={{ uri: order.restaurantId?.image }}
              />
              <Text style={tw.style("flex-1 ")}>
                {order.restaurantId?.name}
              </Text>
              <View>
                <Text>{format(new Date(order?.createdAt), "hh mm a")}</Text>
                <Text>{format(new Date(order?.createdAt), "do MMM")}</Text>
              </View>
            </View>
          </View>
        ))}
    </View>
  );
};

export default OrderHistory;
