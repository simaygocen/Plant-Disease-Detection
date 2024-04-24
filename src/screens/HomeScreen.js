import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Home</Text>
      <View>
        <Text style={styles.descriptionText}>Take a photo of</Text>
        <Text style={styles.descriptionText}>your plant</Text>
        <Text style={styles.descriptionText}>or upload an image</Text>
      </View>
      <View>
        <Image
          source={require("../../assets/down-arrow.png")}
          style={styles.arrow}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Image
            source={require("../../assets/upload.png")}
            style={styles.upload}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton}>
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
    justifyContent: "flex-start", // Yukarıya doğru hizalama
    alignItems: "center",
    marginTop: 150, // Sayfanın üstünden boşluk bırakma
  },
  arrow: {
    bottom: 100,
    right: 4,
    width: 100,
    height: 100,
  },
  welcomeText: {
    fontSize: 44,
    fontWeight: "bold",
    marginBottom: 240,
  },
  buttonContainer: {
    flexDirection: "row",
    bottom: 140,
  },
  circleButton: {
    backgroundColor: "green",
    padding: 50,
    borderRadius: 130,
    right: 30,
    top: 100,
  },
  camera: {
    width: 64,
    height: 64,
  },
  upload: {
    width: 64,
    height: 64,
    top: 150,
    right: 50,
  },
  descriptionText: {
    fontSize: 30,
    color: "black",
    paddingHorizontal: 20,
    textAlign: "left",
    bottom: 130,
    right: 30,
    fontWeight: "300",
  },
});
export default HomeScreen;
