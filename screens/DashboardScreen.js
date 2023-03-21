import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/reducers/userSlice";
import { BellIcon, ChevronDownIcon } from "react-native-heroicons/outline";
import { parse, format } from "date-fns";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardActivities from "../components/Dashboard/DashboardActivities";
import DashboardPlan from "../components/Dashboard/DashboardPlan";
import DashboardButtons from "../components/Dashboard/DashboardButtons";
import FoodSummary from "../components/Dashboard/FoodSummary";

const DashboardScreen = () => {
  const [active, setActive] = useState("Home");

  return (
    <SafeAreaView style={tw.style("flex-1 bg-white")}>
      <DashboardHeader />
      {active === "Food" ? (
        <FoodSummary />
      ) : (
        <ScrollView style={tw.style("bg-white")}>
          <DashboardActivities />
          <Text style={tw.style("text-lg font-bold pl-4 py-2")}>My Plan</Text>
          <DashboardPlan active={active} setActive={setActive} />
          <View
            style={tw.style("flex-row justify-between items-center px-4 py-2")}
          >
            <Text style={tw.style("text-lg font-bold ")}>Activities</Text>
            <View style={tw.style("flex-row items-center h-5")}>
              <Text style={tw.style("mr-1")}>Weekly</Text>
              <TouchableOpacity style={tw.style("flex h-full justify-end")}>
                <ChevronDownIcon size={15} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw.style("px-4 w-full")}>
            <Image
              style={tw.style("w-full h-40")}
              source={require("../assets/graph.jpeg")}
            />
          </View>
        </ScrollView>
      )}

      <DashboardButtons active={active} setActive={setActive} />
    </SafeAreaView>
  );
};

export default DashboardScreen;
