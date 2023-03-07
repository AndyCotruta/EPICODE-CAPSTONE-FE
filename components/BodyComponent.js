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

const BodyComponent = ({ featuredCategories }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://deliveroo-mongodb-backend-production.up.railway.app/categories"
      );
      if (response) {
        const data = await response.json();
        console.log(data);
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
    <ScrollView style={tw.style(`bg-[${lightBeige}]`)}>
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
    </ScrollView>
  );
};

export default BodyComponent;
