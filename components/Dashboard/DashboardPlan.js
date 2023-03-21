import { View, Text, ScrollView } from "react-native";
import React from "react";
import tw from "twrnc";
import MyPlanCard from "./MyPlanCard";
import {
  CircleStackIcon,
  UserIcon,
  GlobeEuropeAfricaIcon,
} from "react-native-heroicons/outline";

const DashboardPlan = ({ active, setActive }) => {
  const plans = [
    {
      icon: <CircleStackIcon size={30} color="black" />,
      title: "Workout",
      label: "2 Hours",
      color: "#FEF6E8",
    },
    {
      icon: <UserIcon size={30} color="black" />,
      title: "Running",
      label: "12 km",
      color: "#FFEEEC",
    },
    {
      icon: <GlobeEuropeAfricaIcon size={30} color="black" />,
      title: "Food",
      label: "1832 kcal",
      color: "#DEFDFE",
    },
  ];

  return (
    <View style={tw.style("pl-4")}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw.style("")}
      >
        {plans.map((plan) => (
          <MyPlanCard
            key={plan.label}
            plan={plan}
            active={active}
            setActive={setActive}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default DashboardPlan;
