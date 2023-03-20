import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { darkGreen, darkOrange, lightBeige } from "../graphics/colours";
import * as Progress from "react-native-progress";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInitiatedBy,
  selectSharedOrderUsers,
} from "../redux/reducers/sharedOrderSlice";
import { io } from "socket.io-client";
import { BE_URL } from "@env";
import { selectUserData } from "../redux/reducers/userSlice";
import { useNavigation } from "@react-navigation/native";
import {
  selectRestaurant,
  setRestaurant,
} from "../redux/reducers/restaurantSlice";

const socket = io(`${BE_URL}`, { transports: ["websocket"] });

const WaitingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const restaurant = useSelector(selectRestaurant);
  const userData = useSelector(selectUserData);
  const initiatedBy = useSelector(selectInitiatedBy);
  const connectedUsers = useSelector(selectSharedOrderUsers);

  const [complexObj, setComplexObj] = useState({
    _id: userData._id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    avatar: userData.avatar,
  });

  useEffect(() => {
    if (restaurant?.shared === true) {
      navigation.navigate("Basket", {
        shared: true,
      });
    }
  }, [restaurant]);

  return (
    <SafeAreaView
      style={tw.style(`flex-1 bg-[#f5f1ee] justify-center items-center p-4`)}
    >
      <View style={tw.style("flex items-center w-full")}>
        <Image
          style={tw.style("w-70 h-80")}
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
      <View style={tw.style("flex-row w-full justify-between mb-4")}>
        <View style={tw.style("mr-4 flex items-center  border-r-4")}>
          <View>
            <Text style={tw.style("text-center text-xl font-bold")}>Host</Text>
          </View>

          <View style={tw.style("w-20 h-20 mx-4 ")}>
            <Image
              style={tw.style("w-20 h-20 rounded-full mr-4")}
              source={{ uri: initiatedBy.avatar }}
            />
          </View>

          <Text style={tw.style("font-bold")}>{initiatedBy.firstName}</Text>
        </View>
        <View style={tw.style("flex-1")}>
          <Text style={tw.style("text-start text-xl font-bold")}>
            Connected users
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {connectedUsers?.map((user) => (
              <View
                key={user._id}
                style={tw.style("flex items-center w-20 h-20 ")}
              >
                <Image
                  style={tw.style("w-20 h-20 rounded-full")}
                  source={{ uri: user.avatar }}
                />
                <Text style={tw.style("font-bold")}>{user.firstName}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity
        style={tw.style(`bg-[#f56f40] p-4 rounded-3xl shadow-md w-40 mt-5`)}
        onPress={() => {
          socket.emit("disconnectMe", {
            message: complexObj,
          });
          navigation.navigate("SharedOrder");
        }}
      >
        <Text style={tw.style("text-white text-center font-bold")}>Cancel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WaitingScreen;
