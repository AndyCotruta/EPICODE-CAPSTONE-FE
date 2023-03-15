import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import QRCode from "react-native-qrcode-svg";
import { io } from "socket.io-client";
// import socket from "../utils/socket";
import { BE_URL } from "@env";

const socket = io(`${BE_URL}`, { transports: ["websocket"] });
// const socket = io(`http://localhost:3001`, { transports: ["websocket"] });

const SharedOrderScreen = (props) => {
  const receivedMessage = props.message;
  // const [receivedMessage, setReceivedMessage] = React.useState(null);
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
    socket.on("connected", (message) => {
      //   console.log(message);
      //   socket.emit("sendMessage", {
      //     message: "Hello Bamboo Bites",
      //   });
      socket.on("newMessage", (message) => {
        console.log(message);
        setReceivedMessage(message);
      });
    });
    // console.log(socket.connected);
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  return (
    <View style={styles.container}>
      {receivedMessage !== undefined && <Text>{receivedMessage.message}</Text>}
      <Button
        title="Send from Android"
        onPress={() => {
          socket.emit("sendMessage", {
            message: "Hello Bamboo Bites",
          });
        }}
      />
      <Button
        title="Open Camera"
        onPress={() => {
          setOpenCamera(true);
          socket.emit("sendMessage", {
            message: "Hello Bamboo Bites",
          });
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
