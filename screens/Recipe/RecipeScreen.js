import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { fetchCompleteRecipe } from "../../redux/actions";
import {
  ChevronLeftIcon,
  HeartIcon,
  ArrowUpTrayIcon,
  ClockIcon,
  FaceSmileIcon,
  MinusSmallIcon,
  PlusSmallIcon,
} from "react-native-heroicons/outline";
import tw from "twrnc";

const RecipeScreen = () => {
  const {
    params: { recipe },
  } = useRoute();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [servings, setServings] = useState(2);
  const [active, setActive] = useState("Ingredients");

  useEffect(() => {
    dispatch(fetchCompleteRecipe(recipe.id));
  }, []);

  return (
    <SafeAreaView style={tw.style("flex-1 bg-white p-4")}>
      <View style={tw.style("flex-row justify-between items-center")}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ChevronLeftIcon size={25} />
        </TouchableOpacity>

        <View style={tw.style("flex-row items-center")}>
          <TouchableOpacity>
            <ArrowUpTrayIcon style={tw.style("mx-4")} size={25} />
          </TouchableOpacity>

          <TouchableOpacity>
            <HeartIcon size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw.style("flex items-center mt-4")}>
        <Text style={tw.style("text-3xl text-center font-bold")}>
          {recipe.title}
        </Text>
        <Text
          style={tw.style("text-gray-400 text-base text-center font-bold mt-2")}
        >
          By Author
        </Text>
        <View style={tw.style("my-2")}>
          <View style={tw.style("flex-row justify-between mt-2")}>
            <View style={tw.style("flex-row items-center mx-2")}>
              <ClockIcon size={20} color="gray" />
              <Text style={tw.style("text-gray-500 ml-1")}>20 min</Text>
            </View>
            <View style={tw.style("flex-row items-center mx-2")}>
              <FaceSmileIcon size={20} color="gray" />
              <Text style={tw.style("text-gray-500 ml-1")}>Easy</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={tw.style("flex items-center my-2")}>
        <Image
          style={tw.style("w-5/6 h-70 rounded-3xl shadow-md")}
          source={{ uri: recipe.image }}
        />
      </View>
      <View style={tw.style("flex-row justify-between my-4")}>
        <View>
          <Text style={tw.style("text-xl font-bold")}>Persons</Text>
          <Text style={tw.style("text-sm text-gray-400 font-bold")}>
            How many servings?
          </Text>
        </View>
        <View style={tw.style("flex-row items-center self-start")}>
          <TouchableOpacity
            style={tw.style(
              "flex justify-center items-center w-7 h-7 p-1 rounded-3xl bg-gray-200"
            )}
            onPress={() => {
              if (servings !== 1) {
                setServings(servings - 1);
              } else {
                return;
              }
            }}
          >
            <MinusSmallIcon />
          </TouchableOpacity>

          <Text style={tw.style("mx-3")}>{servings}</Text>
          <TouchableOpacity
            style={tw.style(
              "flex justify-center items-center w-7 h-7 p-1 rounded-3xl bg-gray-200"
            )}
            onPress={() => {
              setServings(servings + 1);
            }}
          >
            <PlusSmallIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw.style("flex-row justify-between items-center my-4")}>
        <TouchableOpacity
          onPress={() => {
            setActive("Ingredients");
          }}
        >
          <View>
            <Text
              style={
                active === "Ingredients"
                  ? tw.style("font-bold text-left")
                  : tw.style("text-gray-400 text-left")
              }
            >
              Ingredients
            </Text>
          </View>
          {active === "Ingredients" ? (
            <View
              style={tw.style("bg-black w-4 h-1 rounded-xl my-1 self-center")}
            ></View>
          ) : (
            <View style={tw.style("bg-white w-4 h-1 rounded-xl my-1")}></View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActive("Recipe");
          }}
        >
          <View>
            <Text
              style={
                active === "Recipe"
                  ? tw.style("font-bold text-left")
                  : tw.style("text-gray-400 text-left")
              }
            >
              Recipe
            </Text>
          </View>
          {active === "Recipe" ? (
            <View
              style={tw.style("bg-black w-4 h-1 rounded-xl my-1 self-center")}
            ></View>
          ) : (
            <View style={tw.style("bg-white w-4 h-1 rounded-xl my-1")}></View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActive("Reviews");
          }}
        >
          <View>
            <Text
              style={
                active === "Reviews"
                  ? tw.style("font-bold text-left")
                  : tw.style("text-gray-400 text-left")
              }
            >
              Reviews
            </Text>
          </View>
          {active === "Reviews" ? (
            <View
              style={tw.style("bg-black w-4 h-1 rounded-xl my-1 self-center")}
            ></View>
          ) : (
            <View style={tw.style("bg-white w-4 h-1 rounded-xl my-1")}></View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RecipeScreen;
