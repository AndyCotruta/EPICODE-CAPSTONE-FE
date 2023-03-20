import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectUserData } from "../redux/reducers/userSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { darkGreen, lightBeige } from "../graphics/colours";
import { InformationCircleIcon } from "react-native-heroicons/outline";
import { fetchMyData, moveToHistory } from "../redux/actions";
import { useNavigation } from "@react-navigation/native";

const ActiveOrder = ({ shared }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const token = useSelector(selectAccessToken);
  const [info, setInfo] = useState(false);
  const activeOrderRestaurant = userData.activeOrder.restaurantId;

  const sharedOrder = userData.sharedOrder.order;
  const sharedOrderRestaurant = userData.sharedOrder.order.restaurantId;

  const array1 = userData.activeOrder.restaurantId.dishes;
  const array2 = userData.activeOrder.dishes;

  const count = array2.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  const newArray = array1
    .filter((item) => array2.includes(item._id.toString()))
    .map((item) => ({ ...item, count: count[item._id.toString()] }));

  const array3 = sharedOrderRestaurant.dishes;
  const array4 = sharedOrder.dishes;

  const count2 = array4.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  const newArray2 = array3
    .filter((item) => array4.includes(item._id.toString()))
    .map((item) => ({ ...item, count: count2[item._id.toString()] }));

  const handleMove = () => {
    const activeOrderId = userData.activeOrder?._id;
    const order = {
      orderId: activeOrderId,
    };
    dispatch(moveToHistory(token, order));

    navigation.navigate("Order");
  };

  return (
    <View style={tw.style("px-4")}>
      <Text style={tw.style("text-3xl font-bold mb-3")}>
        {shared ? "Active Shared Order" : "Active Order"}
      </Text>
      <TouchableOpacity
        onPress={
          shared
            ? () => {
                navigation.navigate("Delivery", {
                  shared: true,
                  sharedRestaurant: sharedOrderRestaurant,
                });
              }
            : () => {
                navigation.navigate("Delivery");
              }
        }
        style={tw.style(` bg-[${lightBeige}] p-4 rounded-xl shadow-md`)}
      >
        {info && (
          <TouchableOpacity
            style={tw.style(
              "absolute right-4 top-15 bg-white p-4 rounded-xl shadow-xl z-50"
            )}
            onPress={() => {
              handleMove();
            }}
          >
            <Text>Mark as delivered</Text>
          </TouchableOpacity>
        )}

        <View style={tw.style("flex-row items-center")}>
          <Image
            style={tw.style("w-20 h-20 rounded-xl mr-4 mb-1")}
            source={
              shared
                ? { uri: sharedOrderRestaurant.image }
                : { uri: activeOrderRestaurant.image }
            }
          />
          <View style={tw.style("flex-1 flex-row justify-between")}>
            <Text style={tw.style(`text-[${darkGreen}] text-lg font-bold`)}>
              {shared ? sharedOrderRestaurant.name : activeOrderRestaurant.name}
            </Text>
          </View>
          {shared ? (
            <View style={tw.style("self-start")}>
              {userData._id === userData.sharedOrder.initiatedBy._id && (
                <TouchableOpacity
                  onPress={() => {
                    setInfo(!info);
                  }}
                >
                  <InformationCircleIcon size={25} color={darkGreen} />
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={tw.style("self-start")}>
              {shared !== "true" && (
                <TouchableOpacity
                  onPress={() => {
                    setInfo(!info);
                  }}
                >
                  <InformationCircleIcon size={25} color={darkGreen} />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
        {shared === "true" && (
          <View>
            <Text style={tw.style("font-bold mb-1")}>Shared amongst:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={tw.style("mr-1")}>
                <Image
                  style={tw.style("w-10 h-10 rounded-full")}
                  source={{ uri: userData.sharedOrder.initiatedBy.avatar }}
                />
                <Text style={tw.style("text-xs text-center text-gray-400")}>
                  {userData.sharedOrder.initiatedBy.firstName}
                </Text>
              </View>

              {userData.sharedOrder.users.map((user) => (
                <View key={user._id} style={tw.style("mr-1")}>
                  <Image
                    style={tw.style("w-10 h-10 rounded-full")}
                    source={{ uri: user.avatar }}
                  />
                  <Text style={tw.style("text-xs text-center text-gray-400")}>
                    {user.firstName}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View>
          {shared === "true"
            ? newArray2.map((activeOrderDish) => (
                <View
                  style={tw.style("flex-row items-center mt-4")}
                  key={activeOrderDish._id}
                >
                  <Text style={tw.style(`text-[${darkGreen}] font-bold`)}>
                    {activeOrderDish.count}x
                  </Text>
                  <Image
                    style={tw.style("w-10 h-10 mx-4 rounded-full")}
                    source={{ uri: activeOrderDish.image }}
                  />

                  <Text style={tw.style("flex-1 mr-4")}>
                    {activeOrderDish.name}
                  </Text>
                  <Text style={tw.style(`text-[${darkGreen}] font-bold`)}>
                    ${activeOrderDish.count * activeOrderDish.price}
                  </Text>
                </View>
              ))
            : newArray.map((activeOrderDish) => (
                <View
                  style={tw.style("flex-row items-center mt-4")}
                  key={activeOrderDish._id}
                >
                  <Text style={tw.style(`text-[${darkGreen}] font-bold`)}>
                    {activeOrderDish.count}x
                  </Text>
                  <Image
                    style={tw.style("w-10 h-10 mx-4 rounded-full")}
                    source={{ uri: activeOrderDish.image }}
                  />

                  <Text style={tw.style("flex-1 mr-4")}>
                    {activeOrderDish.name}
                  </Text>
                  <Text style={tw.style(`text-[${darkGreen}] font-bold`)}>
                    ${activeOrderDish.count * activeOrderDish.price}
                  </Text>
                </View>
              ))}
        </View>

        <View style={tw.style("pt-3")}>
          <View style={tw.style("flex-row justify-between pb-3")}>
            <Text style={tw.style("text-gray-400")}>Delivery Fee</Text>
            <Text style={tw.style("text-gray-400")}>$5.99</Text>
          </View>
          <View style={tw.style("flex-row justify-between")}>
            <Text style={tw.style(`font-bold text-[${darkGreen}]`)}>
              Total Price
            </Text>
            <Text style={tw.style(`font-bold text-[${darkGreen}]`)}>
              $
              {shared
                ? ((sharedOrder.totalPrice * 100) / 100).toFixed(2)
                : ((userData.activeOrder.totalPrice * 100) / 100).toFixed(2)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ActiveOrder;
