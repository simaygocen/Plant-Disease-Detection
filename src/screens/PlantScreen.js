import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

const App = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const plants = [
    {
      name: "Plant 1",
      images: [require("../../assets/cedarr.jpg")],
    },
    {
      name: "Plant 2",
      images: [require("../../assets/blackrot.jpeg")],
    },
    {
      name: "Plant 3",
      images: [require("../../assets/scab.png")],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{activeFilter} Plants</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Image
            style={styles.search}
            source={require("../../assets/search.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["All", "Healthy", "Apple Scab", "Black Rot", "Apple Cedar"].map(
            (filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  activeFilter === filter && styles.activeButton,
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  style={[
                    styles.text,
                    activeFilter === filter && styles.activeText,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </View>
      <ScrollView style={styles.plantsContainer}>
        {plants.map((plant) => (
          <View key={plant.name} style={styles.plantItem}>
            {plant.images.map((image, index) => (
              <Image
                key={`${plant.name}_${index}`}
                source={image}
                style={styles.plantImage}
              />
            ))}
            <Text style={styles.plantText}>{plant.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0.05 * width,
    paddingTop: 0.2 * width,
  },
  headerTitle: {
    fontSize: 0.055 * width,
    fontWeight: "bold",
    marginBottom: 0.012 * height,
  },
  searchButton: {
    padding: 10,
  },
  search: {
    width: 20,
    height: 20,
  },
  filterContainer: {
    flexDirection: "row",
    marginVertical: 0.025 * width,
  },
  filterButton: {
    marginRight: 0.025 * width,
    padding: 0.012 * height,
    borderWidth: 1,
    borderColor: "#eeeeee",
    borderRadius: 0.03 * width,
    backgroundColor: "#ececec",
    left: 0.04 * width,
    right: 0.04 * width,
  },
  activeButton: {
    backgroundColor: "#4CAF50",
  },
  plantsContainer: {
    paddingHorizontal: 0.05 * width,
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
  text: {
    color: "#606470",
  },
  activeText: {
    color: "#ffffff",
  },
});

export default App;
