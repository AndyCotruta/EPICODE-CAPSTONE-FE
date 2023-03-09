import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { UserIcon, ChevronDownIcon } from "react-native-heroicons/outline";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  lightBrown,
  lightOrange,
  mintGreen,
} from "../graphics/colours";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/reducers/userSlice";

const HeaderComponent = () => {
  const navigation = useNavigation();
  const userData = useSelector(selectUserData);

  return (
    <View
      style={tw.style(`flex-row p-4 items-center bg-[${lightBeige}]`)}
      className="flex-row pb-3 items-center mx-4"
    >
      <Image
        style={tw.style(`h-11 w-11 bg-[${lightBeige}] p-4 rounded-full`)}
        // className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        source={{
          uri: "https://links.papareact.com/wru",
        }}
      />
      <View style={tw.style("flex-1 mx-2")} className="flex-1">
        <Text style={tw.style(`font-bold text-[${darkOrange}] text-xs`)}>
          Deliver Now!
        </Text>
        <View style={tw.style("flex-row items-center")}>
          <Text
            style={tw.style(`font-bold text-[${darkGreen}] text-xl`)}
            className="font-bold text-xl"
          >
            Current Location
          </Text>

          <TouchableOpacity>
            <ChevronDownIcon size={20} color={darkGreen} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={tw.style(
          `h-11 w-11 bg-[${lightBeige}] items-center justify-center rounded-full`
        )}
        onPress={() => {
          navigation.navigate("MyProfile");
        }}
      >
        {userData ? (
          <Image
            style={tw.style("h-11 w-11 rounded-full")}
            source={{ uri: userData.avatar }}
          />
        ) : (
          <UserIcon style={tw.style()} size={20} color={darkGreen} />
        )}

        {/* <Image
          style={tw.style("h-11 w-11 rounded-full")}
          source={{ uri: userData.avatar }}
        /> */}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;
