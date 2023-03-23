import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
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
import { selectActiveRecipe } from "../../redux/reducers/recipeSlice";
import { darkOrange } from "../../graphics/colours/index";

const RecipeScreen = () => {
  const {
    params: { recipe },
  } = useRoute();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [servings, setServings] = useState(2);
  const [active, setActive] = useState("Ingredients");

  const recipeData = useSelector(selectActiveRecipe);

  useEffect(() => {
    dispatch(fetchCompleteRecipe(recipe.id));
  }, []);

  return (
    <SafeAreaView style={tw.style("flex-1 bg-white p-4")}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            style={tw.style(
              "text-gray-400 text-base text-center font-bold mt-2"
            )}
          >
            By Author
          </Text>
          <View style={tw.style("my-2")}>
            <View style={tw.style("flex-row justify-between mt-2")}>
              <View style={tw.style("flex-row items-center mx-2")}>
                <ClockIcon size={20} color="gray" />
                <Text style={tw.style("text-gray-500 ml-1")}>
                  {recipeData.readyInMinutes} min
                </Text>
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
            style={tw.style("w-5/6 h-70 rounded-3xl")}
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
              <MinusSmallIcon size={20} color="black" />
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
              <PlusSmallIcon size={20} color="black" />
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
        {active === "Ingredients" && (
          <View>
            {recipeData?.extendedIngredients.map((ingredient, i) => (
              <View
                key={ingredient.id}
                style={tw.style(
                  "flex-row items-center py-2 border-b border-gray-300"
                )}
              >
                <Text
                  style={tw.style("flex-1 font-bold text-lg text-gray-500")}
                >
                  {i + 1}.{" "}
                  <Text style={tw.style("text-gray-500")}>
                    {ingredient.originalName}
                  </Text>
                </Text>
                <Text style={tw.style("font-bold ")}>
                  {(
                    servings *
                    (ingredient.measures.metric.amount / recipeData.servings)
                  ).toFixed(2)}
                </Text>
                <Text style={tw.style("font-bold text-gray-500")}>
                  {" "}
                  {ingredient.measures.metric.unitShort}
                </Text>
                {/* <Image
                style={tw.style("w-10 h-10")}
                source={{ uri: ingredient.image }}
              /> */}
              </View>
            ))}
          </View>
        )}
        {active === "Recipe" && (
          <View>
            <View style={tw.style("flex-row")}>
              <Text style={tw.style("font-bold")}>Diets: </Text>
              {recipeData.diets.map((diet) => (
                <Text key={diet} style={tw.style("mr-2")}>
                  "{diet}"
                </Text>
              ))}
            </View>
            <View style={tw.style("flex-row")}>
              <Text style={tw.style("font-bold")}>Dish Types: </Text>
              {recipeData.dishTypes.map((type) => (
                <Text key={type}>{type}, </Text>
              ))}
            </View>
            {/* <View style={tw.style("flex-row")}>
              <Text style={tw.style("font-bold")}>Ready in: </Text>
              <Text>{recipeData.readyInMinutes}</Text>
              <Text> minutes</Text>
            </View> */}

            <Text style={tw.style("font-bold")}>Step by step guide:</Text>
            <View>
              {recipeData.analyzedInstructions[0].steps.map((stepp) => (
                <View>
                  <Text>
                    {stepp.number}. {stepp.step}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
        <View style={tw.style("flex items-center")}>
          <TouchableOpacity
            style={tw.style(
              `flex justify-center items-center bg-[${darkOrange}] w-70 h-20 my-2 mt-4 p-5 rounded-3xl`
            )}
          >
            <Text style={tw.style("text-white font-bold text-2xl")}>
              Recipe Cooked!
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeScreen;
