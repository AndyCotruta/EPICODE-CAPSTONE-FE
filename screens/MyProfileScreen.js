import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  lightBrown,
  lightOrange,
  mintGreen,
} from "../graphics/colours";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { addAccessToken, selectUserData } from "../redux/reducers/userSlice";
import MyProfileHeader from "../components/MyProfileHeader";

const MyProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const userData = useSelector(selectUserData);

  return (
    <SafeAreaView style={tw.style(`flex-1 bg-[${lightBeige}] p-4`)}>
      <MyProfileHeader />
      <TouchableOpacity
        onPress={() => {
          dispatch(addAccessToken(null));
        }}
      >
        <Text
          style={tw.style("text-center bg-red-500 text-white p-5 rounded-lg")}
        >
          Log Out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyProfileScreen;
