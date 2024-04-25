import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const App = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Healthy Plants</Text>
      </View>
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            "All",
            "Healthy",
            "Apple Scab",
            "Apple Black Rot",
            "Apple Cedar",
          ].map((filter) => (
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
          ))}
        </ScrollView>
      </View>
      <ScrollView style={styles.plantsContainer}>
        <Text>Plant 1</Text>
        <Text>Plant 2</Text>
        <Text>Plant 3</Text>
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
    alignItems: "flex-start", // Changed from 'left' to 'flex-start'
    paddingHorizontal: 0.05 * width,
    paddingTop: 0.2 * width,
  },
  headerTitle: {
    fontSize: 0.045 * width,
    fontWeight: "bold",
    marginBottom: 0.012 * height,
  },
  filterContainer: {
    flexDirection: "row",
    marginVertical: 0.025 * width,
  },
  filterButton: {
    padding: 0.012 * height,
    borderWidth: 1,
    borderColor: "#eeeeee",
    borderRadius: 0.03 * width,
    backgroundColor: "#ececec",
    left: 0.025 * width,
    marginHorizontal: 0.01 * width,
  },
  activeButton: {
    backgroundColor: "#4CAF50",
  },
  plantsContainer: {
    paddingHorizontal: 0.05 * width,
  },
  text: {
    color: "#606470",
  },
  activeText: {
    color: "#ffffff", // White color for active button text
  },
});

export default App;
