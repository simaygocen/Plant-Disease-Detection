import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // veya istediğiniz ikon kütüphanesini kullanabilirsiniz

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Home</Text>
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
  welcomeText: {
    fontSize: 44,
    fontWeight: "bold",
    marginBottom: 240,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  circleButton: {
    backgroundColor: "green",
    padding: 50,
    borderRadius: 130,
    right: 30,
    top: 90,
  },
  camera: {
    width: 64,
    height: 64,
  },
  upload: {
    width: 64,
    height: 64,
    top: 145,
    right: 50,
  },
});
export default HomeScreen;
