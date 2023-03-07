import { View, Text } from "react-native";
import React, { createContext, useContext } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

const AuthContext = createContext({
  //inital state...
});

const config = {
  iosClientId:
    "424994455100-nna8ah2omf11cfj73jacfq73kauc3pkl.apps.googleusercontent.com",
  androidClientId:
    "424994455100-puf7uanit2i7nj8qvi4u5usji3rqsn4a.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email"],
};

export const AuthProvider = ({ children }) => {
  const signInWithGoogle = async () => {
    Google.useAuthRequest(config).then(async (logInResult) => {
      if (logInResult.type === "success") {
        //login...
      } else {
      }
    });
  };

  return (
    <AuthContext.Provider value={{ user: null, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
