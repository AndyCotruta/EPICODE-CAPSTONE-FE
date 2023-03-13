import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import CategoriesComponent from "./CategoriesComponent";
import FeaturedRowComponent from "./FeaturedRowComponent";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  lightBrown,
  lightOrange,
  mintGreen,
} from "../graphics/colours";
import { BE_URL } from "@env";
import { selectRecipeStatus } from "../redux/reducers/recipeSlice";
import { useSelector } from "react-redux";
import RecipeBodyComponent from "./Recipe/RecipeBodyComponent";

const BodyComponent = ({ featuredCategories }) => {
  const [categories, setCategories] = useState([]);
  const recipeActive = useSelector(selectRecipeStatus);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BE_URL}/categories`);
      if (response) {
        const data = await response.json();

        setCategories(data);
      } else {
        console.log("Error while fetching categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ScrollView style={tw.style(`bg-white`)}>
      {recipeActive ? (
        <RecipeBodyComponent />
      ) : (
        <View>
          <CategoriesComponent categories={categories} />
          {featuredCategories.map((category) => (
            <FeaturedRowComponent
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
              restaurants={category.restaurants}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default BodyComponent;
