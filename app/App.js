import { StyleSheet, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomGlobalNavBar from "../components/BottomGlobalNavBar";
import ChoiceQrTypeScreen from "./screens/ChoiceQrTypeScreen";
import HomeScreen from "./screens/HomeScreen";

// Importa tus pantallas








// Importa tu navbar personalizado


const Stack = createNativeStackNavigator();

// Componente wrapper que incluye la navbar en todas las pantallas
function ScreenWithNavBar({ children }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {children}
      </View>
      <BottomGlobalNavBar />
    </View>
  );
}

// Wrapper para cada pantalla
function HomeScreenWithNavBar({ navigation }) {
  return (
    <ScreenWithNavBar>
      <HomeScreen navigation={navigation} />
    </ScreenWithNavBar>
  );
}

function ChoiceQrTypeScreenWithNavBar({ navigation }) {
  return (
    <ScreenWithNavBar>
      <ChoiceQrTypeScreen navigation={navigation} />
    </ScreenWithNavBar>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreenWithNavBar} />
        <Stack.Screen name="QR" component={ChoiceQrTypeScreenWithNavBar} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    marginBottom: 70, // Espacio para la navbar inferior
  },
});