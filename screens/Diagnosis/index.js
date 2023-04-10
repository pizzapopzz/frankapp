import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Fragment,
} from "react-native";
import Button2 from "../.././components/Button2";
import ImageViewer from "../.././components/ImageViewer";
import flasking from "../../components/flasking";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";

// import RunModel from './components/runModel';
import { Navigation } from "react-native-navigation";

import * as FileSystem from "expo-file-system";

export const Diagnosis = (props) => {
  const [fontsLoaded] = useFonts({
    // 'Jumper': require('../../assets/fonts/jumper/Jumper.ttf'),
    JumperBI: require("../.././assets/fonts/jumper/JumperPERSONALUSEONLY-BlackItalic.ttf"),
    // 'cvI': require('../../assets/fonts/coolvetica/coolveticarg.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={bim} style={styles.image}>
        <View style={styles.Titles} onLayout={onLayoutRootView}>
          <View style={styles.containerb}>
            <Text>{"\n\n"}</Text>
            <flasking></flasking>
            <View style={styles.containerBox}>
              <Text
                style={{
                  fontFamily: "cvI",
                  fontSize: 50,
                  color: "#1F1458",
                  textAlign: "center",
                  lineHeight: 0.1,
                  paddingTop: 50,
                  paddingLeft: 35,
                  textDecorationLine: "underline",
                }}
              >
                {" "}
                Instructions
              </Text>
              <SafeAreaView style={{ flex: 1 }}>
                <View style={{ padding: 20, alignItems: "flex-start" }}>
                  <FlatList
                    data={[
                      { key: "Make sure image is centered" },
                      {
                        key: "Please shave area of any hair before taking the photo",
                      },
                      { key: "Try to take image on plain background" },
                      {
                        key: "If the lesion is in a hard to reach area, please ask someone to take the photo for you",
                      },
                      { key: "Ensure the room is well lit" },
                      {
                        key: "Please retake the picture if it is blurry or contains motion artifacts",
                      },
                    ]}
                    renderItem={({ item }) => {
                      return (
                        <View style={{ marginBottom: 10 }}>
                          <Text
                            style={{ fontSize: 17, paddingLeft: 20 }}
                          >{`\u2022 ${item.key}`}</Text>
                        </View>
                      );
                    }}
                  />
                </View>
              </SafeAreaView>
              <Button2
                theme="secondary"
                label="Continue"
                onPress={() => navigation.navigate("MDR")}
                icon={cmr}
                description="Proceed to Diagnostic Tool"
              />
            </View>
          </View>
        </View>
        <View>
          <Text>{"\n\n\n\n\n\n\n\n\n\n\n\n"}</Text>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   containerfil: {
//     flex: 1,
//     backgroundColor: "#E0E5FF",
//   },
//   containerb: {
//     flex: 1,
//     alignItems: "center",
//   },
//   containerBox: {
//     flex: 1,
//     flexDirection: "column",
//     borderRadius: 20,
//     width: "80%",
//     height: "100%",
//     alignItems: "flex-start",
//     // justifyContent: 'flex-start',
//     // justifyContent: 'center',
//     // flexDirection: 'row',
//     backgroundColor: "rgba(244,245,255,0.8)",
//     //'#F4F5FF',
//     //'rgba(31,20,88,0.7)',
//     //#1F1458',
//     // alignContent: 'center',
//   },
//   containerBox2: {
//     flex: 1,
//     flexDirection: "column",
//     borderRadius: 20,
//     width: "80%",
//     height: "100%",
//     alignItems: "center",
//     // justifyContent: 'flex-start',
//     // justifyContent: 'center',
//     // flexDirection: 'row',
//     backgroundColor: "rgba(244,245,255,0.8)",
//     //'#F4F5FF',
//     //'rgba(31,20,88,0.7)',
//     //#1F1458',
//     // alignContent: 'center',
//   },
//   Titles: {
//     flex: 1,
//     flexDirection: "column",
//     PaddingTop: 100,
//     paddingHorizontal: 10,
//   },
//   centered: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "center",
//   },
//   image2: {
//     resizeMode: "cover",
//     justifyContent: "center",
//   },
//   text: {
//     color: "#FFDE59",
//     fontFamily: "Jumper",
//     fontSize: 42,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   footerContainer: {
//     flex: 1 / 3,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 1,
//   },
// });
