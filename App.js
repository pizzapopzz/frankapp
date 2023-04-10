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
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Button2 from "./components/Button2";
import ImageViewer from "./components/ImageViewer";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect, useRef } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { Camera, CameraType } from "expo-camera";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Pyodide from "./components/pyodide";
import { saveToCameraRoll } from "./screens/CameraView/helper";
import FastImage from "react-native-fast-image";

import axios from "axios";
import Flasking from "./components/flasking";
import Data from "./components/Data";
import Diag from "./components/diag";
import ExcelCardStack from "./components/ExcelCardStack";
import SinDiagAPI from "./components/fetchSingy";

import * as FileSystem from "expo-file-system";
import { Amplify, Storage } from "aws-amplify";
import awsExports from "./src/aws-exports";
Amplify.configure(awsExports);

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

/// NEW ATTEMPT
import { cropPicture, saveToCameraRoll2 } from "./screens/CameraView/helper";
import * as MediaLibrary from "expo-media-library";
// import { Navigation } from "react-native-navigation";
// import { Camera } from "expo-camera";
//import { CameraView } from "./screens/CameraView";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const bim = require("./assets/images/lightback.png");
const logo = require("./assets/images/newlogo2.png");
const prf = require("./assets/icons/2.png");
const cmr = require("./assets/icons/1.png");
const msr = require("./assets/icons/3.png");
const boxb = require("./assets/icons/box.png");
const PlaceholderImage = require("./assets/images/placeholder.png");
const mela = require("./assets/images/ISIC_9974166.jpg");
const danny = require("./assets/images/dannym.png");

const script = fetch("./components/main.py");
const MASK_DIMENSION = 325;

const fetchImageUri = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

// upload
const uploadFile = async (file) => {
  const imgg = await fetchImageUri(file.uri);
  //${Math.random()}
  return Storage.put(`melanoma-file.jpg`, imgg, {
    level: "public",
    contentType: file.type,
    progressCallback(uploadProgress) {
      console.log(
        "PROGRESS --",
        uploadProgress.loaded + "/" + uploadProgress.total
      );
    },
  })
    .then((res) => {
      Storage.get(res.key)
        .then((result) => {
          console.log("RESULT ---- ", result);
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => {
      console.log(e);
    });
};

const HomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    // 'Jumper': require('./assets/fonts/jumper/Jumper.ttf'),
    JumperBI: require("./assets/fonts/jumper/JumperPERSONALUSEONLY-BlackItalic.ttf"),
    cvI: require("./assets/fonts/coolvetica/coolvetica.ttf"),
    cvIL: require("./assets/fonts/coolvetica/CoolveticaLt-Regular.ttf"),
    CVR: require("./assets/fonts/coolvetica/CoolveticaLt-Regular.ttf"),
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
          <Image
            source={logo}
            style={{
              height: 290,
              width: 290,
              alignSelf: "center",
              padding: -1,
            }}
          />
          <View style={styles.containerb}>
            <View style={styles.containerBox}>
              <Button2
                theme="secondary"
                label="PROFILE"
                onPress={() => navigation.navigate("Profile", { name: "Jane" })}
                icon={prf}
                description="See profile information"
              />
              <Button2
                theme="secondary"
                label="DIAGNOSTIC TOOL"
                onPress={() => navigation.navigate("Instructions")}
                icon={cmr}
                description="Scan a Photo of your lesion"
              />

              <Button2
                theme="secondary"
                label="MEASUREMENTS"
                onPress={() => navigation.navigate("Measurements")}
                icon={msr}
                description="See device measurement results"
              />
            </View>
          </View>
        </View>
        <View>
          <Text>{"\n\n\n\n\n\n\n\n\n\n"}</Text>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
};

const UpIm = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    // 'Jumper': require('./assets/fonts/jumper/Jumper.ttf'),
    JumperBI: require("./assets/fonts/jumper/JumperPERSONALUSEONLY-BlackItalic.ttf"),
    // 'cvI': require('./assets/fonts/coolvetica/coolveticarg.otf'),
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
const Msrr = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    // 'Jumper': require('./assets/fonts/jumper/Jumper.ttf'),
    JumperBI: require("./assets/fonts/jumper/JumperPERSONALUSEONLY-BlackItalic.ttf"),
    // 'cvI': require('./assets/fonts/coolvetica/coolveticarg.otf'),
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
          <Text
            style={{
              fontFamily: "cvI",
              fontSize: 50,
              color: "#1F1458",
              textAlign: "center",
              lineHeight: 0.1,
              paddingTop: 60,
            }}
          >
            Results
          </Text>
          {/* <Data /> */}
          <Data />
          <Text>{"\n\n"}</Text>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
};

const Diagnoses = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    // 'Jumper': require('./assets/fonts/jumper/Jumper.ttf'),
    JumperBI: require("./assets/fonts/jumper/JumperPERSONALUSEONLY-BlackItalic.ttf"),
    // 'cvI': require('./assets/fonts/coolvetica/coolveticarg.otf'),
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
          <Text
            style={{
              fontFamily: "cvI",
              fontSize: 50,
              color: "#1F1458",
              textAlign: "center",
              lineHeight: 0.1,
              paddingTop: 60,
              marginBottom: 10,
            }}
          >
            {"Diagnostics:\n"}
          </Text>
          <Diag />
          <Text>{"\n\n"}</Text>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
};

