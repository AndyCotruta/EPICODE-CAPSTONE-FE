import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/useAuth.js";
import StackNavigator from "./StackNavigator.js";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
