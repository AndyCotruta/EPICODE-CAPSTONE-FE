import { Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { darkGreen } from "../graphics/colours";

const CategoryCard = (props) => {
  return (
    <TouchableOpacity style={tw.style("mr-2")} className="mr-2">
      <Image
        source={{
          uri: props.imgUrl,
        }}
        style={tw.style("h-20 w-20 rounded-xl")}
        className="h-20 w-20 rounded"
      />
      <Text
        style={tw.style(`text-[${darkGreen}] text-center font-bold`)}
        className="absolute bottom-1 left-1 text-white font-bold"
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
