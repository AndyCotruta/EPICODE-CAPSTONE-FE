import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BodyComponent from "../components/BodyComponent";
import SearchComponent from "../components/SearchComponent";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { lightBeige } from "../graphics/colours";
import { selectFeaturedCategories } from "../redux/reducers/allRestaurantsSlice";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardButtons from "../components/Dashboard/DashboardButtons";
import DashboardScreen from "./DashboardScreen";
import RecipeBodyComponent from "../components/Recipe/RecipeBodyComponent";
import HomeComponent from "../components/HomeComponent";
import ManagementComponent from "../components/ManagementComponent";
import * as Animatable from "react-native-animatable";

const HomeScreen = () => {
  const featuredCategories = useSelector(selectFeaturedCategories);
  const [activeComponent, setActiveComponent] = useState("Home");

  return (
    <SafeAreaView
      edges={["right", "left", "top"]}
      style={tw.style(`flex-1 bg-[${lightBeige}]`)}
    >
      <DashboardHeader />
      {activeComponent === "Order" || activeComponent === "Recipe" ? (
        <Animatable.View animation={"fadeInUp"} iterationCount={1}>
          <SearchComponent activeComponent={activeComponent} shared={false} />
        </Animatable.View>
      ) : (
        ""
      )}

      {activeComponent === "Order" && (
        <BodyComponent featuredCategories={featuredCategories} />
      )}
      {activeComponent === "Recipe" && <RecipeBodyComponent />}
      {activeComponent === "Dashboard" && <DashboardScreen />}
      {activeComponent === "Home" && <HomeComponent />}
      {activeComponent === "Management" && <ManagementComponent />}
      <DashboardButtons
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
