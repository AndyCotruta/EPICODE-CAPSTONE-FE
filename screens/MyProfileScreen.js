import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
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
import MyProfileOptions from "../components/MyProfileOptions";

const MyProfileScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const userData = useSelector(selectUserData);

  return (
    <SafeAreaView style={tw.style(`flex-1 bg-white p-4`)}>
      <MyProfileHeader />
      <View>
        <Text style={tw.style("text-3xl font-bold pb-4")}>Options</Text>
      </View>
      <ScrollView style={tw.style(`flex-1 bg-white `)}>
        <MyProfileOptions />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfileScreen;
