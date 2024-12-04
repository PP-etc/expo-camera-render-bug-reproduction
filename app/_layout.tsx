import { View, Text, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { CameraView, useCameraPermissions } from "expo-camera";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [camera, setCamera] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        <View
          style={{
            padding: 20,
            backgroundColor: "#fff",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5, // Shadow for Android
          }}
        >
          <Text style={{ textAlign: "center" }}>
            We need your permission to show the camera
          </Text>
          <Button onPress={requestPermission} title="Grant camera permission" />
        </View>
      </View>
    );
  }

  return (
    <CameraView
      style={styles.camera}
      ref={(ref) => setCamera(ref as any)}
      responsiveOrientationWhenOrientationLocked={true}
    ></CameraView>
  );
}

//const squareSize = width * 0.8;
const styles = StyleSheet.create({
  camera: {
    flex: 1,
    backgroundColor: "red",
  },
});
