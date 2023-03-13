import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import ThreeMainCategories from "./ThreeMainCategories";
import RecipeCard from "./RecipeCard";
import { fetchRecipeByType } from "../../redux/actions";
import {
  selectBreakfast,
  selectLunch,
  selectDinner,
} from "../../redux/reducers/recipeSlice";

const RecipeGeneralCategories = () => {
  const dispatch = useDispatch();

  const [active, setActive] = useState("Breakfast");
  const breakfastRecipes = useSelector(selectBreakfast);
  const lunchRecipes = useSelector(selectLunch);
  const dinnerRecipes = useSelector(selectDinner);

  useEffect(() => {
    dispatch(fetchRecipeByType(active));
  }, [active]);

  return (
    <View style={tw.style("p-4")}>
      <View style={tw.style("flex-row justify-between items-center")}>
        <Text style={tw.style("text-2xl font-bold")}>Category</Text>
        <TouchableOpacity>
          <Text style={tw.style("font-bold text-gray-400")}>See all</Text>
        </TouchableOpacity>
      </View>
      <ThreeMainCategories active={active} setActive={setActive} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {active === "Breakfast" &&
          breakfastRecipes?.map((recipe) => (
            <RecipeCard key={recipe.id} active={active} recipe={recipe} />
          ))}
        {active === "Lunch" &&
          lunchRecipes?.map((recipe) => (
            <RecipeCard key={recipe.id} active={active} recipe={recipe} />
          ))}
        {active === "Dinner" &&
          dinnerRecipes?.map((recipe) => (
            <RecipeCard key={recipe.id} active={active} recipe={recipe} />
          ))}
      </ScrollView>
    </View>
  );
};

export default RecipeGeneralCategories;
