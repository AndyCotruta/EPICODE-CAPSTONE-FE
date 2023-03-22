import { Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { darkGreen } from "../graphics/colours";
import { useNavigation } from "@react-navigation/native";

const CategoryCard = ({ category }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={tw.style("mr-2")}
      className="mr-2"
      onPress={() => {
        navigation.navigate("Category", { category: category });
      }}
    >
      <Image
        source={{
          uri: category.image,
        }}
        style={tw.style("h-20 w-20 rounded-xl")}
        className="h-20 w-20 rounded"
      />
      <Text
        style={tw.style(`text-[${darkGreen}] text-center font-bold`)}
        className="absolute bottom-1 left-1 text-white font-bold"
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
