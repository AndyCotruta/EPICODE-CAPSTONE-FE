import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import QRCode from "react-native-qrcode-svg";

const SharedOrderScreen = () => {
  const [openCamera, setOpenCamera] = React.useState(false);
  const [hasPermission, setHasPermission] = React.useState(false);
  const [scanData, setScanData] = React.useState(null);
  const [complexObj, setComplexObj] = React.useState({
    name: "Andy",
    email: "test@email.com",
  });

  //   if (!hasPermission) {
  //     return (
  //       <View style={styles.container}>
  //         <Text>Please grant camera permissions to app.</Text>
  //       </View>
  //     );
  //   }

  //   {
  //     name:"Andy",
  //     email:"test@email.com"
  //   }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanData(data);
    console.log(`Data: `, JSON.parse(data));
    console.log(`Type: ${type}`);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Open Camera"
        onPress={() => {
          setOpenCamera(true);
        }}
      />
      <QRCode value={JSON.stringify(complexObj)} />

      {openCamera && (
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
        />
      )}

      {/* {scanData && (
        <Button title="Scan Again?" onPress={() => setScanData(undefined)} />
      )} */}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SharedOrderScreen;
