import { StyleSheet, View } from "react-native";

import { Slot } from "expo-router";
import BottomGlobalNavBar from "../../components/BottomGlobalNavBar";

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <Slot />
      <BottomGlobalNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
