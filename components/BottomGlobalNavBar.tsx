import { usePathname, useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import React from "react";

const TABS = [
  { route: "/(tabs)/", icon: "home-outline", position: "left" },
  { route: "/(tabs)/activityHistoryScreen", icon: "receipt-outline", position: "left" },
  { route: null, icon: null, position: "center" }, // Espacio vacío para el QR
  { route: "/(tabs)/SettingsScreen", icon: "settings-outline", position: "right" },
  { route: "/(tabs)/ProfileScreen", icon: "person-outline", position: "right" },
];

const QR_TAB = { route: "/(tabs)/ChoiceQrTypeScreen", icon: "qr-code-outline" };

export default function BottomGlobalNavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (route: string | null) => {
    if (route) {
      router.push(route);
    }
  };

  const isRouteActive = (route: string | null) => {
    if (!route) return false;
    
    // Normalizar las rutas para comparar
    const normalizedRoute = route.replace(/\/\(tabs\)\//, '/');
    const normalizedPathname = pathname.replace(/\/\(tabs\)\//, '/');
    
    if (route === "/(tabs)/") {
      return normalizedPathname === "/" || normalizedPathname === "/(tabs)/";
    }
    return normalizedPathname === normalizedRoute;
  };

  const isQRActive = isRouteActive(QR_TAB.route);

  return (
    <View style={styles.container}>      
      {/* Botones izquierdos */}
      <View style={styles.leftSection}>
        {TABS.filter(tab => tab.position === "left").map((tab, index) => (
          <React.Fragment key={tab.route}>
            <TouchableOpacity
              style={[
                styles.tab,
                isRouteActive(tab.route) && styles.activeTab,
              ]}
              onPress={() => navigateTo(tab.route)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={tab.icon as any}
                size={22}
                color={isRouteActive(tab.route) ? "#44f9ffff" : "#fff"}
              />
            </TouchableOpacity>
            {/* Línea separadora después de cada botón excepto el último */}
            {index < TABS.filter(tab => tab.position === "left").length - 1 && (
              <View style={styles.divider} />
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Espacio central (vacío) */}
      <View style={styles.centerSpace} />    

      {/* Botones derechos */}
      <View style={styles.rightSection}>
        {TABS.filter(tab => tab.position === "right").map((tab, index) => (
          <React.Fragment key={tab.route}>
            <TouchableOpacity
              style={[
                styles.tab,
                isRouteActive(tab.route) && styles.activeTab,
              ]}
              onPress={() => navigateTo(tab.route)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={tab.icon as any}
                size={22}
                color={isRouteActive(tab.route) ? "#44f9ffff" : "#fff"}
              />
            </TouchableOpacity>
            {/* Línea separadora después de cada botón excepto el último */}
            {index < TABS.filter(tab => tab.position === "right").length - 1 && (
              <View style={styles.divider} />
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Botón QR centrado superpuesto */}
      <TouchableOpacity
        style={[
          styles.centerButtonWrapper,
          isQRActive && styles.activeCenterButton,
        ]}
        onPress={() => navigateTo(QR_TAB.route)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={QR_TAB.icon as any}
          size={30}
          color={isQRActive ? "#44f9ffff" : "#fff"}
        />
      </TouchableOpacity>
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
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    elevation: 15,
  },
  leftSection: {
    flex: 2, // 2/5 del espacio
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },
  rightSection: {
    flex: 2, // 2/5 del espacio
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },
  centerSpace: {
    flex: 1, // 1/5 del espacio (vacío)
    height: "100%",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  activeTab: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  divider: {
    width: 1,
    height: "50%",
    backgroundColor: "rgba(255,255,255,0.5)",
    position: "absolute",
    top: "25%",
  },
  centerButtonWrapper: {
    position: "absolute",
    bottom: 15,
    left: "50%",
    marginLeft: -35, // Mitad del width para centrar exactamente
    backgroundColor: "#2E8CFF",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  activeCenterButton: {
    backgroundColor: "#1a6fd6", // Color más oscuro cuando está activo
    borderColor: "#44f9ffff",
  },
});