import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import tw from "twrnc";
import { parse, format, parseISO } from "date-fns";
import FoodSummaryDays from "./FoodSummaryDays";
import CaloriesChart from "./CaloriesChart";
import WaterIntake from "./WaterIntake";
import Breakfast from "./Breakfast";
import Lunch from "./Lunch";
import Dinner from "./Dinner";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/reducers/userSlice";

const FoodSummary = () => {
  const userData = useSelector(selectUserData);
  const dailyFood = userData.dailyFood;
  const today = new Date();
  const [activeDay, setActiveDay] = useState(today);

  const filteredByDay = dailyFood.filter(
    (food) =>
      format(parseISO(food.createdAt), "d") === activeDay.getDate().toString()
  );

  return (
    <ScrollView style={tw.style("")}>
      <Text style={tw.style("text-center text-xl font-bold p-4")}>
        Food Summary
      </Text>
      <FoodSummaryDays activeDay={activeDay} setActiveDay={setActiveDay} />
      <View style={tw.style("px-4")}>
        <CaloriesChart filteredByDay={filteredByDay} />
      </View>
      <View style={tw.style("px-4")}>
        <WaterIntake />
      </View>
      {filteredByDay.length === 0 ? (
        <View
          style={tw.style(
            "h-20 bg-[#FBFBFB] shadow-md rounded-3xl my-2 mx-4 p-5 flex justify-center"
          )}
        >
          <Text>There is no data for today</Text>
        </View>
      ) : (
        <View>
          <View style={tw.style("px-4")}>
            <Breakfast filteredByDay={filteredByDay} />
          </View>
          <View style={tw.style("px-4")}>
            <Lunch filteredByDay={filteredByDay} />
          </View>
          <View style={tw.style("px-4")}>
            <Dinner filteredByDay={filteredByDay} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default FoodSummary;
