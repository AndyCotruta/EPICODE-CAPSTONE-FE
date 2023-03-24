import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";
import {
  selectActiveRecipe,
  selectRecipeNutrition,
} from "../../redux/reducers/recipeSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  lightOrange,
  mintGreen,
} from "../../graphics/colours/index";
import {
  FaceSmileIcon,
  MinusSmallIcon,
  PlusSmallIcon,
} from "react-native-heroicons/outline";
import { selectAccessToken } from "../../redux/reducers/userSlice";
import { useNavigation } from "@react-navigation/native";
import { addDailyFood } from "../../redux/actions";

const RecipeCooked = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const accessToken = useSelector(selectAccessToken);
  const recipeNutrititon = useSelector(selectRecipeNutrition);
  const recipeData = useSelector(selectActiveRecipe);
  const [servings, setServings] = useState(1);

  const meal = {
    type: "recipe",
    amount: servings,
    title: recipeData.title,
    image: recipeData.image,
    calories: recipeNutrititon.calories,
  };

  return (
    <SafeAreaView
      style={tw.style(
        `flex-1 items-center justify-between bg-[${darkGreen}] p-4`
      )}
    >
      <Animatable.Image
        style={tw.style("w-90 h-80")}
        source={require("../../assets/recipeCooked.png")}
        animation="slideInUp"
        iterationCount={1}
      />
      <Animatable.Text
        style={tw.style("text-white text-center font-bold text-3xl pb-8")}
        animation="slideInUp"
        iterationCount={1}
        delay={100}
      >
        Recipe Cooked !!!
      </Animatable.Text>
      <Animatable.Text
        style={tw.style("text-white text-center font-bold text-xl pb-8")}
        animation="slideInUp"
        iterationCount={1}
        delay={100}
      >
        How many servings did you eat?
      </Animatable.Text>
      <Animatable.View
        style={tw.style("flex-row items-center pb-8")}
        animation="fadeIn"
        iterationCount={1}
        delay={300}
      >
        <Text
          style={tw.style(
            `text-[${mintGreen}] px-2 text-center font-bold text-xs`
          )}
        >
          Psssst: It's ok if you ate more than 1
        </Text>
        <FaceSmileIcon size={30} color={mintGreen} />
      </Animatable.View>
      <Animatable.View
        style={tw.style("flex-row items-center pb-8")}
        animation="fadeIn"
        iterationCount={1}
        delay={500}
      >
        <TouchableOpacity
          style={tw.style(
            `flex justify-center items-center w-7 h-7 p-1 rounded-3xl bg-[${mintGreen}]`
          )}
          onPress={() => {
            if (servings !== 0.5) {
              setServings(servings - 0.5);
            } else {
              return;
            }
          }}
        >
          <MinusSmallIcon size={20} color="white" />
        </TouchableOpacity>

        <Text style={tw.style(" w-9 text-center text-white font-bold")}>
          {servings}
        </Text>
        <TouchableOpacity
          style={tw.style(
            `flex justify-center items-center w-7 h-7 p-1 rounded-3xl bg-[${mintGreen}]`
          )}
          onPress={() => {
            setServings(servings + 0.5);
          }}
        >
          <PlusSmallIcon size={20} color="white" />
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View
        style={tw.style("flex-row items-center pb-8")}
        animation="zoomIn"
        iterationCount={1}
        delay={500}
      >
        <TouchableOpacity
          style={tw.style(`bg-[${darkOrange}] p-5 rounded-3xl`)}
          onPress={() => {
            dispatch(addDailyFood(accessToken, meal));
            navigation.navigate("Home");
          }}
        >
          {servings === 1 && (
            <Text style={tw.style("text-white font-bold text-xl")}>
              Delicious!
            </Text>
          )}
          {servings === 0.5 && (
            <Text style={tw.style("text-white font-bold text-xl")}>Decent</Text>
          )}
          {servings > 1 && (
            <Text style={tw.style("text-white font-bold text-xl")}>
              Guilty Pleasure
            </Text>
          )}
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default RecipeCooked;
