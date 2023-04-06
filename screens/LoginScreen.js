import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addAccessToken } from "../redux/reducers/userSlice";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  lightBrown,
  lightOrange,
  mintGreen,
} from "../graphics/colours";
import { LinearGradient } from "expo-linear-gradient";
import {
  GOOGLE_CLIENT_ID_EXPO,
  GOOGLE_CLIENT_ID_IOS,
  GOOGLE_CLIENT_ID_WEB,
  BE_URL,
} from "@env";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [focused, setFocused] = useState("false");
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [googleUserData, setGoogleUserData] = useState(null);

  const [accessToken, setAccessToken] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    iosClientId: GOOGLE_CLIENT_ID_IOS,
    expoClientId: GOOGLE_CLIENT_ID_EXPO,
    webClientId: GOOGLE_CLIENT_ID_WEB,
  });
  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response, accessToken]);

  const fetchGoogleData = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        const userInfo = await response.json();

        setGoogleUserData({
          ...googleUserData,
          email: userInfo.email,
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          googleId: userInfo.id,
          avatar: userInfo.picture,
        });
      } else {
        console.log("Error fetching");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const googleConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(googleUserData),
  };
  const handleGoogleLogin = async () => {
    try {
      const response = await fetch(
        `${BE_URL}/users/googleLogin`,

        googleConfig
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(addAccessToken(data.accessToken));
        navigation.navigate("Home");
      } else {
        console.log("Error while login in BE with google");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (googleUserData !== null) {
      handleGoogleLogin();
    }
  }, [googleUserData]);

  useEffect(() => {
    if (accessToken !== null) {
      fetchGoogleData();
    }
  }, [accessToken]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${BE_URL}/users/login`,
        userData,
        config
      );
      if (response) {
        const data = response.data.accessToken;
        dispatch(addAccessToken(data));
        navigation.navigate("LoginAnimation");
      } else {
        console.log("Error while trying to login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[lightOrange, mintGreen]}
      start={{ x: 1.2, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={tw.style("mb-9")}>
        <Text
          style={tw.style(
            `text-center text-7xl font-bold text-[${lightBrown}]`
          )}
        >
          BAMBOO
        </Text>
        <Text
          style={tw.style(`text-center font-bold text-5xl text-[${darkGreen}]`)}
        >
          BITES
        </Text>
      </View>

      <View style={tw.style(`w-80 bg-[${lightBeige}] p-4 mb-7 rounded-md`)}>
        <TextInput
          style={
            Platform.OS === "web"
              ? focused
                ? styles.focused
                : styles.placeholder
              : tw.style("")
          }
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="email"
          value={userData.email}
          autoCapitalize="none"
          onChangeText={(text) => {
            setUserData({ ...userData, email: text });
          }}
        />
      </View>
      <View style={tw.style(`w-80 bg-[${lightBeige}] p-4 mb-7 rounded-md`)}>
        <TextInput
          style={
            Platform.OS === "web"
              ? focused
                ? styles.focused
                : styles.placeholder
              : tw.style("")
          }
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          secureTextEntry={true}
          placeholder="password"
          value={userData.password}
          onChangeText={(text) => {
            setUserData({ ...userData, password: text });
          }}
        />
      </View>
      <View style={tw.style("flex flex-row w-80")}>
        <TouchableOpacity
          style={tw.style("flex flex-1")}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <View
            style={tw.style(
              `bg-[${darkGreen}] p-4 mr-4 rounded-3xl shadow-lg  `
            )}
          >
            <Text style={tw.style("text-white font-bold text-center")}>
              CREATE AN ACCOUNT
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleLogin();
          }}
        >
          <View
            style={tw.style(`bg-[${darkOrange}] p-4  rounded-3xl shadow-lg `)}
          >
            <Text style={tw.style("text-white font-bold text-center")}>
              LOG IN
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={tw.style("w-80")}>
        <TouchableOpacity
          style={tw.style(
            `flex flex-row items-center justify-center bg-[${lightBeige}] p-4 my-5 rounded-3xl shadow-lg `
          )}
          onPress={() => {
            promptAsync({});
          }}
        >
          <Image
            style={tw.style("w-5 h-5 mx-2")}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
            }}
          />
          <Text style={tw.style(`text-black font-bold text-center `)}>
            Log In with Google
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    color: "black",
  },
  focused: {
    color: "black",
  },
});

export default LoginScreen;
