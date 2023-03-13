import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";

const ThreeMainCategories = ({ active, setActive }) => {
  return (
    <View>
      <View style={tw.style("flex-row justify-between items-center mt-4")}>
        <TouchableOpacity
          style={tw.style("flex ")}
          onPress={() => {
            setActive("Breakfast");
          }}
        >
          <View>
            <Text
              style={
                active === "Breakfast"
                  ? tw.style("font-bold text-left")
                  : tw.style("text-gray-400 text-left")
              }
            >
              Breakfast
            </Text>
          </View>

          {active === "Breakfast" ? (
            <View
              style={tw.style("bg-black w-4 h-1 rounded-xl my-1 self-center")}
            ></View>
          ) : (
            <View style={tw.style("bg-white w-4 h-1 rounded-xl my-1")}></View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={tw.style("flex ")}
          onPress={() => {
            setActive("Lunch");
          }}
        >
          <Text
            style={
              active === "Lunch"
                ? tw.style("font-bold text-center")
                : tw.style("text-gray-400 text-center")
            }
          >
            Lunch
          </Text>
          {active === "Lunch" ? (
            <View
              style={tw.style("bg-black w-4 h-1 rounded-xl my-1 self-center")}
            ></View>
          ) : (
            <View style={tw.style("bg-white w-4 h-1 rounded-xl my-1")}></View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={tw.style("flex ")}
          onPress={() => {
            setActive("Dinner");
          }}
        >
          <Text
            style={
              active === "Dinner"
                ? tw.style("font-bold text-right")
                : tw.style("text-gray-400 text-right")
            }
          >
            Dinner
          </Text>
          {active === "Dinner" ? (
            <View
              style={tw.style("bg-black w-4 h-1 rounded-xl my-1 self-center")}
            ></View>
          ) : (
            <View style={tw.style("bg-white w-4 h-1 rounded-xl my-1")}></View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ThreeMainCategories;
