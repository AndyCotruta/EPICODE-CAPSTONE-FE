import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import useAuth from "../hooks/useAuth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
  const [accessToken, setAccessToken] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "424994455100-nn79bm4jp88fa04sbbk699h8pru2ju5a.apps.googleusercontent.com",
    iosClientId:
      "424994455100-2sfnb87jjakgocnl3v2hfnvcdq9oj4vi.apps.googleusercontent.com",
    expoClientId:
      "424994455100-ef5qvf1dlrh0chcb52cls69prdn1vq2r.apps.googleusercontent.com",
    webClientId:
      "424994455100-iu6n96uq9mp9a0g1fe572cscs4j4c0am.apps.googleusercontent.com",
  });
  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <View>
      <Text>LoginScreen</Text>
      <Button
        title="Click to login w google"
        disabled={!request}
        onPress={() => {
          promptAsync({});
        }}
      />
    </View>
  );
};

export default LoginScreen;
