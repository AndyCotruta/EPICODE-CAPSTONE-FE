import { View, ScrollView } from "react-native";
import React from "react";
import tw from "twrnc";
import CategoriesComponent from "./CategoriesComponent";
import FeaturedRowComponent from "./FeaturedRowComponent";
import { useSelector } from "react-redux";
import { selectCategories } from "../redux/reducers/allRestaurantsSlice";

const BodyComponent = ({ featuredCategories }) => {
  return (
    <ScrollView style={tw.style(`bg-white`)}>
      <View>
        <CategoriesComponent />
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
    </ScrollView>
  );
};

export default BodyComponent;
