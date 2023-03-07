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
    <SafeAreaView
      style={tw.style(`flex-1 bg-[${lightBeige}] items-center justify-center`)}
    >
      <View style={tw.style("")}>
        <View>
          <Image
            style={tw.style("w-50 h-50")}
            source={{ uri: userData.avatar }}
          />
        </View>

        <Text style={tw.style("text-center")}>
          Welcome, {userData.firstName}
        </Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(addAccessToken(null));
          }}
        >
          <View>
            <Text
              style={tw.style(
                "text-center bg-red-500 text-white p-5 rounded-lg"
              )}
            >
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyProfileScreen;
