import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook


const { width, height } = Dimensions.get("window");
const HomeScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  const navigateToPredictScreen = () => {
    navigation.navigate("Predict"); // Navigate to PredictScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Home</Text>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>Take a photo of</Text>
        <Text style={styles.descriptionText}>your plant or</Text>
        <Text style={styles.descriptionText}>upload an image</Text>
      </View>
      <Image source={require("../../assets/next.png")} style={styles.arrow} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Image
            source={require("../../assets/upload.png")}
            style={styles.upload}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={navigateToPredictScreen} // Add onPress event
        >
          <Image
            source={require("../../assets/camera.png")}
            style={styles.camera}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },
  welcomeText: {
    fontSize: 0.08 * width,
    fontWeight: "bold",
    top: 0.1 * height,
    right: 0.08 * width,
  },
  lineContainer: {
    width: 0.23 * width,
    alignItems: "flex-start", // Changed to 'flex-start' to align left
    justifyContent: "space-around", // Adjust to space-between to manage spacing in smaller container
    flexDirection: "row",
    top: 0.13 * height,
    left: -0.24 * width, // Adjust this value to align the container to the left side as desired
  },
  line: {
    width: "30%", // Adjust width to fill container
    borderBottomWidth: 2,
    borderBottomColor: "green",
    borderBottomStyle: "dashed",
    marginHorizontal: 4,
  },
  descriptionContainer: {
    paddingHorizontal: 0.1 * width,
  },
  arrow: {
    width: 0.12 * width,
    height: 0.12 * width,
    top: 0.3 * height,
    marginBottom: 0.1 * height,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  circleButton: {
    backgroundColor: "green",
    padding: 0.12 * width,
    borderRadius: 0.3 * width,
    marginHorizontal: 0.05 * width,
    top: 0.3 * height,
    right: 0.06 * width,
  },
  camera: {
    width: 0.12 * width,
    height: 0.12 * width,
  },
  upload: {
    width: 0.12 * width,
    height: 0.12 * width,
    marginVertical: 0.1 * width,
    top: 0.313 * height,
    right: 0.07 * width,
  },
  descriptionText: {
    fontSize: 0.07 * width,
    color: "black",
    textAlign: "left",
    fontWeight: "300",
    top: 0.25 * height,
    right: 0.11 * width,
  },
});
export default HomeScreen;
