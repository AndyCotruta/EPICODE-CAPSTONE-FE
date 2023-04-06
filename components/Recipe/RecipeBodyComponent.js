import { ScrollView } from "react-native";
import React from "react";
import CustomRecipeCard from "./CustomRecipeCard";
import tw from "twrnc";
import RecipeGeneralCategories from "./RecipeGeneralCategories";

const RecipeBodyComponent = () => {
  return (
    <ScrollView style={tw.style("bg-white")}>
      <CustomRecipeCard />
      <RecipeGeneralCategories />
    </ScrollView>
  );
};

export default RecipeBodyComponent;
