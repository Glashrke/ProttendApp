import { StyleSheet, Text, View } from "react-native";

import { QRCode } from 'react-qr-svg';
import BottomGlobalNavBar from "../../components/BottomGlobalNavBar";

export default function ChoiceQrTypeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de QR</Text>
        <div style={styles.qrcode}>
          <QRCode
            level="Q"
            style={{ width: 256 }}
            value={JSON.stringify({//Estos campos se van a sacar de una query a la base de datos
              id: 928328,
              name: 'Jane Doe',
              insider: true,
            })}
          />
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
