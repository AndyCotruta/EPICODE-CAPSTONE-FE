import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { useDispatch } from "react-redux";
import {
  EnvelopeIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  HeartIcon,
  UserGroupIcon,
  InformationCircleIcon,
  PresentationChartBarIcon,
} from "react-native-heroicons/outline";
import { darkGreen, lightBeige, mintGreen } from "../graphics/colours";
import { addAccessToken, moveToDelivery } from "../redux/reducers/userSlice";
import { useNavigation } from "@react-navigation/native";

const MyProfileOptions = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={tw.style(`bg-[${lightBeige}] rounded-xl`)}>
      <TouchableOpacity
        style={tw.style(
          `flex flex-row items-center p-5  border-b  border-gray-200`
        )}
        onPress={() => {
          navigation.navigate("Dashboard");
        }}
      >
        <PresentationChartBarIcon size={25} color={darkGreen} />
        <Text style={tw.style("px-4 font-bold")}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw.style(
          `flex flex-row items-center p-5  border-b  border-gray-200`
        )}
      >
        <EnvelopeIcon size={25} color={darkGreen} />
        <Text style={tw.style("px-4 font-bold")}>Inbox</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw.style(
          `flex flex-row items-center p-5  border-b  border-gray-200`
        )}
        onPress={() => {
          dispatch(moveToDelivery(false));
          navigation.navigate("Basket", { shared: false });
        }}
      >
        <ShoppingBagIcon size={25} color={darkGreen} />
        <Text style={tw.style("px-4 font-bold")}>Basket</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw.style(
          `flex flex-row items-center p-5  border-b  border-gray-200`
        )}
        onPress={() => {
          navigation.navigate("Order");
        }}
      >
        <ClipboardDocumentListIcon size={25} color={darkGreen} />
        <Text style={tw.style("px-4 font-bold")}>My Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw.style(
          `flex flex-row items-center p-5  border-b  border-gray-200`
        )}
      >
        <HeartIcon size={25} color={darkGreen} />
        <Text style={tw.style("px-4 font-bold")}>Favourites</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw.style(
          `flex flex-row items-center p-5  border-b  border-gray-200`
        )}
        onPress={() => {
          navigation.navigate("SharedOrder");
        }}
      >
        <UserGroupIcon size={25} color={darkGreen} />
        <Text style={tw.style("px-4 font-bold")}>Shared Order</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw.style(
          `flex flex-row items-center p-5  border-b  border-gray-200`
        )}
      >
        <InformationCircleIcon size={25} color={darkGreen} />
        <Text style={tw.style("px-4 font-bold")}>Need help?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw.style("py-4")}
        onPress={() => {
          dispatch(addAccessToken(null));
        }}
      >
        <Text
          style={tw.style("text-center bg-red-500 text-white p-5 rounded-lg")}
        >
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyProfileOptions;
