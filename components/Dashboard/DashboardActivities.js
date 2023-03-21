import { View, Text, ScrollView } from "react-native";
import React from "react";
import tw from "twrnc";
import ActivityCard from "./ActivityCard";

const DashboardActivities = () => {
  const activities = [
    {
      image: require("../../assets/yoga.png"),
      title: "Training Yoga Class 101",
      label: "Fitness",
    },
    {
      image: require("../../assets/woman-on-bike.png"),
      title: "Cycling Training Day",
      label: "Cycling",
    },
    {
      image: require("../../assets/running.png"),
      title: "Running Marathon",
      label: "Running",
    },
  ];

  return (
    <View style={tw.style("pl-4")}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw.style("")}
      >
        {activities.map((activity) => (
          <ActivityCard key={activity.label} activity={activity} />
        ))}
      </ScrollView>
    </View>
  );
};

export default DashboardActivities;
