import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";
import { useNavigation } from "@react-navigation/native";
import { darkGreen, darkOrange, lightBeige } from "../graphics/colours";
import tw from "twrnc";
import { useSelector } from "react-redux";
import {
  selectInitiatedBy,
  selectSharedOrderUsers,
} from "../redux/reducers/sharedOrderSlice";
import { selectUserData } from "../redux/reducers/userSlice";
import { io } from "socket.io-client";
import { BE_URL } from "@env";

const socket = io(`${BE_URL}`, { transports: ["websocket"] });

const SharedLobby = () => {
  const navigation = useNavigation();

  const userData = useSelector(selectUserData);
  const initiatedBy = useSelector(selectInitiatedBy);
  const connectedUsers = useSelector(selectSharedOrderUsers);

  const [complexObj, setComplexObj] = useState({
    _id: userData._id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    avatar: userData.avatar,
  });

  const [waitingScreen] = useState({
    initiatedBy,
    connectedUsers,
  });

  return (
    <SafeAreaView style={tw.style(`flex-1 bg-[${lightBeige}] p-4`)}>
      <View style={tw.style("flex items-center")}>
        <Text
          style={tw.style(
            `text-2xl text-[${darkOrange}] text-center font-bold`
          )}
        >
          Share this QR Code with your friends
        </Text>
        <View style={tw.style("mt-5")}>
          <QRCode
            size={200}
            backgroundColor={lightBeige}
            value={JSON.stringify(complexObj)}
          />
        </View>
      </View>
      <View style={tw.style("flex-1 items-center my-4")}>
        <Text
          style={tw.style(
            `text-[${darkGreen}] text-xl text-center font-bold mb-4`
          )}
        >
          Initiated by:
        </Text>
        <View style={tw.style("flex items-center")}>
          <Image
            style={tw.style("w-20 h-20 rounded-full shadow-md")}
            source={{ uri: initiatedBy.avatar }}
          />
          <Text style={tw.style("font-bold")}>{initiatedBy.firstName}</Text>
        </View>
      </View>
      <View style={tw.style("flex-1 items-center")}>
        <Text
          style={tw.style(
            `text-[${darkGreen}] text-xl text-center font-bold mb-4`
          )}
        >
          Connected users:
        </Text>
        <View style={tw.style("flex-row items-center")}>
          {connectedUsers.map((user) => (
            <View style={tw.style("flex items-center")} key={user._id}>
              <Image
                style={tw.style("w-20 h-20 rounded-full shadow-md")}
                source={{ uri: user.avatar }}
              />
              <Text style={tw.style("font-bold")}>{user.firstName}</Text>
            </View>
          ))}
        </View>
      </View>
      <View
        style={tw.style(
          userData._id === initiatedBy._id
            ? "flex-row items-center justify-between"
            : "flex items-center"
        )}
      >
        <TouchableOpacity
          style={tw.style(
            `bg-[${darkGreen}] p-4 rounded-3xl shadow-md w-40 mt-5`
          )}
          onPress={() => {
            socket.emit("disconnectMe", {
              message: complexObj,
            });
            navigation.navigate("SharedOrder");
          }}
        >
          <Text style={tw.style("text-white text-center font-bold")}>
            Cancel
          </Text>
        </TouchableOpacity>
        {userData._id === initiatedBy._id && (
          <TouchableOpacity
            style={tw.style(
              `bg-[${darkOrange}] p-4 rounded-3xl shadow-md w-40 mt-5`
            )}
            onPress={() => {
              socket.emit("waitingScreen", {
                message: waitingScreen,
              });

              navigation.navigate("SharedOrderRestaurantsList");
            }}
          >
            <Text style={tw.style("text-white text-center font-bold")}>
              Continue
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SharedLobby;
