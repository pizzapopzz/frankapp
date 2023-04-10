

import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
  const imageSource = selectedImage !== null
    ? { uri: selectedImage }
    : placeholderImageSource;
  return (
    <Image source={imageSource} style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center'
  },
});