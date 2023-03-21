import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import {
  BellIcon,
  ChevronDownIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import {
  HomeIcon,
  GlobeAmericasIcon,
  CircleStackIcon,
  ChartPieIcon,
} from "react-native-heroicons/solid";

const DashboardButtons = () => {
  const [active, setActive] = useState("Home");

  return (
    <View style={tw.style("px-4 py-2 flex-row justify-between items-center")}>
      <View
        style={tw.style(
          "flex-row items-center justify-evenly bg-[#F1F4F9] h-15 w-3/9 rounded-l-full rounded-r-full"
        )}
      >
        <TouchableOpacity
          onPress={() => {
            setActive("Home");
          }}
        >
          <HomeIcon
            size={25}
            color={active === "Home" ? "#1FA0AA" : "#D4D8E2"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActive("Food");
          }}
        >
          <GlobeAmericasIcon
            size={25}
            color={active === "Food" ? "#1FA0AA" : "#D4D8E2"}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={tw.style(
          "w-20 h-20 flex items-center justify-center bg-red-500  rounded-full"
        )}
      >
        <PlusIcon size={20} color="white" />
      </TouchableOpacity>
      <View
        style={tw.style(
          "flex-row items-center justify-evenly bg-[#F1F4F9] h-15 w-3/9 rounded-l-full rounded-r-full"
        )}
      >
        <TouchableOpacity
          onPress={() => {
            setActive("Fitness");
          }}
        >
          <CircleStackIcon
            size={25}
            color={active === "Fitness" ? "#1FA0AA" : "#D4D8E2"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActive("Chart");
          }}
        >
          <ChartPieIcon
            size={25}
            color={active === "Chart" ? "#1FA0AA" : "#D4D8E2"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardButtons;
