import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomGlobalNavBar from "../../components/BottomGlobalNavBar";

const imei = "356938035643809";
const fechaHora = new Date().toISOString();

const data = { imei, timestamp: fechaHora };
const jsonString = JSON.stringify(data);

export default function ChoiceQrTypeScreen() {
  const [option, setOption] = useState("assistance");

  return (
    <View style={styles.container}>

      {/* -------------- Segment Selector ---------------- */}
      <View style={styles.segmentContainer}>
        <TouchableOpacity
          style={[styles.segmentButton, option === "assistance" && styles.segmentActive]}
          onPress={() => setOption("assistance")}
        >
          <Text style={[styles.segmentText, option === "assistance" && styles.segmentActiveText]}>
            Assistance
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.segmentButton, option === "register" && styles.segmentActive]}
          onPress={() => setOption("register")}
        >
          <Text style={[styles.segmentText, option === "register" && styles.segmentActiveText]}>
            Registrar cel
          </Text>
        </TouchableOpacity>
      </View>

      {/* -------------- Title ---------------- */}
      <Text style={styles.title}>QR</Text>

      {/* -------------- QR Code ---------------- */}
      <View style={styles.qrWrapper}>
        <View style={styles.qrcode}>
          <QRCodeSVG value={jsonString} size={220} level="H" />
        </View>
      </View>

      <BottomGlobalNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  /* ----- Segmented Control ----- */
  segmentContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 25,
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
    padding: 3,
  },
  segmentButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  segmentActive: {
    backgroundColor: "#38A0FF",
  },
  segmentText: {
    color: "#333",
    fontSize: 15,
  },
  segmentActiveText: {
    color: "white",
    fontWeight: "600",
  },

  /* ----- Title ----- */
  title: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 42,
    fontWeight: "600",
    color: "#003A70",
  },

  /* ----- QR Area ----- */
  qrWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
  },
  qrcode: {
    backgroundColor: "#D9D9D9",
    padding: 18,
    borderRadius: 10,
  },
});
