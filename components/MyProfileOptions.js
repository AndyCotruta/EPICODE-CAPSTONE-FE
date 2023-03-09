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
import { darkGreen } from "../graphics/colours";
import { addAccessToken } from "../redux/reducers/userSlice";

const MyProfileOptions = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <Text style={tw.style("text-3xl font-bold")}>Options</Text>
      <View style={tw.style("")}>
        <TouchableOpacity
          style={tw.style(
            `flex flex-row items-center py-5 border-b border-[${darkGreen}]`
          )}
        >
          <PresentationChartBarIcon size={25} color={darkGreen} />
          <Text style={tw.style("px-4")}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw.style(
            `flex flex-row items-center py-5 border-b border-[${darkGreen}]`
          )}
        >
          <EnvelopeIcon size={25} color={darkGreen} />
          <Text style={tw.style("px-4")}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw.style(
            `flex flex-row items-center py-5 border-b border-[${darkGreen}]`
          )}
        >
          <ShoppingBagIcon size={25} color={darkGreen} />
          <Text style={tw.style("px-4")}>Basket</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw.style(
            `flex flex-row items-center py-5 border-b border-[${darkGreen}]`
          )}
        >
          <ClipboardDocumentListIcon size={25} color={darkGreen} />
          <Text style={tw.style("px-4")}>Order History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw.style(
            `flex flex-row items-center py-5 border-b border-[${darkGreen}]`
          )}
        >
          <HeartIcon size={25} color={darkGreen} />
          <Text style={tw.style("px-4")}>Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw.style(
            `flex flex-row items-center py-5 border-b border-[${darkGreen}]`
          )}
        >
          <UserGroupIcon size={25} color={darkGreen} />
          <Text style={tw.style("px-4")}>Shared Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw.style(
            `flex flex-row items-center py-5 border-b border-[${darkGreen}]`
          )}
        >
          <InformationCircleIcon size={25} color={darkGreen} />
          <Text style={tw.style("px-4")}>Need help?</Text>
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
    </View>
  );
};

export default MyProfileOptions;
