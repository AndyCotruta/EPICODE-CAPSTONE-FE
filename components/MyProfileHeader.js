import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAccessToken, selectUserData } from "../redux/reducers/userSlice";
import tw from "twrnc";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  lightBrown,
  lightOrange,
  mintGreen,
} from "../graphics/colours";
import { Cog6ToothIcon } from "react-native-heroicons/outline";

const MyProfileHeader = () => {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  return (
    <View style={tw.style("pb-4")}>
      <View style={tw.style("flex flex-row items-center justify-between mb-4")}>
        <Text style={tw.style("text-3xl font-bold")}>Account</Text>
        <TouchableOpacity>
          <Cog6ToothIcon size={30} color={darkGreen} />
        </TouchableOpacity>
      </View>
      <View style={tw.style("flex flex-row items-center")}>
        <Image
          style={tw.style("w-30 h-30 mr-4 rounded-full")}
          source={{ uri: userData.avatar }}
        />
        <View>
          <Text style={tw.style(`text-4xl font-bold text-[${darkGreen}]`)}>
            Welcome,
          </Text>
          <Text style={tw.style("text-lg font-bold")}>
            {userData.firstName} {userData.lastName}
          </Text>
          <Text>Gourmand - Food Lover</Text>
        </View>
      </View>
    </View>
  );
};

export default MyProfileHeader;
