import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const TABS = [
  { route: "Home", icon: "home-outline" },
  { route: "ActivityHistory", icon: "receipt-outline" },
  { route: "QR", icon: "qr-code-outline", center: true },
  { route: "Settings", icon: "settings-outline" },
  { route: "Profile", icon: "person-outline" },
];

export default function BottomGlobalNavBar() {
  const navigation = useNavigation();

  const navigateTo = (routeName: string) => {
    navigation.navigate(routeName);
  };

  // Opcional: detectar pantalla activa
  // Puedes usar useRoute hook si necesitas detectar la pantalla activa

  return (
    <View style={styles.container}>
      {TABS.map((tab, index) => {
        // Agregar línea divisora (excepto antes y después del botón central)
        const showDivider =
          index !== 0 && !TABS[index - 1].center && !tab.center;

        return (
          <React.Fragment key={tab.route}>
            {showDivider && <View style={styles.divider} />}
            <TouchableOpacity
              style={[
                styles.tab,
                tab.center && styles.centerButtonWrapper,
              ]}
              onPress={() => navigateTo(tab.route)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={tab.icon as any}
                size={tab.center ? 30 : 22}
                color="#fff"
              />
            </TouchableOpacity>
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#2E8CFF",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 15,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  divider: {
    width: 1,
    height: "50%",
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  centerButtonWrapper: {
    position: "absolute",
    bottom: 15,
    backgroundColor: "#2E8CFF",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2E8CFF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
});