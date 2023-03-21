import { View, Text, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { BellIcon } from "react-native-heroicons/outline";
import { parse, format } from "date-fns";
import { selectUserData } from "../../redux/reducers/userSlice";

const DashboardHeader = () => {
  const userData = useSelector(selectUserData);

  const currentDate = new Date();
  const formattedDate = format(currentDate, "EEEE, d MMMM");

  return (
    <View style={tw.style("flex-row justify-between items-center p-4")}>
      <Image
        style={tw.style("w-15 h-15 rounded-full mr-4")}
        source={{ uri: userData.avatar }}
      />
      <View style={tw.style("flex-1")}>
        <Text style={tw.style("text-gray-400")}>
          Hello, {userData.firstName}!
        </Text>
        <Text style={tw.style("font-bold")}>{formattedDate}</Text>
      </View>

      <View
        style={tw.style(
          "w-15 h-15 rounded-full border border-gray-300 flex items-center justify-center"
        )}
      >
        <BellIcon size={22} color="black" />
      </View>
    </View>
  );
};

export default DashboardHeader;
