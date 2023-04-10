import { StyleSheet, View, Pressable, Text, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
SplashScreen.preventAutoHideAsync();

export default function Button2({ label, theme, onPress, icon, description }) {
  const [fontsLoaded] = useFonts({
    // 'Jumper': require('./assets/fonts/jumper/Jumper.ttf'),
    JumperBI: require(".././assets/fonts/jumper/JumperPERSONALUSEONLY-BlackItalic.ttf"),
    cvI: require(".././assets/fonts/coolvetica/coolvetica.ttf"),
    cvIL: require(".././assets/fonts/coolvetica/CoolveticaLt-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (theme === "primary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={onPress}
        >
          <FontAwesome
            name="picture-o"
            paddingTop={10}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text
            style={[
              styles.buttonLabel,
              { color: "#25292e", fontFamily: "cvI" },
            ]}
          >
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }

  if (theme === "tertiary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={onPress}
        >
          <FontAwesome
            name="camera"
            paddingTop={10}
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text
            style={[
              styles.buttonLabel,
              { color: "#25292e", fontFamily: "cvI" },
            ]}
          >
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }
  if (theme === "terto") {
    return (
      <View
        style={[
          styles.buttonContainer,
          // { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
        ]}
      >
        <Pressable
          style={[styles.terbutto, { backgroundColor: "#ffd33d" }]}
          onPress={onPress}
        >
          <FontAwesome
            name="camera"
            paddingTop={10}
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text
            style={[
              styles.buttonLabel,
              { color: "#25292e", fontFamily: "cvI" },
            ]}
          >
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }
  if (theme === "tertiarysm") {
    return (
      <View
        style={[
          styles.buttonContainersm,
          { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
        ]}
      >
        <Pressable
          style={[styles.buttonsm, { backgroundColor: "#fff" }]}
          onPress={onPress}
        >
          <FontAwesome
            name="camera"
            paddingTop={10}
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text
            style={[
              styles.buttonLabel,
              { color: "#25292e", fontFamily: "cvI" },
            ]}
          >
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }

  if (theme === "secondary") {
    return (
      <View style={[styles.buttonContainer2]}>
        <Text>{"                     \n"}</Text>
        <Pressable style={[styles.button2]} onPress={onPress}>
          <Image
            source={icon}
            fadeDuration={0}
            style={{ width: 60, height: 60, alignSelf: "center" }}
          />
          <Text
            style={{
              fontFamily: "cvI",
              fontSize: 30,
              color: "#1F1458",
              lineHeight: 20,
            }}
          >
            {"\n\t"} {label}
            <Text style={[styles.descr]}>
              {"\n \t"} {description}
            </Text>
          </Text>
        </Pressable>
      </View>
    );
  }
  if (theme === "quart") {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 0, borderColor: "#1F1458", borderRadius: 0 },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "rgba(31, 20, 88, 0.3)" }]}
          onPress={onPress}
        >
          <Ionicons name="ios-scan-circle" size={35} color="#1f1458" />
          <Text
            style={[
              styles.buttonLabel,
              { color: "#1f1458", fontFamily: "cvI" },
            ]}
          >
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }
  if (theme === "quart2") {
    return (
      <View
        style={[
          styles.fitinbox,
          { borderWidth: 0, borderColor: "#1F1458", borderRadius: 0 },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "rgba(31, 20, 88, 0.3)" }]}
          onPress={onPress}
        >
          <Ionicons name="ios-scan-circle" size={35} color="#1f1458" />
          <Text
            style={[
              styles.buttonLabel,
              { color: "#1f1458", fontFamily: "cvI" },
            ]}
          >
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 3,
  },

  fitinbox: {
    width: "80%",
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginHorizontal: 30,
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#FFDE59",
    alignContent: "center",
  },

  terbutto: {
    borderRadius: 10,
    width: "80%",
    height: "75%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#ffd33d",
    alignContent: "center",
  },

  buttonContainersm: {
    width: "175%",
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 3,
  },
  buttonsm: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#FFDE59",
    alignContent: "center",
  },
  buttonIcon: {
    paddingRight: 10,
    paddingBottom: 10,
  },
  buttonLabel: {
    color: "#1F1458",
    fontSize: 22,
  },

  // HOME SCREEN BUTTONS
  buttonContainer2: {
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    flexDirection: "row",
    marginLeft: -20,
  },

  button2: {
    borderRadius: 100,
    width: "100%",
    height: "75%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingRight: 75,
    //backgroundColor:F1C232',
    // backgroundColor: 'rgba(31,20,88,0.9)',
  },
  buttonLabel2: {
    fontFamily: "cvI",
    fontSize: 30,
    fontWeight: "bold",
  },
  descr: {
    color: "#6071EA",
    fontSize: 16,
    fontWeight: "bold",
  },
});
