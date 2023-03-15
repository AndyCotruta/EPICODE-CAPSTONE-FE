import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import StackNavigator from "./components/StackNavigator";
import { store, persistor } from "./redux/store/store";
import { io } from "socket.io-client";
import { BE_URL } from "@env";
import { addMessage } from "./redux/reducers/communicationSlice";
import { useDispatch } from "react-redux";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StackNavigator />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
