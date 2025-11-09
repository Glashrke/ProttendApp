import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import BottomGlobalNavBar from "../../components/BottomGlobalNavBar";

// Interfaces para TypeScript
interface RegisterData {
  type: 'register';
  dni: string;
  deviceId: string;
  timestamp: string;
}

interface AccessData {
  type: 'access';
  deviceId: string;
  time: string;
  timestamp: string;
}

export default function ChoiceQrTypeScreen() {
  const [option, setOption] = useState("assistance");
  const [deviceId, setDeviceId] = useState<string>("");
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Simulamos que el DNI se obtiene del contexto de autenticación
  // En una app real, esto vendría de tu contexto de usuario o async storage
  const [userDni, setUserDni] = useState<string>("12345678A"); // Ejemplo

  // Generar datos para QR de registro (DNI + deviceId)
  const getRegistrationQRData = (): string => {
    if (!deviceId || !userDni) {
      return '';
    }
    
    const registerData: RegisterData = {
      type: 'register',
      dni: userDni,
      deviceId: deviceId,
      timestamp: new Date().toISOString()
    };
    
    return JSON.stringify(registerData);
  };

  // Generar datos para QR de acceso (deviceId + hora)
  const getAccessQRData = (): string => {
    if (!deviceId) {
      return '';
    }
    
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    const accessData: AccessData = {
      type: 'access',
      deviceId,
      time,
      timestamp: now.toISOString()
    };
    
    return JSON.stringify(accessData);
  };

  // Obtener datos del QR según el tipo seleccionado
  const getQRData = (): string => {
    if (option === "register") {
      return getRegistrationQRData();
    } else {
      return getAccessQRData();
    }
  };

  // Inicializar información del dispositivo
  const initializeDeviceInfo = async () => {
    try {
      // Solicitar permisos en Android si es necesario
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('Permiso denegado');
        }
      }

      // Obtener uniqueId
      const uniqueId = await DeviceInfo.getUniqueId();
      setDeviceId(uniqueId);

      // En una app real, aquí cargarías el DNI del usuario autenticado
      // Por ejemplo: const dni = await AsyncStorage.getItem('userDni');
      // setUserDni(dni);

    } catch (error) {
      console.error('Error inicializando información del dispositivo:', error);
    }
  };

  // Efecto para inicializar dispositivo
  useEffect(() => {
    initializeDeviceInfo();
  }, []);

  // Efecto para actualizar hora cada 30 segundos (solo para QR de acceso)
  useEffect(() => {
    let interval: number;
    
    if (option === "assistance") {
      // Para QR de acceso, actualizar cada 30 segundos
      interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 30000);
    }
    
    return () => clearInterval(interval);
  }, [option]);

  // Función para formatear hora según el tipo de QR
  const getFormattedTime = (): string => {
    if (option === "register") {
      return `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
    } else {
      return `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}:${currentTime.getSeconds().toString().padStart(2, '0')}`;
    }
  };

  // Función para obtener el título descriptivo del QR
  const getQRTitle = (): string => {
    if (option === "register") {
      return "QR de Registro";
    } else {
      return "QR de Acceso";
    }
  };

  // Función para obtener la descripción del QR
  const getQRDescription = (): string => {
    if (option === "register") {
      return "Vincula tu dispositivo con tu DNI";
    } else {
      return "Acceso rápido con dispositivo autorizado";
    }
  };

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

      {/* -------------- Información del tipo de QR ---------------- */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>{getQRTitle()}</Text>
        <Text style={styles.infoDescription}>{getQRDescription()}</Text>
        
        {/* Hora actual */}
        <View style={styles.timeContainer}>
          <Text style={styles.timeLabel}>
            {option === "register" ? "Hora de generación:" : "Hora exacta:"}
          </Text>
          <Text style={styles.timeValue}>{getFormattedTime()}</Text>
        </View>

        {/* Device ID */}
        {deviceId && (
          <View style={styles.deviceIdContainer}>
            <Text style={styles.deviceIdLabel}>Device ID:</Text>
            <Text style={styles.deviceIdValue} numberOfLines={1} ellipsizeMode="middle">
              {deviceId}
            </Text>
          </View>
        )}

        {/* DNI (solo para registro) */}
        {option === "register" && userDni && (
          <View style={styles.dniContainer}>
            <Text style={styles.dniLabel}>DNI:</Text>
            <Text style={styles.dniValue}>{userDni}</Text>
          </View>
        )}
      </View>

      {/* -------------- QR Code ---------------- */}
      <View style={styles.qrWrapper}>
        <View style={styles.qrcode}>
          {deviceId ? (
            <QRCodeSVG value={getQRData()} size={220} level="H" />
          ) : (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Cargando dispositivo...</Text>
            </View>
          )}
        </View>
      </View>

      {/* -------------- Instrucciones ---------------- */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>Instrucciones:</Text>
        
        {option === "register" ? (
          <>
            <Text style={styles.instructionsText}>
              • Contiene tu DNI y ID del dispositivo
            </Text>
            <Text style={styles.instructionsText}>
              • Úsalo para registrar tu dispositivo una vez
            </Text>
            <Text style={styles.instructionsText}>
              • Válido por 1 minuto
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.instructionsText}>
              • Contiene ID del dispositivo y hora exacta
            </Text>
            <Text style={styles.instructionsText}>
              • Úsalo para accesos rápidos
            </Text>
            <Text style={styles.instructionsText}>
              • Se actualiza cada 30 segundos
            </Text>
          </>
        )}
      </View>

      {/* -------------- Información de actualización ---------------- */}
      {option === "assistance" && (
        <View style={styles.updateInfoContainer}>
          <Text style={styles.updateInfoText}>
            ⚡ El QR se actualizará en: {30 - (currentTime.getSeconds() % 30)}s
          </Text>
        </View>
      )}

      <BottomGlobalNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

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

  title: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 42,
    fontWeight: "600",
    color: "#003A70",
  },

  infoContainer: {
    marginHorizontal: 20,
    marginTop: 15,
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#003A70",
    marginBottom: 5,
  },

  infoDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },

  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  timeLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },

  timeValue: {
    fontSize: 14,
    fontFamily: "monospace",
    color: "#38A0FF",
    fontWeight: "600",
  },

  deviceIdContainer: {
    marginTop: 5,
  },

  deviceIdLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
    marginBottom: 2,
  },

  deviceIdValue: {
    fontSize: 11,
    fontFamily: "monospace",
    color: "#333",
    backgroundColor: "#f1f3f4",
    padding: 4,
    borderRadius: 4,
  },

  dniContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },

  dniLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
    marginBottom: 2,
  },

  dniValue: {
    fontSize: 14,
    fontFamily: "monospace",
    color: "#28a745",
    fontWeight: "600",
  },

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

  loadingContainer: {
    width: 220,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
  },

  instructionsContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#e7f3ff",
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#38A0FF",
  },

  instructionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003A70",
    marginBottom: 5,
  },

  instructionsText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },

  updateInfoContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff3cd",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffeaa7",
  },

  updateInfoText: {
    fontSize: 12,
    color: "#856404",
    textAlign: "center",
    fontWeight: "500",
  },
});