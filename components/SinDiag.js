import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import FetchDiag from "./fetchdiag";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

export default function sinDiag() {
  const [value, setValue] = useState();
  useEffect(() => {
    let data = async () => {
      setValue(await FetchDiag());
    };
    data();
  }, []);
  if (!value) {
    return <ActivityIndicator size="large" animating={true} color="#6071EA" />;
  }
  return (
    <View style={styles.containerb}>
      <View style={{ paddingHorizontal: 20 }}></View>
      <View style={styles.containerBox}>
        <ScrollView>
          {value.map((files, index) => (
            <Card key={index} style={styles.container}>
              <Card.Content style={styles.content}>
                <Text style={styles.title}>Date:</Text>
                <Text style={styles.paragraph}>
                  {!files[0] ? "Not Given" : files[0]}
                </Text>
              </Card.Content>
              <Card.Content style={styles.content}>
                <Text style={styles.title}>Diagnosis:</Text>
                <Text style={styles.paragraph}>
                  {!files[1] ? "Not Given" : files[1]}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderWidth: 4,
    borderRadius: 20,
    backgroundColor: "#1F1458",
    borderColor: "#1F1458",
  },
  containerBox: {
    flex: 1,
    flexDirection: "column",
    borderRadius: 20,
    width: "80%",
    height: "100%",
    alignItems: "flex-start",
    // justifyContent: 'flex-start',
    // justifyContent: 'center',
    // flexDirection: 'row',
    backgroundColor: "rgba(244,245,255,0.8)",
    //'#F4F5FF',
    //'rgba(31,20,88,0.7)',
    //#1F1458',
    // alignContent: 'center',
  },
  containerb: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 0,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 15,
    color: "#FFFFFF",
  },
  paragraph: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  warning: {
    fontSize: 18,
    color: "#FF0000",
  },
  safe: {
    fontSize: 18,
    color: "#00FF00",
  },
});
