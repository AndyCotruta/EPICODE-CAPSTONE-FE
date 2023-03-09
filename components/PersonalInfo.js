import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { darkGreen, lightBeige, lightOrange } from "../graphics/colours";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/reducers/userSlice";
import { PencilSquareIcon } from "react-native-heroicons/outline";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { BE_URL } from "@env";

const PersonalInfo = () => {
  const userData = useSelector(selectUserData);
  const [dynamicUserData, setDynamicUserData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    avatar: userData.avatar,
    role: userData.role,
  });
  const [editable, setEditable] = useState(false);

  const selectFile = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Permission denied");
        } else {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
          });
          console.log(result);
          if (!result.canceled) {
            setDynamicUserData({
              ...dynamicUserData,
              avatar: result.assets[0].uri,
            });
          }
        }
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });
        if (!result.canceled) {
          setDynamicUserData({
            ...dynamicUserData,
            avatar: result.assets[0].uri,
          });
        }
      }
    } catch (error) {
      console.log("You can't select file", error.message);
    }
  };

  const saveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("firstName", dynamicUserData.firstName);
      formData.append("lastName", dynamicUserData.lastName);
      formData.append("email", dynamicUserData.email);
      formData.append("avatar", dynamicUserData.avatar);
      formData.append("role", dynamicUserData.role);
      const response = await fetch(`${BE_URL}/users/me`, {
        method: "PUT",

        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.log("Error while trying to modify user data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={tw.style("")}>
        <Text style={tw.style("text-3xl font-bold")}>Personal Info</Text>
      </View>
      <View style={tw.style("flex flex-row items-center py-4")}>
        <View style={tw.style("w-30 h-30 rounded-full overflow-hidden")}>
          <Image
            style={tw.style("w-30 h-30 rounded-full")}
            source={{ uri: dynamicUserData.avatar }}
          />

          <TouchableOpacity
            style={tw.style(
              `bg-[${darkGreen}] absolute bottom-0 pb-1 right-0 left-0 flex-row items-center justify-center`
            )}
            onPress={selectFile}
          >
            <PencilSquareIcon size={20} color={lightBeige} />
          </TouchableOpacity>
        </View>

        <View style={tw.style("flex-grow-1 ml-4")}>
          <View style={tw.style("flex-row items-center justify-between")}>
            <Text style={tw.style(` font-bold text-[${darkGreen}]`)}>
              First Name
            </Text>
            <TouchableOpacity
              onPress={() => {
                setEditable(!editable);
              }}
            >
              <PencilSquareIcon size={20} color={darkGreen} />
            </TouchableOpacity>
          </View>
          <TextInput
            value={dynamicUserData.firstName}
            editable={editable}
            onChangeText={(text) => {
              setDynamicUserData({ ...dynamicUserData, firstName: text });
            }}
          />
          <Text style={tw.style(` font-bold text-[${darkGreen}]`)}>
            Last Name
          </Text>
          <TextInput
            value={dynamicUserData.lastName}
            editable={editable}
            onChangeText={(text) => {
              setDynamicUserData({ ...dynamicUserData, lastName: text });
            }}
          />
          <Text style={tw.style(` font-bold text-[${darkGreen}]`)}>Email</Text>
          <TextInput
            value={dynamicUserData.email}
            editable={editable}
            onChangeText={(text) => {
              setDynamicUserData({ ...dynamicUserData, email: text });
            }}
          />
        </View>
      </View>
      {userData.firstName === dynamicUserData.firstName &&
      userData.lastName === dynamicUserData.lastName &&
      userData.email === dynamicUserData.email ? (
        <View></View>
      ) : (
        <TouchableOpacity onPress={saveChanges}>
          <Text
            style={tw.style(
              `p-4 bg-[${lightOrange}] text-white font-bold text-center rounded-xl`
            )}
          >
            Save Changes
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PersonalInfo;
