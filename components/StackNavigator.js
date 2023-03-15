import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import BasketScreen from "../screens/BasketScreen";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "../redux/reducers/userSlice";
import RegistrationScreen from "../screens/RegistrationScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import AnimationScreen from "../screens/AnimationScreen";
import DeliveryScreen from "../screens/DeliveryScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import RecipeScreen from "../screens/Recipe/RecipeScreen";
import SharedOrderScreen from "../screens/SharedOrderScreen";
import { io } from "socket.io-client";
import { BE_URL } from "@env";
import { addMessage } from "../redux/reducers/communicationSlice";

const socket = io(`${BE_URL}`, { transports: ["websocket"] });
// const socket = io(`http://localhost:3001`, { transports: ["websocket"] });

const StackNavigator = () => {
  const Stack = new createNativeStackNavigator();

  const accessToken = useSelector(selectAccessToken);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("connected", (message) => {
      console.log(socket.connected);
      console.log(message);
      // socket.emit("sendMessage", {
      //   message: "Hello Bamboo Bites",
      // });
      socket.on("newMessage", (message) => {
        console.log(message);
        try {
          dispatch(addMessage(message));
        } catch (error) {
          console.log(error);
        }
      });
    });

    // (async () => {
    //   const { status } = await BarCodeScanner.requestPermissionsAsync();
    //   setHasPermission(status === "granted");
    // })();
  }, [socket]);

  return (
    <Stack.Navigator>
      {accessToken !== null ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Animation"
            component={AnimationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Delivery"
            component={DeliveryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Order"
            component={OrderHistoryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="MyProfile" component={MyProfileScreen} />
          <Stack.Screen name="SharedOrder" component={SharedOrderScreen} />

          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen
            name="Recipe"
            component={RecipeScreen}
            options={{ headerShown: false }}
          />
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
