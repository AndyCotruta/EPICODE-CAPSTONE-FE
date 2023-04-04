import { View, Text, TouchableOpacity, Image } from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DashboardButtons = ({ activeComponent, setActiveComponent }) => {
  const navigation = useNavigation();

  return (
    <View style={tw.style("px-4 py-2 flex-row justify-between items-center")}>
      <View
        style={tw.style(
          "flex-row items-center justify-evenly bg-white h-15 w-3/9 rounded-l-full rounded-r-full"
        )}
      >
        <TouchableOpacity
          onPress={() => {
            setActiveComponent("Order");
          }}
        >
          {/* color={activeComponent === "Order" ? "#1FA0AA" : "#D4D8E2"} */}

          <Ionicons
            name="fast-food"
            size={24}
            color={activeComponent === "Order" ? "#336b46" : "#D4D8E2"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveComponent("Recipe");
          }}
        >
          <MaterialCommunityIcons
            name="food-turkey"
            size={24}
            color={activeComponent === "Recipe" ? "#336b46" : "#D4D8E2"}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={tw.style(
          "w-17 h-17 flex items-center justify-center bg-[#FBA536]  rounded-full"
        )}
        onPress={() => {
          setActiveComponent("Home");
        }}
      >
        <HomeIcon size={25} color="white" />
      </TouchableOpacity>
      <View
        style={tw.style(
          "flex-row items-center justify-evenly bg-white h-15 w-3/9 rounded-l-full rounded-r-full"
        )}
      >
        <TouchableOpacity
          onPress={() => {
            setActiveComponent("Dashboard");
          }}
        >
          <ChartPieIcon
            size={25}
            color={activeComponent === "Dashboard" ? "#336b46" : "#D4D8E2"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveComponent("Fitness");
          }}
        >
          <CircleStackIcon
            size={25}
            color={activeComponent === "Fitness" ? "#336b46" : "#D4D8E2"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardButtons;
