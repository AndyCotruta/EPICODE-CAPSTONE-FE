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

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [featuredCategories, setfeaturedCategories] = useState([]);
  const token = useSelector(selectAccessToken);
  console.log(token);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const fetchMyData = async () => {
    try {
      const response = await fetch(
        "https://deliveroo-mongodb-backend-production.up.railway.app/users/me",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response) {
        const data = await response.json();
        console.log(data);
        dispatch(addUserData(data));
      } else {
      }
    } catch (error) {
      console.log("Error fetching my data");
    }
  };

  const fetchFeaturedCategories = async () => {
    try {
      const response = await fetch(
        "https://deliveroo-mongodb-backend-production.up.railway.app/featuredCategories"
      );
      if (response) {
        const data = await response.json();
        setfeaturedCategories(data);
        console.log(data);
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
      style={tw.style(`flex-1 bg-[${mintGreen}]`)}
    >
      <HeaderComponent />

      <SearchComponent />
      <BodyComponent featuredCategories={featuredCategories} />
    </SafeAreaView>
  );
};

export default HomeScreen;
