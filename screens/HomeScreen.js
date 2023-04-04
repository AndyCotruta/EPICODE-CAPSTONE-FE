import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BodyComponent from "../components/BodyComponent";
import SearchComponent from "../components/SearchComponent";
import tw from "twrnc";
import { selectAccessToken } from "../redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { lightBeige } from "../graphics/colours";
import { fetchFeaturedCategories, fetchMyData } from "../redux/actions";
import { selectFeaturedCategories } from "../redux/reducers/allRestaurantsSlice";
import { selectRecipeStatus } from "../redux/reducers/recipeSlice";
import RecipeSearchComponent from "../components/Recipe/RecipeSearchComponent";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardButtons from "../components/Dashboard/DashboardButtons";
import DashboardScreen from "./DashboardScreen";
import RecipeBodyComponent from "../components/Recipe/RecipeBodyComponent";
import HomeComponent from "../components/HomeComponent";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const featuredCategories = useSelector(selectFeaturedCategories);
  const token = useSelector(selectAccessToken);
  const recipeActive = useSelector(selectRecipeStatus);
  const [activeComponent, setActiveComponent] = useState("Order");

  useEffect(() => {
    dispatch(fetchFeaturedCategories());
    dispatch(fetchMyData(token));
  }, []);

  return (
    <SafeAreaView
      edges={["right", "left", "top"]}
      style={tw.style(`flex-1 bg-[${lightBeige}]`)}
    >
      <DashboardHeader />
      {recipeActive ? <RecipeSearchComponent /> : <SearchComponent />}

      {activeComponent === "Order" && (
        <BodyComponent featuredCategories={featuredCategories} />
      )}
      {activeComponent === "Recipe" && <RecipeBodyComponent />}
      {activeComponent === "Dashboard" && <DashboardScreen />}
      {activeComponent === "Home" && <HomeComponent />}
      <DashboardButtons
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
