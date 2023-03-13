import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import {
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  lightBrown,
  lightOrange,
  mintGreen,
} from "../graphics/colours";
import { useSelector } from "react-redux";
import { selectAllRestaurants } from "../redux/reducers/allRestaurantsSlice";
import { useNavigation } from "@react-navigation/native";

const SearchComponent = () => {
  const navigation = useNavigation();

  const [focused, setFocused] = useState("false");
  const [searchValue, setSearchValue] = useState("");
  const [filtered, setFiltered] = useState([]);
  const allRestaurants = useSelector(selectAllRestaurants);

  useEffect(() => {
    const filtered = allRestaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFiltered(filtered);
  }, [searchValue]);

  return (
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
            placeholder="Restaurants and cuisines"
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
      {searchValue !== "" && (
        <ScrollView
          style={tw.style("h-50 px-4 mx-4 mb-4 bg-white rounded-xl shadow-md")}
        >
          {filtered.map((result, i) => (
            <TouchableOpacity
              key={i}
              style={tw.style("")}
              onPress={() => {
                navigation.navigate("Restaurant", {
                  id: result.id,
                  imgUrl: result.image,
                  title: result.name,
                  rating: result.rating,
                  genre: result.genre,
                  address: result.address,
                  short_description: result.short_description,
                  dishes: result.dishes,
                  lon: result.lon,
                  lat: result.lat,
                });
                setSearchValue("");
              }}
            >
              <View
                style={tw.style(
                  "flex-row items-center border-b py-4 border-gray-200"
                )}
              >
                <Image
                  style={tw.style("h-10 w-10 mr-4 rounded-md")}
                  source={{ uri: result.image }}
                />
                <Text style={tw.style(`text-[${darkGreen}] font-bold flex-1 `)}>
                  {result.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    color: "gray",
  },
  focused: {
    outlineWidth: 0,
    flex: 1,
    color: "gray",
  },
});

export default SearchComponent;
