import React from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import FoodSummary from "../components/Dashboard/FoodSummary";

const DashboardScreen = () => {
  return (
    <SafeAreaView style={tw.style("flex-1 bg-white")}>
      <FoodSummary />
    </SafeAreaView>
  );
};

export default DashboardScreen;
