import { View, Text, ScrollView } from "react-native";
import React from "react";
import tw from "twrnc";
import CategoryCard from "./CategoryCard";
import { useSelector } from "react-redux";
import { selectCategories } from "../redux/reducers/allRestaurantsSlice";

const CategoriesComponent = () => {
  const imgUrl = "https://links.papareact.com/wru";
  const categories = useSelector(selectCategories);

  return (
    <ScrollView
      style={tw.style("px-4 pt-4")}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories?.map((category) => (
        <CategoryCard key={category._id} category={category} />
      ))}
    </ScrollView>
  );
};

export default CategoriesComponent;
