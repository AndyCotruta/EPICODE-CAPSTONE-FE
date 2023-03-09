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
import { useDispatch, useSelector } from "react-redux";
import {
  addUserData,
  selectAccessToken,
  selectUserData,
} from "../redux/reducers/userSlice";
import { PencilSquareIcon } from "react-native-heroicons/outline";
import * as ImagePicker from "react-native-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { BE_URL } from "@env";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const userData = useSelector(selectUserData);
  const [dynamicUserData, setDynamicUserData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    avatar: userData.avatar,
    role: userData.role,
  });
  const [completeAvatarData, setCompleteAvatarData] = useState(null);
  const [editable, setEditable] = useState(false);

  const selectFile = async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });

      if (response.type !== "cancel") {
        console.log("We didn't cancel");
        console.log(response);
        if (Platform.OS !== "web") {
          setDynamicUserData({
            ...dynamicUserData,
            avatar: response.uri,
          });
          setCompleteAvatarData({
            ...completeAvatarData,
            uri: response.uri,
            name: response.name,
            type: response.mimeType,
          });
        } else {
          const base64Uri = response.uri;
          // replace the above URI with your own Base64 URI

          const byteCharacters = atob(base64Uri.split(",")[1]);

          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);

          const file = new Blob([byteArray], { type: "image/png" });

          const url = URL.createObjectURL(file);

          setDynamicUserData({
            ...dynamicUserData,
            avatar: response.uri,
          });
          setCompleteAvatarData({
            ...completeAvatarData,
            uri: url,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("firstName", dynamicUserData.firstName);
      formData.append("lastName", dynamicUserData.lastName);
      formData.append("email", dynamicUserData.email);
      if (Platform.OS !== "web") {
        completeAvatarData !== null &&
          formData.append("userImage", {
            uri: completeAvatarData.uri,
            type: completeAvatarData.type,
            name: completeAvatarData.name,
          });
      } else {
        completeAvatarData !== null &&
          formData.append("userImage", completeAvatarData.uri);
      }

      console.log("This is what complete data has", completeAvatarData);
      console.log("Formed data has", formData);
      formData.append("role", dynamicUserData.role);
      const response = await fetch(`${BE_URL}/users/me`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(addUserData(data));
        setCompleteAvatarData(null);
      } else {
        console.log("Error while trying to modify user data", response);
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
      userData.email === dynamicUserData.email &&
      completeAvatarData === null ? (
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
