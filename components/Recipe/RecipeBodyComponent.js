import { View, Text } from "react-native";
import React from "react";
import CustomRecipeCard from "./CustomRecipeCard";
import tw from "twrnc";

const RecipeBodyComponent = () => {
  return (
    <View style={tw.style("")}>
      <CustomRecipeCard />
    </View>
  );
};

export default RecipeBodyComponent;
