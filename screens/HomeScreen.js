import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BodyComponent from "../components/BodyComponent";
import HeaderComponent from "../components/HeaderComponent";
import SearchComponent from "../components/SearchComponent";
import tw from "twrnc";
import { addUserData, selectAccessToken } from "../redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Text, View } from "react-native";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  lightBrown,
  lightOrange,
  mintGreen,
} from "../graphics/colours";
import { BE_URL } from "@env";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [featuredCategories, setfeaturedCategories] = useState([]);
  const token = useSelector(selectAccessToken);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const fetchMyData = async () => {
    try {
      const response = await fetch(`${BE_URL}/users/me`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response) {
        const data = await response.json();

        dispatch(addUserData(data));
      } else {
      }
    } catch (error) {
      console.log("Error fetching my data");
    }
  };

  const fetchFeaturedCategories = async () => {
    try {
      const response = await fetch(`${BE_URL}/featuredCategories`);
      if (response) {
        const data = await response.json();
        setfeaturedCategories(data);
      } else {
        console.log("Error fetching featured categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeaturedCategories();
    fetchMyData();
  }, []);

  return (
    <SafeAreaView
      edges={["right", "left", "top"]}
      style={tw.style(`flex-1 bg-[${lightBeige}]`)}
    >
      <HeaderComponent />

      <SearchComponent />
      <BodyComponent featuredCategories={featuredCategories} />
    </SafeAreaView>
  );
};

export default HomeScreen;
