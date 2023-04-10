// // Store/Retrieve Files on Google Drive using React Native App
// // https://aboutreact.com/react-native-google-drive/
// import "react-native-gesture-handler";

// // Import React
// import React from "react";

// // Import Navigators from React Navigation
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

// // Import all the screens needed
// import GoogleLoginScreen from "./src/auth/GoogleLoginScreen";
// import HomeScreen from "./src/auth/HomeScreen";
// import GDUploadFileScreen from "./src/googleDrivescreens/GDUploadFileScreen";
// import GDFilesListingScreen from "./src/googleDrivescreens/GDFilesListingScreen";
// import GDSingleFileScreen from "./src/googleDrivescreens/GDSingleFileScreen";
// import GDDeleteFileScreen from "./src/googleDrivescreens/GDDeleteFileScreen";
// import GDDownloadFileScreen from "./src/googleDrivescreens/GDDownloadFileScreen";

// const Stack = createStackNavigator();

// export default function Gdriving() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="GoogleLoginScreen"
//         screenOptions={{
//           headerStyle: {
//             backgroundColor: "#f4511e", //Set Header color
//           },
//           headerTintColor: "#fff", //Set Header text color
//           headerTitleStyle: {
//             fontWeight: "bold", //Set Header text style
//           },
//         }}
//       >
//         <Stack.Screen
//           name="GoogleLoginScreen"
//           component={GoogleLoginScreen}
//           // Hiding header
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="HomeScreen"
//           component={HomeScreen}
//           options={{ title: "Google Drive Example" }}
//         />
//         <Stack.Screen
//           name="GDUploadFileScreen"
//           component={GDUploadFileScreen}
//           options={{ title: "Upload File" }}
//         />
//         <Stack.Screen
//           name="GDFilesListingScreen"
//           component={GDFilesListingScreen}
//           options={{ title: "Files" }}
//         />
//         <Stack.Screen
//           name="GDSingleFileScreen"
//           component={GDSingleFileScreen}
//           options={{ title: "File Content" }}
//         />
//         <Stack.Screen
//           name="GDDeleteFileScreen"
//           component={GDDeleteFileScreen}
//           options={{ title: "Delete File" }}
//         />
//         <Stack.Screen
//           name="GDDownloadFileScreen"
//           component={GDDownloadFileScreen}
//           options={{ title: "Download File" }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
