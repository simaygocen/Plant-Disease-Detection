import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Text,
  Image,
} from "react-native";

const { width, height } = Dimensions.get("window");

const App = () => {
  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/logo2.png")}
          style={[styles.logo, { width: width * 0.8 }]} // Genişliği cihaz genişliğinin %80'i olarak ayarla
          resizeMode="contain"
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>johndoe@example.com</Text>
        <Text style={styles.phone}>123-456-7890</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  logo: {
    height: 200,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
  },
  phone: {
    fontSize: 18,
  },
});

export default App;
