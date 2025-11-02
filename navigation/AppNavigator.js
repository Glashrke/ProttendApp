import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomNavBar from "../components/BottomGlobalNavBar";
import ChoiceQrTypeScreen from "../screens/ChoiceQrTypeScreen";
import HomeScreen from "../screens/HomeScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNavBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="QR" component={ChoiceQrTypeScreen} />
    </Tab.Navigator>
  );
}
