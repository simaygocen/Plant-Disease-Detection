import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, Modal, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);

  const plants = [
    {
      name: "Cedar Apple Rust",
      images: [require("../../assets/cedarr.jpg")],
      description: "Cedar apple rust is a fungal disease affecting apple and cedar trees. It spreads through spores from cedar to apple trees, causing yellow-orange spots on leaves and fruit.\n\n Treatment Suggestion: Remove nearby cedar trees, choose resistant apple varieties, and apply fungicides when needed."
    },
    {
      name: "Apple Black Rot",
      images: [require("../../assets/blackrot.jpeg")],
      description: "Apple black rot is a fungal disease that affects apple trees, caused by the fungus Botryosphaeria obtusa. It commonly appears during wet weather conditions. Infected fruit shows characteristic brown, sunken lesions, while leaves may develop dark spots with concentric rings. \n\n Treatment Suggestion: practice good sanitation by removing infected fruit and leaves, ensure proper air circulation around trees, and apply fungicides preventively during the growing season."
    },
    {
      name: "Apple Scab",
      images: [require("../../assets/scab.png")],
      description: "Apple scab is a fungal disease caused by Venturia inaequalis that affects apple trees. It manifests as olive-green to black lesions on leaves and fruit, leading to defoliation and reduced fruit quality. \n\n Treatment Suggestion:  practice good sanitation by removing fallen leaves and fruit, use resistant apple varieties, apply fungicides preventively, and ensure proper tree spacing for adequate air circulation."
    },
  ];

  const handlePlantPress = (name) => {
    setSelectedDisease(name);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plant Diseases</Text>
      <ScrollView style={styles.plantsContainer}>
        {plants.map((plant, index) => (
          <TouchableOpacity key={index} style={styles.plantItem} onPress={() => handlePlantPress(plant)}>
            {plant.images.map((image, imageIndex) => (
              <Image key={`${plant.name}_${imageIndex}`} source={image} style={styles.plantImage} />
            ))}
            <Text style={styles.plantText}>{plant.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedDisease?.name}</Text>
            <Text style={styles.diseaseDescription}>{selectedDisease?.description}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 70,
    marginBottom: 30,
  },
  plantsContainer: {
    paddingHorizontal: 10,
  },
  plantItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 25,
    marginVertical: 8,
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  plantImage: {
    width: 85,
    height: 85,
    borderRadius: 25,
    marginRight: 10,
  },
  plantText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  diseaseDescription: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    fontSize: 18,
    color: "blue",
  },
});

export default App;
