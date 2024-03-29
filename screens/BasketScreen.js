import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../redux/reducers/restaurantSlice";
import {
  addRestautantId,
  refreshBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
  selectBasketRestaurant,
  selectBasketTotal,
} from "../redux/reducers/basketSlice";
import tw from "twrnc";
import { XCircleIcon } from "react-native-heroicons/solid";
import { darkGreen, darkOrange, lightBeige } from "../graphics/colours";
import { BE_URL } from "@env";
import {
  addUserData,
  selectAccessToken,
  selectMoveToDelivery,
  selectUserData,
} from "../redux/reducers/userSlice";
import { fetchMyData } from "../redux/actions";
import {
  addSharedOrderRestaurantId,
  addSharedOrderUsers,
  removeSharedOrderDishes,
  resetSharedOrder,
  selectInitiatedBy,
  selectSharedOrder,
  selectSharedOrderDetails,
  selectSharedOrderDishes,
  selectSharedOrderTotal,
} from "../redux/reducers/sharedOrderSlice";
import { io } from "socket.io-client";

const socket = io(`${BE_URL}`, { transports: ["websocket"] });

const BasketScreen = () => {
  const {
    params: { shared },
  } = useRoute();

  const initiatedBy = useSelector(selectInitiatedBy);
  const userData = useSelector(selectUserData);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const basketTotal = useSelector(selectBasketTotal);
  const sharedOrderTotal = useSelector(selectSharedOrderTotal);

  const restaurant = useSelector(selectRestaurant);

  const items = useSelector(selectBasketItems);
  const sharedOrderItems = useSelector(selectSharedOrderDishes);

  const token = useSelector(selectAccessToken);

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const [groupedSharedOrderItemsInBasket, setGroupedSharedOrderItemsInBasket] =
    useState([]);

  const sharedOrder = useSelector(selectSharedOrder);

  const moveToDelivery = useSelector(selectMoveToDelivery);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  useEffect(() => {
    const groupedSharedOrderItems = sharedOrderItems.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedSharedOrderItemsInBasket(groupedSharedOrderItems);
  }, [sharedOrderItems]);

  const dishes = items.map((item) => item.id);
  const sharedOrderDishes = sharedOrderItems.map((item) => item.id);

  const handlePlaceOrder = async () => {
    try {
      const activeOrder = {
        restaurantId: restaurant.id,
        dishes: dishes,
        totalPrice: basketTotal + 5.99,
      };

      const response = await fetch(`${BE_URL}/users/me/activeOrder`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activeOrder),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(addUserData(data));
        navigation.navigate("Animation", { shared: false });
        dispatch(refreshBasket());
        dispatch(fetchMyData(token));
      } else {
        console.log("Error while creating the active order");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const restaurantName = restaurant.title;

  const handlePlaceSharedOrder = async () => {
    try {
      const sharingOrder = {
        dishes: sharedOrder.order.dishes.map((dish) => dish.id),
        restaurantId: sharedOrder.order.restaurantId.restaurantId,
        totalPrice: sharedOrderTotal,

        users: sharedOrder.users,
      };
      const response = await fetch(`${BE_URL}/users/me/sharedOrder`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sharingOrder),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(addUserData(data));
        socket.emit("moveToDeliveryScreen", { data });
        navigation.navigate("Animation", {
          shared: true,
          sharedRestaurant: restaurantName,
        });
        dispatch(fetchMyData(token));
      } else {
        console.log("Error while creating the shared order");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (moveToDelivery === true) {
      navigation.navigate("Animation", {
        shared: true,
        sharedRestaurant: restaurantName,
      });
    }
  }, [moveToDelivery]);

  return (
    <SafeAreaView style={tw.style(`flex-1 bg-[${lightBeige}]`)}>
      <View style={tw.style(`p-4  bg-[${lightBeige}] shadow-sm`)}>
        <View
          style={tw.style(`${Platform.OS === "android" ? "pt-12" : "pt-2"}`)}
        >
          <Text style={tw.style("text-3xl font-bold text-center")}>
            {shared ? "Shared Basket" : "Basket"}
          </Text>
          <TouchableOpacity
            // onPress={() => {
            //   console.log("Shared is: ", shared);
            // }}
            onPress={
              shared
                ? () => {
                    console.log(
                      "We should navigate to Restaurant because shared:",
                      shared
                    );
                    navigation.navigate("Restaurant", {
                      id: restaurant.id,
                      imgUrl: restaurant.imgUrl,
                      title: restaurant.title,
                      rating: restaurant.rating,
                      genre: restaurant.genre,
                      address: restaurant.address,
                      short_description: restaurant.short_description,
                      dishes: restaurant.dishes,
                      long: restaurant.lat,
                      lat: restaurant.lat,
                      shared: true,
                      sharedView: true,
                    });
                  }
                : () => {
                    console.log("Shared:", shared);
                    navigation.navigate("Restaurant", {
                      id: restaurant.id,
                      imgUrl: restaurant.imgUrl,
                      title: restaurant.title,
                      rating: restaurant.rating,
                      genre: restaurant.genre,
                      address: restaurant.address,
                      short_description: restaurant.short_description,
                      dishes: restaurant.dishes,
                      long: restaurant.lat,
                      lat: restaurant.lat,
                    });
                  }
            }
          >
            <Text style={tw.style("text-center text-gray-400")}>
              {restaurant.title}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={tw.style(
            `rounded-full  absolute ${
              Platform.OS === "android" ? "top-8 right-2" : "top-2 right-2"
            } `
          )}
        >
          <XCircleIcon color={darkGreen} size={50} />
        </TouchableOpacity>
      </View>
      <View style={tw.style(`flex-1 bg-white px-4`)}>
        <View
          style={tw.style(
            `flex-row items-center px-4 py-3 bg-[${lightBeige}] my-5 rounded-xl`
          )}
        >
          <Image
            style={tw.style("h-7 w-7 bg-gray-300 p-4 rounded-full mr-3")}
            source={{
              uri: "https://links.papareact.com/wru",
            }}
          />
          <Text style={tw.style("flex-1")}>Deliver in 50-75 mins</Text>
          <TouchableOpacity>
            <Text style={tw.style(`text-[${darkOrange}] font-bold`)}>
              Change
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {Object.entries(
            shared ? groupedSharedOrderItemsInBasket : groupedItemsInBasket
          ).map(([key, items]) => (
            <View
              style={tw.style(
                `flex flex-row items-center bg-[${lightBeige}] p-4 mb-4 rounded-xl`
              )}
              key={key}
            >
              <Text style={tw.style(`font-bold text-lg text-[${darkGreen}]`)}>
                {items.length}{" "}
              </Text>
              <Text>x</Text>
              <Image
                source={{ uri: items[0]?.image }}
                style={tw.style("h-12 w-12 rounded-full mx-2")}
              />
              <View style={tw.style("flex-1")}>
                <Text style={tw.style("")}>{items[0]?.name}</Text>
                <Text style={tw.style(`font-bold text-[${darkGreen}]`)}>
                  ${items[0]?.price}
                </Text>
              </View>

              <TouchableOpacity
                onPress={
                  shared
                    ? () => {
                        if (items.length <= 1) {
                          // dispatch(removeSharedOrderDishes({ id: key }));
                          socket.emit("removeMyDish", { id: key });
                          dispatch(addSharedOrderRestaurantId(null));
                        } else {
                          // dispatch(removeSharedOrderDishes({ id: key }));
                          socket.emit("removeMyDish", { id: key });
                        }
                      }
                    : () => {
                        if (items.length <= 1) {
                          dispatch(removeFromBasket({ id: key }));
                          dispatch(addRestautantId(null));
                        } else {
                          dispatch(removeFromBasket({ id: key }));
                        }
                      }
                }
              >
                <Text
                  style={tw.style(
                    `text-[${darkOrange}] ml-3 text-sm font-bold`
                  )}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={tw.style(`px-4 bg-[${lightBeige}]`)}>
        <View style={tw.style("flex-row justify-between py-4")}>
          <Text style={tw.style("text-gray-400")}>Subtotal</Text>
          <Text style={tw.style("text-gray-400")}>
            ${shared ? sharedOrderTotal : basketTotal}
          </Text>
        </View>
        <View style={tw.style("flex-row justify-between pb-4")}>
          <Text style={tw.style("text-gray-400")}>Delivery Fee</Text>
          <Text style={tw.style("text-gray-400")}>$5.99</Text>
        </View>
        <View style={tw.style("flex-row justify-between pb-4")}>
          <Text style={tw.style(`font-bold text-[${darkGreen}]`)}>
            Total Price
          </Text>
          <Text style={tw.style(`font-bold text-[${darkGreen}]`)}>
            $
            {shared
              ? (((sharedOrderTotal + 5.99) * 100) / 100).toFixed(2)
              : (((basketTotal + 5.99) * 100) / 100).toFixed(2)}
          </Text>
        </View>
        {/* {userData._id === initiatedBy._id ? (
          <TouchableOpacity
            style={tw.style(`bg-[${darkOrange}] rounded-xl p-4 mb-4`)}
            onPress={async () => {
              await handlePlaceOrder();
            }}
          >
            <Text style={tw.style("text-center text-white font-bold text-lg")}>
              Place Order
            </Text>
          </TouchableOpacity>
        ) : (
          ""
        )} */}
        {shared ? (
          userData._id === initiatedBy._id ? (
            <TouchableOpacity
              style={tw.style(`bg-[${darkOrange}] rounded-xl p-4 mb-4`)}
              onPress={() => {
                handlePlaceSharedOrder();
              }}
            >
              <Text
                style={tw.style("text-center text-white font-bold text-lg")}
              >
                Place Order
              </Text>
            </TouchableOpacity>
          ) : (
            ""
          )
        ) : (
          <TouchableOpacity
            style={tw.style(`bg-[${darkOrange}] rounded-xl p-4 mb-4`)}
            onPress={() => {
              handlePlaceOrder();
            }}
          >
            <Text style={tw.style("text-center text-white font-bold text-lg")}>
              Place Order
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
