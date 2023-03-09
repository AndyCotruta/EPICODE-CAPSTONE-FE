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
import { addAccessToken } from "../redux/reducers/userSlice";

const MyProfileOptions = () => {
  const dispatch = useDispatch();
  return (
    <View style={tw.style(`bg-[${lightBeige}] rounded-xl`)}>
      <TouchableOpacity
        style={tw.style(
          `flex flex-row items-center p-5  border-b  border-[${mintGreen}]`
        )}
      >
        <PresentationChartBarIcon size={25} color={darkGreen} />
        <Text style={tw.style("px-4 font-bold")}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw.style(
          `flex flex-row items-center p-5  border-b  border-[${mintGreen}]`
        )}
      >
        <EnvelopeIcon size={25} color={darkGreen} />
        <Text style={tw.style("px-4 font-bold")}>Inbox</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw.style(
          `flex flex-row items-center p-5  border-b  border-[${mintGreen}]`
        )}
      >
        <ShoppingBagIcon size={25} color={darkGreen} />
        <Text style={tw.style("px-4 font-bold")}>Basket</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw.style(
          `flex flex-row items-center p-5  border-b  border-[${mintGreen}]`
        )}
      >
        <ClipboardDocumentListIcon size={25} color={darkGreen} />
        <Text style={tw.style("px-4 font-bold")}>Order History</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw.style(
          `flex flex-row items-center p-5  border-b  border-[${mintGreen}]`
        )}
      >
        <HeartIcon size={25} color={darkGreen} />
        <Text style={tw.style("px-4 font-bold")}>Favourites</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw.style(
          `flex flex-row items-center p-5  border-b  border-[${mintGreen}]`
        )}
      >
        <UserGroupIcon size={25} color={darkGreen} />
        <Text style={tw.style("px-4 font-bold")}>Shared Order</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw.style(
          `flex flex-row items-center p-5  border-b  border-[${mintGreen}]`
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
