//import './App.css';

import { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import axios from "axios";

import { Platform, PermissionsAndroid } from "react-native";
import * as FileSystem from "expo-file-system";

async function requestStoragePermission() {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "App needs access to your external storage",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Storage permission granted.");
      } else {
        console.log("Storage permission denied.");
      }
    } catch (err) {
      console.warn(err);
    }
  } else {
    console.log("Storage permission not required on this platform.");
  }
}

export default function Flasking() {
  requestStoragePermission();
  const [advice, setAdvice] = useState("");

  const getRandomId = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  };

  const getAdvice = () => {
    axios.get("https://obscure-falls-53032.herokuapp.com/").then((response) => {
      setAdvice(response.data);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.advice}>{advice}</Text>
      <Button title="Get Advice" onPress={getAdvice} color="green" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  advice: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
});
