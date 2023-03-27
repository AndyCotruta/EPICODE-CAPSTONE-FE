import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { UserIcon, ChevronDownIcon } from "react-native-heroicons/outline";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  lightBrown,
  lightOrange,
  mintGreen,
} from "../graphics/colours";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../redux/reducers/userSlice";
import {
  selectRecipeStatus,
  setRecipeActive,
} from "../redux/reducers/recipeSlice";

const HeaderComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const recipeActive = useSelector(selectRecipeStatus);

  return (
    <View
      style={tw.style(`flex-row p-4 items-center bg-[${lightBeige}]`)}
      className="flex-row pb-3 items-center mx-4"
    >
      {recipeActive ? (
        <TouchableOpacity
          style={tw.style(
            "bg-white rounded-full h-11 w-11 flex justify-center items-center"
          )}
          onPress={() => {
            dispatch(setRecipeActive(!recipeActive));
          }}
        >
          <Text>R</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={tw.style(
            "bg-white rounded-full h-11 w-11 flex justify-center items-center"
          )}
          onPress={() => {
            dispatch(setRecipeActive(!recipeActive));
          }}
        >
          <Text>O</Text>
        </TouchableOpacity>
      )}

      {recipeActive ? (
        <View style={tw.style("flex-1 mx-2")}>
          <Text style={tw.style(`font-bold text-[${darkOrange}] text-xs`)}>
            Let's cook!
          </Text>
          <Text style={tw.style(`font-bold text-[${darkGreen}] text-xl`)}>
            MasterChef Mode ON
          </Text>
        </View>
      ) : (
        <View style={tw.style("flex-1 mx-2")} className="flex-1">
          <Text style={tw.style(`font-bold text-[${darkOrange}] text-xs`)}>
            Deliver Now!
          </Text>
          <View style={tw.style("flex-row items-center")}>
            <Text
              style={tw.style(`font-bold text-[${darkGreen}] text-xl`)}
              className="font-bold text-xl"
            >
              Current Location
            </Text>

            <TouchableOpacity>
              <ChevronDownIcon size={20} color={darkGreen} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={tw.style(
          `h-11 w-11 bg-[${lightBeige}] items-center justify-center rounded-full`
        )}
        onPress={() => {
          navigation.navigate("MyProfile");
        }}
      >
        {userData ? (
          <Image
            style={tw.style("h-11 w-11 rounded-full")}
            source={{ uri: userData.avatar }}
          />
        ) : (
          <UserIcon style={tw.style()} size={20} color={darkGreen} />
        )}

        {/* <Image
          style={tw.style("h-11 w-11 rounded-full")}
          source={{ uri: userData.avatar }}
        /> */}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;
