import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import tw from "twrnc";
import DashboardActivities from "./Dashboard/DashboardActivities";
import DashboardPlan from "./Dashboard/DashboardPlan";
import { ChevronDownIcon } from "react-native-heroicons/outline";

const HomeComponent = () => {
  return (
    <View style={tw.style("flex-1 p-4 bg-white")}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <DashboardActivities />
        <Text style={tw.style("text-lg font-bold py-2")}>My Plan</Text>
        <DashboardPlan />
        <View style={tw.style("flex-row justify-between items-center py-2")}>
          <Text style={tw.style("text-lg font-bold ")}>Activities</Text>
          <View style={tw.style("flex-row items-center h-5")}>
            <Text style={tw.style("mr-1")}>Weekly</Text>
            <TouchableOpacity style={tw.style("flex h-full justify-end")}>
              <ChevronDownIcon size={15} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw.style("w-full")}>
          <Image
            style={tw.style("w-full h-40")}
            source={require("../assets/graph.jpeg")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeComponent;
