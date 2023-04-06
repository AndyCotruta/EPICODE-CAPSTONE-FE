import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addAccessToken } from "../redux/reducers/userSlice";
import { LinearGradient } from "expo-linear-gradient";
import {
  darkGreen,
  darkOrange,
  lightBeige,
  lightBrown,
  lightOrange,
  mintGreen,
} from "../graphics/colours";
import { BE_URL } from "@env";

const RegistrationScreen = () => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [focused, setFocused] = useState("false");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${BE_URL}/users/register`,
        userData,
        config
      );
      if (response) {
        const data = response.data;
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
      <View style={tw.style(`w-80 bg-[${lightBeige}] p-4 mb-4 rounded`)}>
        <TextInput
          style={focused ? styles.focused : styles.placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="First Name"
          value={userData.firstName}
          onChangeText={(text) => {
            setUserData({ ...userData, firstName: text });
          }}
        />
      </View>
      <View style={tw.style(`w-80 bg-[${lightBeige}] p-4 mb-4 rounded`)}>
        <TextInput
          style={focused ? styles.focused : styles.placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Last Name"
          value={userData.lastName}
          onChangeText={(text) => {
            setUserData({ ...userData, lastName: text });
          }}
        />
      </View>
      <View style={tw.style(`w-80 bg-[${lightBeige}] p-4 mb-4 rounded`)}>
        <TextInput
          style={focused ? styles.focused : styles.placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="email"
          value={userData.email}
          onChangeText={(text) => {
            setUserData({ ...userData, email: text });
          }}
        />
      </View>
      <View style={tw.style(`w-80 bg-[${lightBeige}] p-4 mb-4 rounded`)}>
        <TextInput
          style={focused ? styles.focused : styles.placeholder}
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
            navigation.navigate("Login");
          }}
        >
          <View
            style={tw.style(
              `bg-[${darkGreen}] p-4 mr-4 rounded-3xl shadow-lg `
            )}
          >
            <Text style={tw.style("text-white text-center font-bold")}>
              LOG IN
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleRegister();
          }}
        >
          <View
            style={tw.style(`bg-[${darkOrange}] p-4  rounded-3xl shadow-lg `)}
          >
            <Text style={tw.style("text-white text-center font-bold")}>
              REGISTER
            </Text>
          </View>
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
    color: "gray",
  },
  focused: {
    color: "gray",
  },
});

export default RegistrationScreen;
