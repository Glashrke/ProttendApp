import { StyleSheet, Text, View } from "react-native";

import BottomGlobalNavBar from "../../components/BottomGlobalNavBar";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla Configuracion</Text>
      <BottomGlobalNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 50,
  },
});
