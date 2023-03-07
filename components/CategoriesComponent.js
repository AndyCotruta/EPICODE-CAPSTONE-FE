import { View, Text, ScrollView } from "react-native";
import React from "react";
import tw from "twrnc";
import CategoryCard from "./CategoryCard";

const CategoriesComponent = ({ categories }) => {
  const imgUrl = "https://links.papareact.com/wru";

  return (
    <ScrollView
      style={tw.style("px-4 pt-4")}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={category.image}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default CategoriesComponent;
