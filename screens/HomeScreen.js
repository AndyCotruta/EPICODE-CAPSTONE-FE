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
import { fetchMyData } from "../redux/actions";
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

const socket = io(`${BE_URL}`, { transports: ["websocket"] });

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [featuredCategories, setfeaturedCategories] = useState([]);
  const token = useSelector(selectAccessToken);
  const recipeActive = useSelector(selectRecipeStatus);

  const userData = useSelector(selectUserData);
  const initiatedBy = useSelector(selectInitiatedBy);

  // useEffect(() => {
  //   socket.on("connected", (message) => {
  //     console.log(socket.connected);
  //     console.log(message);
  //     // socket.emit("sendMessage", {
  //     //   message: "Hello Bamboo Bites",
  //     // });
  //     socket.on("newMessage", (message) => {
  //       console.log(message);

  //       dispatch(addMessage(message));
  //       dispatch(addSharedOrderUsers(message.message));

  //       navigation.navigate("SharedLobby");
  //     });
  //   });

  //   // (async () => {
  //   //   const { status } = await BarCodeScanner.requestPermissionsAsync();
  //   //   setHasPermission(status === "granted");
  //   // })();
  // }, [socket]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const fetchFeaturedCategories = async () => {
    try {
      const response = await fetch(`${BE_URL}/featuredCategories`);
      if (response) {
        const data = await response.json();

        setfeaturedCategories(data);
        const allRestaurants = data.flatMap((category) => category.restaurants);

        dispatch(setAllRestaurants(allRestaurants));
      } else {
        console.log("Error fetching featured categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeaturedCategories();
    dispatch(fetchMyData(token));
  }, [dispatch, token]);

  return (
    <SafeAreaView
      edges={["right", "left", "top"]}
      style={tw.style(`flex-1 bg-[${lightBeige}]`)}
    >
      <HeaderComponent />
      {recipeActive ? <RecipeSearchComponent /> : <SearchComponent />}

      <BodyComponent featuredCategories={featuredCategories} />
    </SafeAreaView>
  );
};

export default HomeScreen;
