import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import {
  darkGreen,
  lightBrown,
  lightOrange,
  mintGreen,
} from "../graphics/colours";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchFeaturedCategories,
  fetchMyData,
  fetchRecipeByType,
} from "../redux/actions";
import { selectAccessToken } from "../redux/reducers/userSlice";

const LoginAnimation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const token = useSelector(selectAccessToken);
  const recipeTypes = ["Breakfast", "Lunch", "Dinner"];

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchFeaturedCategories());
    dispatch(fetchMyData(token));
    recipeTypes.map((recipeType) => dispatch(fetchRecipeByType(recipeType)));
    setTimeout(() => {
      navigation.navigate("Home");
    }, 4000);
  }, []);

  return (
    <LinearGradient
      style={tw.style("flex-1 bg-white items-center justify-center")}
      colors={[lightOrange, mintGreen]}
      start={{ x: 1.2, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Animatable.Text
        style={tw.style(`text-center text-7xl font-bold text-[${lightBrown}]`)}
        animation="zoomOut"
        iterationCount={1}
        delay={3000}
      >
        BAMBOO
      </Animatable.Text>
      <Animatable.Text
        style={tw.style(`text-center font-bold text-5xl text-[${darkGreen}]`)}
        animation="zoomOut"
        iterationCount={1}
        delay={3000}
      >
        BITES
      </Animatable.Text>
    </LinearGradient>
  );
};

export default LoginAnimation;
