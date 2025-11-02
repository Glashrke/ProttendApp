import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function BottomGlobalNavBar({ state, navigation }) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const icon =
          route.name === "Inicio"
            ? "home"
            : route.name === "QR"
            ? "qr-code"
            : "person";

        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(route.name)}
            style={[
              styles.tab,
              route.name === "QR" && styles.qrButtonContainer,
            ]}
          >
            <Ionicons
              name={icon}
              size={route.name === "QR" ? 34 : 26}
              color={isFocused ? "#007AFF" : "#999"}
              style={route.name === "QR" && styles.qrIcon}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    height: 60,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
  qrButtonContainer: {
    backgroundColor: "#007AFF",
    borderRadius: 40,
    width: 70,
    height: 70,
    marginBottom: 20,
  },
  qrIcon: {
    color: "#fff",
  },
});
