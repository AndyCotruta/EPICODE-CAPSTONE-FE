import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import {
  brightOrange,
  darkOrange,
  lightBeige,
  lightOrange,
} from "../../graphics/colours";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const CustomRecipeCard = () => {
  const navigation = useNavigation();

  return (
    <View style={tw.style("h-45")}>
      <View
        style={tw.style(
          `bg-[${brightOrange}] w-5/6 h-40 rounded-r-full mt-4 p-4 flex justify-center`
        )}
      >
        <Text style={tw.style("w-50 text-xl ")}>
          Find recipes based on what you already have at
          <Text style={tw.style("font-bold")}> home</Text>
        </Text>
        <TouchableOpacity
          style={tw.style("flex-row items-center mt-2")}
          onPress={() => {
            navigation.navigate("CustomRecipe");
          }}
        >
          <Text style={tw.style(`text-[${darkOrange}] text-base font-bold`)}>
            Let's try
          </Text>
          <View
            style={tw.style(
              `bg-[${darkOrange}] font-bold rounded-full p-1 ml-2`
            )}
          >
            <ArrowRightIcon
              style={tw.style("font-bold")}
              size={15}
              color="white"
            />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={tw.style(
          `absolute right-4 top-7 bg-[${lightBeige}] border-8 border-white rounded-full p-5 shadow-md`
        )}
      >
        <Image
          style={tw.style("w-20 h-20")}
          source={require("../../assets/ingredients.png")}
        />
      </View>
    </View>
  );
};

export default CustomRecipeCard;
