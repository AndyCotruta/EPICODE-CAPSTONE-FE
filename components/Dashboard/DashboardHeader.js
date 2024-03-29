import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { BellIcon, UserIcon } from "react-native-heroicons/outline";
import { format } from "date-fns";
import { selectUserData } from "../../redux/reducers/userSlice";
import { useNavigation } from "@react-navigation/native";
import { darkGreen } from "../../graphics/colours";

const DashboardHeader = () => {
  const userData = useSelector(selectUserData);

  const navigation = useNavigation();
  const currentDate = new Date();
  const formattedDate = format(currentDate, "EEEE, d MMMM");

  return (
    <View style={tw.style("flex-row justify-between items-center p-4")}>
      <View
        style={tw.style(
          "w-15 h-15 rounded-full border border-gray-300 flex items-center justify-center"
        )}
      >
        <BellIcon size={22} color="black" />
      </View>
      <View style={tw.style("flex-1")}>
        <Text style={tw.style("text-gray-400 text-center")}>
          Hello, {userData?.firstName}!
        </Text>
        <Text style={tw.style("font-bold text-center")}>{formattedDate}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("MyProfile");
        }}
      >
        {userData ? (
          <Image
            style={tw.style("w-15 h-15 rounded-full")}
            source={{ uri: userData?.avatar }}
          />
        ) : (
          <UserIcon style={tw.style()} size={20} color={darkGreen} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DashboardHeader;
