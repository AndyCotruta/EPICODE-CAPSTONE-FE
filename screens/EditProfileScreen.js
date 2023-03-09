import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { darkGreen, lightBeige } from "../graphics/colours";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/reducers/userSlice";
import { PencilSquareIcon } from "react-native-heroicons/outline";
import PersonalInfo from "../components/PersonalInfo";

const EditProfileScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView style={tw.style(`flex-1 bg-white px-4`)}>
      <PersonalInfo />
    </SafeAreaView>
  );
};

export default EditProfileScreen;
