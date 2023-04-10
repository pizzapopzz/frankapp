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
import FetchData from "./FetchData";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

export default function Data() {
  const [value, setValue] = useState();
  useEffect(() => {
    let data = async () => {
      setValue(await FetchData());
    };
    data();
  }, []);
  if (!value) {
    return <ActivityIndicator size="large" animating={true} color="#6071EA" />;
  }

  return (
    <View style={styles.containerb}>
      <View style={{ paddingHorizontal: 20 }}>
        <LineChart
          data={{
            labels: value.map((item) => item[15]).reverse(),
            datasets: [
              {
                data: value.map((item) => item[4]).reverse(),
              },
            ],
          }}
          width={350} // from react-native
          height={245}
          yAxisSuffix="cm"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#1F1458",
            backgroundGradientFrom: "#1F1458",
            backgroundGradientTo: "#1F1480",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
              paddingHorizontal: 100, // add horizontal padding
              paddingBottom: 20, // add bottom padding
            },

            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            borderRadius: 16,
          }}
          verticalLabelRotation={25}
          xLabelsOffset={-10}
          fromZero={false}
        />
        <Text>{"\n"}</Text>
      </View>
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
                <Text style={styles.title}>Average Diameter:</Text>
                <Text style={styles.paragraph}>
                  {!files[4] ? "Not Provided" : files[4]}
                </Text>
              </Card.Content>
              <Card.Content style={styles.content}>
                <Text style={styles.title}>Past Month Growth:</Text>
                <Text style={styles.paragraph}>
                  {!files[6] ? "Not Provided" : files[6]}
                </Text>
              </Card.Content>
              <Card.Content style={styles.content}>
                <Text style={styles.title}>Avg. Monthly Growth:</Text>
                <Text style={styles.paragraph}>
                  {!files[7] ? "Not Provided" : files[7]}
                </Text>
              </Card.Content>
              <Card.Content style={styles.content}>
                {files[9] == 1 ? (
                  <Text style={styles.warning}>
                    {!files[8] ? "Not Provided" : files[8]}
                  </Text>
                ) : (
                  <Text style={styles.safe}>
                    {!files[8] ? "Not Provided" : files[8]}
                  </Text>
                )}
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
    paddingVertical: 20,
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
