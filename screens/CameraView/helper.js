import { Dimensions } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import * as ImageManipulator from "expo-image-manipulator";
//import CameraRoll from "@react-native-community/cameraroll";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
const { height: DEVICE_HEIGHT, width: DEVICE_WIDTH } = Dimensions.get("window");
// got the dimension from the trained data of the *Teachable Machine*; pixel resolution conversion (8x)
export const BITMAP_DIMENSION = 224;

export const cropPicture = async (imageData, maskDimension) => {
  try {
    const { uri, width, height } = imageData;
    const cropWidth = maskDimension * (width / DEVICE_WIDTH);
    const cropHeight = maskDimension * (height / DEVICE_HEIGHT);
    const actions = [
      {
        crop: {
          originX: width / 2 - cropWidth / 2,
          originY: height / 2 - cropHeight / 2,
          width: cropWidth,
          height: cropHeight,
        },
      },
      {
        resize: {
          width: BITMAP_DIMENSION,
          height: BITMAP_DIMENSION,
        },
      },
    ];
    const saveOptions = {
      compress: 1,
      format: ImageManipulator.SaveFormat.JPEG,
      base64: false,
    };
    return await ImageManipulator.manipulateAsync(uri, actions, saveOptions);
  } catch (error) {
    console.log("Could not crop & resize photo", error);
  }
};
export const saveToCameraRoll2 = async (uri) => {
  const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  if (perm.status != "granted") {
    return;
  }

  try {
    const asset = await MediaLibrary.createAssetAsync(uri);
    const album = await MediaLibrary.getAlbumAsync("React");
    if (album == null) {
      await MediaLibrary.createAlbumAsync("React", asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }
  } catch (e) {
    console.log(e);
  }
};
