import { StyleSheet, View } from "react-native";

import { QRCodeSVG } from 'qrcode.react';
import BottomGlobalNavBar from "../../components/BottomGlobalNavBar";

const imei = "356938035643809"; // reemplaza con el IMEI real
const fechaHora = new Date().toISOString(); // formato ISO: "2025-11-06T14:32:00.000Z"

const data = {
  imei: imei,
  timestamp: fechaHora
};

const jsonString = JSON.stringify(data);
export default function ChoiceQrTypeScreen() {
  return (
    <View style={styles.container}>
      <div style={styles.qrcode}>
        <QRCodeSVG value={jsonString} size={256} level="H"/>
      </div>
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
  },qrcode: {
    textAlign: 'center',
  },
});
