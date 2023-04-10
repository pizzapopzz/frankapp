import React, { useState, useRef, useEffect } from "react";
import { cropPicture, saveToCameraRoll } from "./helper";
import Button2 from "../.././components/Button2";
import * as MediaLibrary from "expo-media-library";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Navigation } from "@react-navigation/native";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
} from "react-native";
// import { Navigation } from "react-native-navigation";
import { Camera } from "expo-camera";
const MASK_DIMENSION = 250;
const mela = require("../.././assets/images/ISIC_9974166.jpg");

export const CameraView = (props) => {
  const MASK_DIMENSION = 100;
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

    await saveToCameraRoll2(croppedData.uri);
    // we don't want to go to the evaluation view now
    // goToEvaluationView(croppedData);
    navigation.navigate("LoadFiles", { image: croppedData });
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
const styles = {
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
};
CameraView.options = {
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
