import { View, Text } from "react-native";
import React from "react";
import CustomRecipeCard from "./CustomRecipeCard";
import tw from "twrnc";
import RecipeGeneralCategories from "./RecipeGeneralCategories";

const RecipeBodyComponent = () => {
  return (
    <View style={tw.style("")}>
      <CustomRecipeCard />
      <RecipeGeneralCategories />
    </View>
  );
};

export default RecipeBodyComponent;
