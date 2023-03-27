import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  mintGreen,
} from "../../graphics/colours";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipeByIngredients } from "../../redux/actions";
import { selectRecipesByIngredients } from "../../redux/reducers/recipeSlice";
import { useNavigation } from "@react-navigation/native";

const CustomRecipeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [searchValue, setSearchValue] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const recipesByIngredients = useSelector(selectRecipesByIngredients);

  return (
    <SafeAreaView style={tw.style("flex-1 bg-white  p-4")}>
      <View style={tw.style("items-center")}>
        <Text style={tw.style("font-bold text-2xl text-center")}>Create</Text>
        <Text style={tw.style("font-bold text-xl text-center text-gray-400")}>
          your
        </Text>
        <Text style={tw.style("font-bold text-3xl text-center")}>
          Custom Recipe
        </Text>
        <Image
          style={tw.style("w-70 h-60")}
          source={require("../../assets/cooking.png")}
        />
      </View>
      <View style={tw.style(" flex-row rounded-xl bg-white my-4 items-center")}>
        {/* <MagnifyingGlassIcon
          style={tw.style("mr-2")}
          size={20}
          color={darkGreen}
        /> */}
        <TextInput
          style={tw.style("flex-1 border p-4 rounded-3xl mr-4")}
          placeholder="Input desired ingredients..."
          value={searchValue}
          onChangeText={(text) => {
            setSearchValue(text);
          }}
        />
        <TouchableOpacity
          style={tw.style(`bg-[${darkOrange}] p-5 rounded-3xl`)}
          onPress={() => {
            setIngredients([...ingredients, searchValue]);
            setSearchValue("");
          }}
        >
          <Text style={tw.style("text-white font-bold")}>ADD</Text>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw.style("flex-row")}
        >
          {ingredients?.map((ingredient, i) => (
            <View
              key={i}
              style={tw.style(
                `flex-row  items-center bg-[${darkGreen}] mr-2 p-2 rounded-l-full rounded-r-full`
              )}
            >
              <Text style={tw.style("font-bold text-white px-4")}>
                {ingredient}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  const filtered = ingredients.filter(
                    (value) => value !== ingredient
                  );
                  setIngredients([...filtered]);
                }}
              >
                <XMarkIcon size={20} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View style={tw.style("items-center")}>
          {ingredients?.length > 0 && (
            <TouchableOpacity
              style={tw.style(
                `items-center bg-[${darkOrange}] w-60 my-4 p-5 rounded-3xl`
              )}
              onPress={() => {
                dispatch(fetchRecipeByIngredients(ingredients));
              }}
            >
              <Text style={tw.style("text-white font-bold")}>LET'S COOK</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {ingredients.length === 0 && recipesByIngredients.length !== 0 && (
        <View style={tw.style("mb-5")}>
          <Text style={tw.style("text-lg font-bold")}>Latest search:</Text>
        </View>
      )}
      {recipesByIngredients?.length > 0 && (
        <ScrollView style={tw.style("")}>
          {recipesByIngredients.map((recipe) => (
            <TouchableOpacity
              key={recipe.id}
              style={tw.style(
                `bg-[${lightBeige}] mb-4 p-4 rounded-xl flex-row items-center`
              )}
              onPress={() => {
                navigation.navigate("Recipe", { recipe });
              }}
            >
              <Image
                style={tw.style("w-15 h-15 mr-4 rounded-xl")}
                source={{ uri: recipe.image }}
              />
              <Text style={tw.style(` text-lg font-bold flex-1`)}>
                {recipe.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CustomRecipeScreen;