const ProfileScreen = ({ navigation, route }) => {
  const [fontsLoaded] = useFonts({
    // 'Jumper': require('./assets/fonts/jumper/Jumper.ttf'),
    JumperBI: require("./assets/fonts/jumper/JumperPERSONALUSEONLY-BlackItalic.ttf"),
    CVR: require("./assets/fonts/coolvetica/CoolveticaLt-Regular.ttf"),
    // 'cvI': require('./assets/fonts/coolvetica/coolveticarg.otf'),
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
            <View style={styles.containerBox}>
              <Text
                style={{
                  fontFamily: "cvI",
                  fontSize: 50,
                  color: "#1F1458",
                  textAlign: "center",
                  lineHeight: 0.1,
                  paddingTop: 50,
                  paddingLeft: 0,
                  textDecorationLine: "underline",
                  alignSelf: "center",
                }}
              >
                {" "}
                Profile
              </Text>
              <Image source={danny} style={styles.profileimage} />
              <SafeAreaView style={{ flex: 1 }}>
                <View style={{ padding: 20, alignItems: "flex-start" }}>
                  <Text style={{ padding: 5 }}>
                    <Text style={styles.profiletit}>Name: </Text>
                    <Text style={styles.profiletext}>Danny Moriana </Text>
                  </Text>
                  <Text style={{ padding: 5 }}>
                    <Text style={styles.profiletit}>Date of Birth: </Text>
                    <Text style={styles.profiletext}>05/06/2000 </Text>
                  </Text>
                  <Text style={{ padding: 5 }}>
                    <Text style={styles.profiletit}>Skin Type: </Text>
                    <Text style={styles.profiletext}>
                      II (Burns easily, tans minimally){" "}
                    </Text>
                  </Text>
                  <Text style={{ padding: 5 }}>
                    <Text style={styles.profiletit}>Occupation: </Text>
                    <Text style={styles.profiletext}>Student </Text>
                  </Text>
                  <Text style={{ padding: 5 }}>
                    <Text style={styles.profiletit}>Lesion Location: </Text>
                    <Text style={styles.profiletext}>Upper Left Shoulder </Text>
                  </Text>
                </View>
              </SafeAreaView>
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
const LoadFiles = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { image } = route.params;

  const [prediction, setPrediction] = useState(null);
  // "ngrok-skip-browser-warning": "69420",

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      SinDiagAPI()
        .then((data) => {
          setData(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 3500);
    return () => clearTimeout(timeout);
  }, []);
  // console.log(image);
  const [data, setData] = useState([]);

  return (
    <View style={styles.container}>
      <ImageBackground source={bim} style={styles.image}>
        <View style={styles.Titles}>
          <Text>{"\n"}</Text>
          <Text
            style={{
              fontFamily: "cvI",
              fontSize: 50,
              color: "#1F1458",
              textAlign: "center",
              lineHeight: 50,
              paddingBottom: 10,
            }}
          >
            Prediction Analysis
          </Text>
          <Image
            source={{ uri: image }}
            style={{
              width: 300,
              height: 300,
              alignSelf: "center",
              marginLeft: 10,
            }}
          />
          <View style={{ marginLeft: 20, marginTop: 0 }}>
            <Button2
              theme="terto"
              label="Take Another Photo"
              onPress={() => navigation.navigate("CameraView")}
            />
          </View>
          <View style={styles.containerb}>
            <View style={styles.containerBox2}>
              {/* <Text>{"\n\n"}</Text> */}
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#0000ff" />
                  <Text style={{ padding: 10 }}>
                    <Text style={styles.profiletit}>Prediction Loading </Text>
                    <Text style={styles.profiletext}>
                      {" \n"}
                      Your prediction is being calculated by the Deep Learning
                      Model{" "}
                    </Text>
                  </Text>
                </View>
              ) : (
                <View style={{ width: "100%", marginLeft: 5, padding: 15 }}>
                  <Text style={styles.profiletit2}>Prediction:</Text>
                  <View>
                    {data.map((row, index) => (
                      <View key={index}>
                        {row.map((col, i) => (
                          <Text key={i} style={styles.predtext}>
                            {col} {"\n"}
                          </Text>
                        ))}
                      </View>
                    ))}
                  </View>
                  <Button2
                    theme="quart2"
                    label=" See History"
                    onPress={() => navigation.navigate("Diagnoses")}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
};

const MDR = ({ navigation, route }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const [fontsLoaded] = useFonts({
    // 'cvI': require('./assets/fonts/coolvetica/coolveticarg.otf'),
    // 'cvIL': require('./assets/fonts/coolvetica/CoolveticaLt-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  // // upload img
  // const fetchImageUri = async (uri) => {
  //   const response = await fetch(uri);
  //   const blob = await response.blob();
  //   return blob;
  // };

  // // upload
  // const uploadFiler = async (file) => {
  //   const imgg = await fetchImageUri(file.uri);
  //   //${Math.random()}
  //   return Storage.put(`melanoma-file.jpg`, imgg, {
  //     level: "public",
  //     contentType: file.type,
  //     progressCallback(uploadProgress) {
  //       console.log(
  //         "PROGRESS --",
  //         uploadProgress.loaded + "/" + uploadProgress.total
  //       );
  //     },
  //   })
  //     .then((res) => {
  //       Storage.get(res.key)
  //         .then((result) => {
  //           console.log("RESULT ---- ", result);
  //         })
  //         .catch((e) => {
  //           console.log(e);
  //         });
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const pickImageAsync = async () => {
    console.log("1");
    let rex = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    try {
      if (!rex.canceled) {
        setSelectedImage(rex.assets[0].uri);
        saveToCameraRoll2(rex.assets[0].uri);
        console.log("2");
        uploadFile(rex.assets[0]);
      } else {
        alert("You did not select any image.");
        console.log("3");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.containerfil}>
      <View style={styles.Titles} onLayout={onLayoutRootView}>
        <Text
          style={{
            fontFamily: "cvI",
            fontSize: 50,
            color: "#1F1458",
            textAlign: "center",
            paddingTop: 0,
          }}
        >
          {"\n\n"}Upload Image
        </Text>
        <Text
          style={{
            fontFamily: "cvIL",
            fontSize: 25,
            color: "#1F1458",
            textAlign: "center",
          }}
        >
          {" "}
          *Remember this tool is only for self monitoring and does not serve as
          a substitite for medical care
        </Text>
      </View>
      <View style={styles.centered} onLayout={onLayoutRootView}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
        {/* <Button2
          theme="secondary"
          label="Proceed With Image"
          onPress={() => navigation.navigate("EvaluationView", selectedImage)}
          description="Proceed to Diagnostic Tool"
        /> */}
        <Button2
          theme="primary"
          label="Upload Photo"
          onPress={pickImageAsync}
        />
        <Text style={{ lineHeight: 0.1 }}>{"\n"}</Text>
        <Button2
          theme="tertiary"
          label="Take Photo"
          onPress={() => navigation.navigate("CameraView")}
        />
        <Text style={{ lineHeight: 0.1 }}>{"\n"}</Text>
        <Button2
          theme="quart"
          label=" Proceed With Image"
          onPress={() =>
            navigation.navigate("Prediction Analysis", { image: selectedImage })
          }
          // disabled={!selectedImage}
        />
        <Text>{"\n\n\n\n\n\n\n\n"}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const CameraViews = ({ navigation, route }) => {
  // const MASK_DIMENSION = 250;
  const [hasPermission, setHasPermission] = useState(null);
  const [showShutterButton, setShowShutterButton] = useState(false);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const cameraRef = useRef();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      const { status2 } = await MediaLibrary.requestPermissionsAsync();
      requestPermission(status2 === "granted");
    })();
  }, []);

  const handlePictureProcessing = async () => {
    const imageData = await takePicture();
    const croppedData = await cropPicture(imageData, MASK_DIMENSION);
    //goToEvaluationView(croppedData);

    saveToCameraRoll2(croppedData.uri);
    console.log(croppedData.uri);
    uploadFile(croppedData);

    setTimeout(() => {
      navigation.navigate("Prediction Analysis", { image: croppedData.uri });
    }, 3000);

    return (
      <Button2
        theme="secondary"
        label="Evaluate"
        //onPress={goToEvaluationView(croppedData)}
      />
    );
  };

  const takePicture = async () => {
    const options = {
      quality: 1,
      fixOrientation: true,
    };
    try {
      return await cameraRef.current.takePictureAsync(options);
    } catch (error) {
      console.log("Could not take photo", error);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text> No access to camera </Text>;
  }
  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <Camera
          ref={cameraRef}
          type={Camera.Constants.Type.back}
          whiteBalance={Camera.Constants.WhiteBalance.auto}
          onCameraReady={() => setShowShutterButton(true)}
        >
          <View style={styles.cameraView}>
            <View style={styles.mask} />
            {showShutterButton && (
              <TouchableOpacity
                style={styles.shutterButton}
                onPress={handlePictureProcessing}
              >
                <Text style={styles.shutterButtonText}>Take a picture</Text>
              </TouchableOpacity>
            )}
          </View>
        </Camera>
      </SafeAreaView>
    </React.Fragment>
  );
};

CameraViews.options = {
  statusBar: {
    backgroundColor: null,
  },
  topBar: {
    title: {
      text: "Take a picture",
      color: "white",
    },
    background: {
      color: "#4d089a",
    },
  },
  tapBar: {
    background: {
      color: "#4d089a",
    },
  },
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="MDR"
          component={MDR}
          options={{ title: "Diagnostic Tool" }}
        />
        <Stack.Screen
          name="Instructions"
          component={UpIm}
          options={{ title: "Instructions" }}
        />
        <Stack.Screen
          name="Measurements"
          component={Msrr}
          options={{ title: "Measurements" }}
        />
        {/* <Stack.Screen name="Tens" component={Tens} options={{ title: 'Deep Learning' }} /> */}
        <Stack.Screen
          name="CameraView"
          component={CameraViews}
          options={{ title: "Take Photo" }}
        />
        <Stack.Screen
          name="Diagnoses"
          component={Diagnoses}
          options={{ title: "Diagnoses" }}
        />
        <Stack.Screen
          name="Prediction Analysis"
          component={LoadFiles}
          options={{ title: "LoadFiles" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerfil: {
    flex: 1,
    backgroundColor: "#E0E5FF",
  },
  containerb: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 40,
  },
  containerBox: {
    flex: 1,
    flexDirection: "column",
    borderRadius: 20,
    width: "80%",
    height: "100%",
    alignItems: "flex-start",
    paddingBottom: 20,
    backgroundColor: "rgba(244,245,255,0.8)",
  },
  containerBox2: {
    flex: 1,
    flexDirection: "column",
    borderRadius: 20,
    width: "80%",
    height: "80%",
    alignItems: "center",
    paddingBottom: 20,
    // justifyContent: 'flex-start',
    // justifyContent: 'center',
    // flexDirection: 'row',
    backgroundColor: "rgba(244,245,255,0.8)",
    //'#F4F5FF',
    //'rgba(31,20,88,0.7)',
    //#1F1458',
    // alignContent: 'center',
  },
  Titles: {
    flex: 1,
    flexDirection: "column",
    PaddingTop: 100,
    paddingHorizontal: 10,
  },
  centered: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  image2: {
    resizeMode: "cover",
    justifyContent: "center",
  },
  profileimage: {
    resizeMode: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 200,
    height: 200,
    marginLeft: 0,
  },
  text: {
    color: "#FFDE59",
    fontFamily: "Jumper",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
  },
  profiletit: {
    fontFamily: "cvI",
    fontSize: 20,
    color: "#1F1458",
    textAlign: "center",
  },
  profiletext: {
    fontFamily: "CVR",
    fontSize: 20,
    color: "#1F1458",
    textAlign: "center",
  },
  predtext: {
    fontFamily: "CVR",
    fontSize: 20,
    color: "#1F1458",
    textAlign: "center",
  },
  profiletit2: {
    fontFamily: "cvI",
    fontSize: 35,
    color: "#1F1458",
    textAlign: "center",
  },
  profiletext2: {
    fontFamily: "CVR",
    fontSize: 20,
    color: "#1F1458",
    textAlign: "center",
  },
  safeArea: {
    backgroundColor: "#4d089a",
  },
  cameraView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  mask: {
    height: MASK_DIMENSION,
    width: MASK_DIMENSION,
    borderWidth: 3,
    borderColor: "white",
    borderStyle: "dotted",
    borderRadius: 15,
  },
  shutterButton: {
    position: "absolute",
    bottom: 0,
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
    marginBottom: 20,
  },
  shutterButtonText: {
    fontSize: 18,
    color: "white",
  },
});
