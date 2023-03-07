import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import StackNavigator from "./components/StackNavigator";
import { store, persistor } from "./redux/store/store";

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
