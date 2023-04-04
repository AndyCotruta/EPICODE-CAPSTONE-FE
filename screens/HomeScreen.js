import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BodyComponent from "../components/BodyComponent";
import HeaderComponent from "../components/HeaderComponent";
import SearchComponent from "../components/SearchComponent";
import tw from "twrnc";
import {
  addUserData,
  selectAccessToken,
  selectUserData,
} from "../redux/reducers/userSlice";
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
import { fetchFeaturedCategories, fetchMyData } from "../redux/actions";
import { setAllRestaurants } from "../redux/reducers/allRestaurantsSlice";
import { selectRecipeStatus } from "../redux/reducers/recipeSlice";
import RecipeSearchComponent from "../components/Recipe/RecipeSearchComponent";
import { io } from "socket.io-client";

import { addMessage } from "../redux/reducers/communicationSlice";
import SharedLobby from "../screens/SharedLobby";

import {
  addSharedOrderUsers,
  selectInitiatedBy,
} from "../redux/reducers/sharedOrderSlice";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardButtons from "../components/Dashboard/DashboardButtons";

const socket = io(`${BE_URL}`, { transports: ["websocket"] });

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [featuredCategories, setfeaturedCategories] = useState([]);
  const token = useSelector(selectAccessToken);
  const recipeActive = useSelector(selectRecipeStatus);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(fetchFeaturedCategories());
    dispatch(fetchMyData(token));
  }, [dispatch, token]);

  return (
    <SafeAreaView
      edges={["right", "left", "top"]}
      style={tw.style(`flex-1 bg-[${lightBeige}]`)}
    >
      <DashboardHeader />
      {recipeActive ? <RecipeSearchComponent /> : <SearchComponent />}

      <BodyComponent featuredCategories={featuredCategories} />
      <DashboardButtons />
    </SafeAreaView>
  );
};

export default HomeScreen;
