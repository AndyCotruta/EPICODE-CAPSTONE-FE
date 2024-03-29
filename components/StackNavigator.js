import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import BasketScreen from "../screens/BasketScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserData,
  moveToDelivery,
  refreshOrder,
  selectAccessToken,
  selectUserData,
} from "../redux/reducers/userSlice";
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
import SharedLobby from "../screens/SharedLobby";
import { useNavigation } from "@react-navigation/native";
import {
  addInitiatedBy,
  addSharedOrderDishes,
  addSharedOrderUsers,
  removeSharedOrderDishes,
  removeSharedOrderUser,
  selectInitiatedBy,
} from "../redux/reducers/sharedOrderSlice";
import { fetchMyData } from "../redux/actions";
import SharedOrderRestaurantsList from "../screens/SharedOrderRestaurantsList";
import SharedBasket from "../screens/SharedBasket";
import WaitingScreen from "../screens/WaitingScreen";
import { setRestaurant } from "../redux/reducers/restaurantSlice";
import DashboardScreen from "../screens/DashboardScreen";
import CategoryScreen from "../screens/CategoryScreen";
import CustomRecipeScreen from "../screens/Recipe/CustomRecipeScreen";
import RecipeCooked from "../screens/Recipe/RecipeCooked";
import LoginAnimation from "../screens/LoginAnimation";

const socket = io(`${BE_URL}`, { transports: ["websocket"] });
// const socket = io(`http://localhost:3001`, { transports: ["websocket"] });

const StackNavigator = () => {
  const Stack = new createNativeStackNavigator();

  const accessToken = useSelector(selectAccessToken);
  const userData = useSelector(selectUserData);
  const initiatedBy = useSelector(selectInitiatedBy);

  const [connectedUsers, setConnectedUsers] = useState([]);
  const [host, setHost] = useState();
  const [currentUser, setCurrentUser] = useState();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    socket.on("connected", (message) => {
      console.log(socket.connected);
      console.log(message);
      // socket.emit("sendMessage", {
      //   message: "Hello Bamboo Bites",
      // });
      socket.on("newMessage", (message) => {
        dispatch(addMessage(message));
        dispatch(addSharedOrderUsers(message.complexObj));
        setConnectedUsers([...connectedUsers, message.complexObj]);
        setHost(message.obj);
        setCurrentUser(message.obj);
      });
      socket.on("disconnectUser", (message) => {
        dispatch(removeSharedOrderUser(message.message._id));
      });
      socket.on("moveToSharedBasket", (message) => {
        dispatch(
          setRestaurant({
            id: message.message._id,
            imgUrl: message.message.image,
            title: message.message.name,
            rating: message.message.rating,
            genre: message.message.genre,
            address: message.message.address,
            short_description: message.message.short_description,
            dishes: message.message.dishes,
            lon: message.message.lon,
            lat: message.message.lat,
            shared: true,
            sharedView: true,
          })
        );
      });
      socket.on("addMyDish", (message) => {
        dispatch(addSharedOrderDishes(message));
      });
      socket.on("removeMyDish", (message) => {
        const { id } = message;
        dispatch(removeSharedOrderDishes({ id }));
      });
      socket.on("moveToDeliveryScreen", (message) => {
        dispatch(moveToDelivery(true));
        dispatch(fetchMyData(accessToken));
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
          <Stack.Screen
            name="LoginAnimation"
            component={LoginAnimation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Category"
            component={CategoryScreen}
            options={{ headerShown: false }}
          />
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
          <Stack.Screen
            name="SharedOrder"
            component={SharedOrderScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SharedLobby"
            component={SharedLobby}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WaitingScreen"
            component={WaitingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SharedOrderRestaurantsList"
            component={SharedOrderRestaurantsList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SharedBasket"
            component={SharedBasket}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen
            name="Recipe"
            component={RecipeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CustomRecipe"
            component={CustomRecipeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecipeCooked"
            component={RecipeCooked}
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
