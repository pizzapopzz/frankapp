import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import XLSX from "xlsx";
import CardStack, { Card } from "react-native-card-stack-swiper";
import * as FileSystem from "expo-file-system";

export default function ExcelCardStack() {
  const [data, setData] = useState([]);

  const readExcelFile = async (filePath) => {
    const file = await FileSystem.readAsStringAsync(filePath, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const data = atob(file);
    const workbook = XLSX.read(data, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    setData(jsonData);
  };

  const handleImportFile = async () => {
    const fileUri = "G:/Shared drives/CAPSTONE/HARDWARE/please.xlsx"; // Replace with the file path
    await readExcelFile(fileUri);
  };

  return (
    <View style={styles.container}>
      <Button title="Import Excel File" onPress={handleImportFile} />
      <CardStack
        style={styles.cardStack}
        renderNoMoreCards={() => (
          <Text style={styles.noMoreCards}>No more cards</Text>
        )}
        ref={(swiper) => {
          this.swiper = swiper;
        }}
        onSwiped={() => console.log("onSwiped")}
        onSwipedLeft={() => console.log("onSwipedLeft")}
      >
        {data.map((item, index) => (
          <Card key={index} style={styles.card}>
            <Text style={styles.cardText}>{item.title}</Text>
          </Card>
        ))}
      </CardStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  cardStack: {
    alignSelf: "stretch",
  },
  card: {
    width: 300,
    height: 400,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  noMoreCards: {
    fontSize: 22,
  },
});
