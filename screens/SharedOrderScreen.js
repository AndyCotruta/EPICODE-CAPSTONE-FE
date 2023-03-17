import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";

import { io } from "socket.io-client";
import { BE_URL } from "@env";
import tw from "twrnc";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  mintGreen,
} from "../graphics/colours";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  PlusCircleIcon,
  UserPlusIcon,
  ArrowLeftIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  addInitiatedBy,
  selectInitiatedBy,
} from "../redux/reducers/sharedOrderSlice";
import { selectUserData } from "../redux/reducers/userSlice";

const socket = io(`${BE_URL}`, { transports: ["websocket"] });

const SharedOrderScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userData = useSelector(selectUserData);
  const [openCamera, setOpenCamera] = React.useState(false);
  const [hasPermission, setHasPermission] = React.useState(false);
  const [scanData, setScanData] = React.useState();
  const [complexObj, setComplexObj] = useState({
    _id: userData._id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    avatar: userData.avatar,
  });
  const [newSharedOrder, setNewSharedOrder] = useState(false);
  const initiatedBy = useSelector(selectInitiatedBy);

  const handleBarCodeScanned = ({ type, data }) => {
    const obj = eval("(" + data + ")");
    console.log(obj);
    dispatch(addInitiatedBy(obj));
    setScanData(data);

    console.log(`Data: ${data}`);
    console.log(`Type: ${type}`);
    socket.emit("sendMessage", {
      message: complexObj,
    });
    setOpenCamera(false);
    navigation.navigate("SharedLobby");
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  return (
    <>
      {openCamera ? (
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
        />
      ) : (
        <SafeAreaView style={tw.style(`flex-1 bg-[${lightBeige}] p-4`)}>
          <View>
            <TouchableOpacity
              style={tw.style("absolute top-1 z-10")}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <ArrowLeftIcon size={30} color={darkGreen} />
            </TouchableOpacity>

            <Text
              style={tw.style(
                `text-center text-3xl text-[${darkGreen}] font-bold mb-4`
              )}
            >
              Shared Order
            </Text>
          </View>

          <Image
            style={tw.style("w-full h-90")}
            source={require("../assets/shared.png")}
          />

          <View>
            <Text
              style={tw.style(
                `text-center text-xl text-[${darkGreen}] font-bold mb-10`
              )}
            >
              Share an order with your friends and enjoy your lunch together!
            </Text>
            <View style={tw.style("flex-row justify-between mt-10")}>
              <TouchableOpacity
                style={tw.style(
                  `flex-row items-center bg-[${darkOrange}] p-4 rounded-3xl shadow-md w-40 justify-center`
                )}
                onPress={() => {
                  navigation.navigate("SharedLobby");
                  dispatch(addInitiatedBy(userData));
                }}
              >
                <PlusCircleIcon size={20} color="white" />
                <Text style={tw.style("text-white font-bold ml-4")}>New</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw.style(
                  `flex-row items-center bg-[${mintGreen}] p-4 rounded-3xl shadow-md w-40 justify-center`
                )}
                onPress={() => {
                  setOpenCamera(true);
                }}
              >
                <UserPlusIcon size={20} color={darkGreen} />
                <Text style={tw.style(`text-[${darkGreen}] font-bold ml-4`)}>
                  Join
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* <Button
        title="Send from Android"
        onPress={() => {
          socket.emit("sendMessage", {
            message: "Hello Bamboo Bites",
          });
        }}
      />
      <Button
        title="Open Camera"
        onPress={() => {
          setOpenCamera(true);
          socket.emit("sendMessage", {
            message: "Hello Bamboo Bites",
          });
        }}
      />
      <QRCode value={JSON.stringify(complexObj)} />

       */}
        </SafeAreaView>
      )}
    </>
  );
};

export default SharedOrderScreen;
