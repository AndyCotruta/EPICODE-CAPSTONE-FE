import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { darkGreen, lightBeige } from "../graphics/colours";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../redux/reducers/restaurantSlice";
import { XMarkIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapComponent from "../components/MapComponent";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const [mapUrl, setMapUrl] = useState("");
  const fetchMap = async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/url-https%3A%2F%2Fdocs.mapbox.com%2Fapi%2Fimg%2Fcustom-marker.png(${restaurant.lon},${restaurant.lat})/${restaurant.lon},${restaurant.lat},15,0/500x500?access_token=pk.eyJ1IjoiY29jbzMwNzEiLCJhIjoiY2xmMnA1bnJlMGtsOTNzbGpzcWdudjFmdyJ9.FlgZkuDS88WcBQV_p8ft7g`
      );
      if (response.ok) {
        setMapUrl(response.url);
      } else {
        console.log("Error while fetching maps");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMap();
  }, []);

  return (
    <SafeAreaView style={tw.style(`bg-[${lightBeige}] flex-1 p-4`)}>
      <View style={tw.style("flex-row justify-between items-center z-50")}>
        <TouchableOpacity
          style={tw.style(
            `bg-[${darkGreen}] w-8 h-8 rounded-full flex items-center justify-center`
          )}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>

        <Text style={tw.style(`font-bold text-2xl text-[${darkGreen}]`)}>
          Help?
        </Text>
      </View>
      <View style={tw.style(`bg-white rounded-xl p-4 my-4 shadow-md`)}>
        <View style={tw.style("flex-row justify-between")}>
          <View>
            <Text style={tw.style("text-sm text-gray-400 mb-2")}>
              Estimated Delivery Time
            </Text>
            <Text style={tw.style("text-3xl font-bold")}>45-55 Minutes</Text>
          </View>
          <Image
            style={tw.style("w-20 h-20")}
            source={require("../assets/orderComing.gif")}
          />
        </View>
        <View style={tw.style("")}>
          <Progress.Bar
            progress={0.3}
            width={200}
            indeterminate={true}
            animated={true}
            animationType="spring"
            color={darkGreen}
          />
          <Text style={tw.style("text-gray-400 text-xs pt-4")}>
            Your order at{" "}
            <Text style={tw.style(`text-[${darkGreen}] font-bold`)}>
              {restaurant.title}
            </Text>{" "}
            is being prepared
          </Text>
        </View>
      </View>
      {Platform.OS === "web" && mapUrl !== "" && (
        <View style={tw.style(`flex-1 rounded-xl shadow-md`)}>
          <Image
            style={tw.style("w-full h-full rounded-xl ")}
            source={{ uri: mapUrl }}
          />
        </View>
      )}
      {Platform.OS !== "web" && <MapComponent />}
      <View
        style={tw.style(
          `bg-white flex-row items-center shadow-md p-4 rounded-xl mt-4`
        )}
      >
        <Image
          style={tw.style(`h-12 w-12 bg-[${lightBeige}] p-4 mr-4 rounded-full`)}
          source={{ uri: "https://links.papareact.com/wru" }}
        />
        <View style={tw.style("flex-1")}>
          <Text style={tw.style(`text-lg text-[${darkGreen}] font-bold `)}>
            Andy Cotruta
          </Text>
          <Text style={tw.style("text-gray-400")}>Your Rider</Text>
        </View>
        <Text style={tw.style(`text-[${darkGreen}] font-bold text-lg`)}>
          Call
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DeliveryScreen;
