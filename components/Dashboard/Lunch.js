import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/reducers/userSlice";
import { format } from "date-fns";

const Lunch = () => {
  const userData = useSelector(selectUserData);
  const dailyFood = userData.dailyFood;
  console.log(dailyFood);
  const lunchFood = dailyFood.filter(
    (food) =>
      parseInt(format(new Date(food.createdAt), "HH")) >= 12 &&
      parseInt(format(new Date(food.createdAt), "HH")) <= 15
  );
  console.log(lunchFood);

  return (
    <View style={tw.style("h-50 bg-[#FBFBFB] rounded-3xl shadow-md my-2 p-5")}>
      <Text style={tw.style("font-bold text-lg")}>Lunch</Text>
      <Text style={tw.style("text-gray-400 text-xs")}>Dishes:</Text>
      {lunchFood?.map((food) => (
        <TouchableOpacity
          kex={food._id}
          style={tw.style("flex-row justify-between items-center py-2")}
        >
          <Text>{food.amount}x</Text>
          <View style={tw.style("flex-1 flex-row items-center")}>
            <Image
              style={tw.style("w-10 h-10 rounded-full mx-1")}
              source={{ uri: food.image }}
            />
            <View>
              <Text>{food.title}</Text>
              <Text>{food.type.toUpperCase()}</Text>
            </View>
          </View>
          <View>
            <Text>{format(new Date(food.createdAt), "HH:mm")}</Text>
            <Text>{food.calories} kcal</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Lunch;
