import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import tw from "twrnc";
import { parse, format } from "date-fns";
import FoodSummaryDays from "./FoodSummaryDays";
import CaloriesChart from "./CaloriesChart";
import WaterIntake from "./WaterIntake";
import Breakfast from "./Breakfast";
import Lunch from "./Lunch";
import Dinner from "./Dinner";

const FoodSummary = () => {
  return (
    <ScrollView style={tw.style("")}>
      <Text style={tw.style("text-center text-xl font-bold p-4")}>
        Food Summary
      </Text>
      <FoodSummaryDays />
      <View style={tw.style("px-4")}>
        <CaloriesChart />
      </View>
      <View style={tw.style("px-4")}>
        <WaterIntake />
      </View>
      <View style={tw.style("px-4")}>
        <Breakfast />
      </View>
      <View style={tw.style("px-4")}>
        <Lunch />
      </View>
      <View style={tw.style("px-4")}>
        <Dinner />
      </View>
    </ScrollView>
  );
};

export default FoodSummary;
