import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import {
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import { darkGreen } from "../../graphics/colours";

const RecipeSearchComponent = () => {
  const [focused, setFocused] = useState("false");
  const [searchValue, setSearchValue] = useState("");
  return (
    <View>
      <View>
        <View
          style={tw.style("flex-row items-center  pb-4 mx-4")}
          className="flex-row items-center  pb-2 mx-4"
        >
          <View
            style={tw.style(
              `flex-row flex-1 rounded-xl bg-white p-3 items-center`
            )}
            className="flex-row flex-1  bg-gray-300 p-3"
          >
            <MagnifyingGlassIcon
              style={tw.style("mr-2")}
              size={20}
              color={darkGreen}
            />

            <TextInput
              style={focused ? styles.focused : styles.placeholder}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              value={searchValue}
              placeholder="Delicious Recipes"
              onChangeText={(text) => {
                setSearchValue(text);
              }}
            />
          </View>

          <TouchableOpacity>
            <AdjustmentsVerticalIcon
              style={tw.style("mx-3")}
              size={20}
              color={darkGreen}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    color: "gray",
  },
  focused: {
    flex: 1,
    color: "gray",
  },
});

export default RecipeSearchComponent;
