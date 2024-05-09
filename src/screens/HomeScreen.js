import { useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  Alert,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  let cameraRef = useRef();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status);
    })();
  }, []);

  if (hasCameraPermission === false) {
    return <Text>No access to the camera.</Text>;
  }
  if (hasGalleryPermission === false) {
    return <Text>No access to the gallery.</Text>;
  }

  const takePic = async () => {
    if (cameraRef.current) {
      try {
        let options = {
          quality: 1,
          base64: true,
          exif: false,
        };
        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
      } catch (error) {
        console.error("Error taking picture:", error);
        Alert.alert("Error", "Failed to take picture. Please try again.");
      }
    }
  };

  const openGallery = async () => {
    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        base64: true,
        exif: false,
        allowsEditing: true,
      });
      if (!pickerResult.canceled) {
        setPhoto(pickerResult);
      } else {
        console.log("Galeriden resim seçilmedi.");
      }
    } catch (error) {
      console.error("Error opening gallery:", error);
      Alert.alert("Error", "Failed to open gallery. Please try again.");
    }
  };

  const predict = async () => {
    try {
      const formData = new FormData();
      let fileUri;
      if (isCameraOpen) {
        fileUri = photo.uri;
      } else {
        fileUri = photo.assets[0].uri;
      }
      formData.append("file", {
        uri: fileUri,
        type: "image/jpeg",
        name: "photo.jpg",
      });

      /* SİMAY*/
      const response = await fetch('http://192.168.1.15:3000/predict', 
      {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      /* ELİF */
      /*const response = await fetch("http://192.168.1.9:3000/predict", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });*/

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      /*console.log(photo.uri)*/
      navigation.navigate("Predict", {
        photoUri: fileUri,
        prediction: data["class"],
      });
      console.log("Prediction:", data);
    } catch (error) {
      console.error("Prediction error:", error);
      Alert.alert("Error", "Failed to make prediction. Please try again.");
    }
  };

  let retake = () => {
    setPhoto(null);
  };

  const reupload = () => {
    setPhoto(null);
    openGallery();
  };

  return (
    <View style={styles.container}>
      {!isCameraOpen && !isGalleryOpen ? (
        <View>
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
          <Image
            source={require("../../assets/next.png")}
            style={styles.arrow}
          />
          <View style={styles.buttonContainer1}>
            <TouchableOpacity
              onPress={() => {
                setIsGalleryOpen(true), openGallery();
              }}
            >
              <Image
                source={require("../../assets/upload.png")}
                style={styles.upload}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={() => setIsCameraOpen(true)} // Add onPress event
            >
              <Image
                source={require("../../assets/camera.png")}
                style={styles.camera1}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          {isCameraOpen ? (
            <View style={styles.previewContainer}>
              {photo ? (
                <View>
                  {console.log(photo.uri)}
                  <Image style={styles.preview} source={{ uri: photo.uri }} />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={predict}
                      style={{
                        backgroundColor: "green",
                        borderRadius: 15,
                        padding: 15,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        Predict
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={retake}
                      style={{
                        backgroundColor: "green",
                        borderRadius: 15,
                        padding: 15,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        Retake
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <Camera style={styles.camera} ref={cameraRef}>
                  <TouchableOpacity
                    onPress={takePic}
                    style={{
                      backgroundColor: "green",
                      borderRadius: 15,
                      padding: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      top: 360,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Take Pic
                    </Text>
                  </TouchableOpacity>
                </Camera>
              )}
            </View>
          ) : (
            <View style={styles.previewContainer}>
              {photo ? (
                <View>
                  {console.log(photo.assets[0].uri)}
                  <Image
                    style={styles.preview}
                    source={{ uri: photo.assets[0].uri }}
                  />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={predict}
                      style={{
                        backgroundColor: "green",
                        borderRadius: 15,
                        padding: 15,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        Predict
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={reupload}
                      style={{
                        backgroundColor: "green",
                        borderRadius: 15,
                        padding: 15,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        Reupload
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                console.log("harika")
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = {
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
    right: 0.07 * width,
    left: -0.007 * width,
  },
  lineContainer: {
    width: 0.23 * width,
    alignItems: "flex-start", // Changed to 'flex-start' to align left
    justifyContent: "space-around", // Adjust to space-between to manage spacing in smaller container
    flexDirection: "row",
    top: 0.13 * height,
    left: -0.007 * width, // Adjust this value to align the container to the left side as desired
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
    left: 0.34 * width,
  },
  buttonContainer1: {
    flexDirection: "row",
  },
  upload: {
    width: 0.12 * width,
    height: 0.12 * width,
    marginVertical: 0.1 * width,
    top: 0.261 * height,
    right: 0.07 * width,
    left: 0.05 * width,
  },
  circleButton: {
    backgroundColor: "green",
    padding: 0.12 * width,
    borderRadius: 0.3 * width,
    marginHorizontal: 0.05 * width,
    top: 0.25 * height,
    right: 0.06 * width,
    left: 0.05 * width,
  },
  camera1: {
    width: 0.12 * width,
    height: 0.12 * width,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  preview: {
    width: 400,
    height: 400,
    borderRadius: 10,
    marginBottom: 20,
  },
  camera: {
    width: 400,
    height: 400,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 0.085 * width,
    color: "black",
    textAlign: "left",
    fontWeight: "300",
    top: 0.25 * height,
    left: -0.1 * width,
  },
};
