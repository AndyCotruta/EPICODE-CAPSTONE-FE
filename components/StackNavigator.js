import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import BasketScreen from "../screens/BasketScreen";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../redux/reducers/userSlice";
import RegistrationScreen from "../screens/RegistrationScreen";
import MyProfileScreen from "../screens/MyProfileScreen";

const StackNavigator = () => {
  const Stack = new createNativeStackNavigator();

  const accessToken = useSelector(selectAccessToken);
  return (
    <Stack.Navigator>
      {accessToken !== null ? (
        <>
          <Stack.Screen path="/home" name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen name="MyProfile" component={MyProfileScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegistrationScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;