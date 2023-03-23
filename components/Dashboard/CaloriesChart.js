import { View, Text } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import ProgressCircle from "react-native-progress/Circle";
import * as Progress from "react-native-progress";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/reducers/userSlice";

const CaloriesChart = () => {
  const userData = useSelector(selectUserData);
  const dailyFood = userData.dailyFood;
  let dailyCalories = 0;
  dailyFood.forEach((food) => (dailyCalories += parseInt(food.calories)));
  const [caloriesGoal, setCaloriesGoal] = useState(2300);
  const [consumedCalories, setConsumedCaloriesGoal] = useState(dailyCalories);
  const [remainingCalories, setRemainingCaloriesGoal] = useState(
    caloriesGoal - consumedCalories
  );

  const remainingPercentage = Math.round(
    (remainingCalories / caloriesGoal) * 100
  );

  return (
    <View style={tw.style("h-50 bg-[#EBF9FC] mt-6 rounded-3xl p-5 ")}>
      <View style={tw.style("flex-row justify-around items-center")}>
        <View style={tw.style("flex items-center")}>
          <Text style={tw.style("font-bold text-lg")}>
            {consumedCalories} kcal
          </Text>
          <Text style={tw.style("text-gray-400 text-xs")}>Consumed</Text>
        </View>
        <View style={tw.style("flex items-center")}>
          <ProgressCircle
            progress={(caloriesGoal - remainingCalories) / caloriesGoal}
            size={80}
            thickness={10}
            showsText={true}
            formatText={() => `${remainingPercentage}%`}
            color="#F94F46"
          />
          <Text style={tw.style("font-bold text-xl")}>{caloriesGoal} kcal</Text>
          <Text style={tw.style("text-gray-400 text-xs")}>Goal</Text>
        </View>
        <View style={tw.style("flex items-center")}>
          <Text style={tw.style("font-bold text-lg")}>
            {remainingCalories} kcal
          </Text>
          <Text style={tw.style("text-gray-400 text-xs")}>Remaining</Text>
        </View>
      </View>

      <View style={tw.style("flex-row justify-between mt-2")}>
        <View style={tw.style("flex items-center")}>
          <Text style={tw.style("text-xs ")}>P-10/12g</Text>
          <Progress.Bar progress={0.8} width={80} color="black" />
        </View>
        <View style={tw.style("flex items-center")}>
          <Text style={tw.style("text-xs ")}>C-10/12g</Text>
          <Progress.Bar progress={0.2} width={80} color="#1FA0AA" />
        </View>
        <View style={tw.style("flex items-center")}>
          <Text style={tw.style("text-xs ")}>F-10/12g</Text>
          <Progress.Bar progress={0.6} width={80} color="#F94F46" />
        </View>
      </View>
    </View>
  );
};

export default CaloriesChart;
