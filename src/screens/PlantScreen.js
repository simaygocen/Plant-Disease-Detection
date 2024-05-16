import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const App = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [plantList, setPlantList] = useState([]);
  const [filteredPlantList, setFilteredPlantList] = useState([]);
  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await fetch('http://192.168.1.7:3000/getplants', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        const plants = data.map(prediction => ({
          name: prediction.plantname,
          images: [prediction.image],
          result: prediction.result,
          id: prediction.id
        }));
        setPlantList(plants);
        const filteredPlants = filterPlantsByPrediction(activeFilter, plants);
        setFilteredPlantList(filteredPlants);
      } else {
        console.error('Error fetching user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const filterPlantsByPrediction = (prediction, plants) => {
    if (prediction === "All") {
      return plants;
    } else {
      return plants.filter(plant => plant.result === prediction.replace(/ /g, "_"));
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  useEffect(() => {
    const filteredPlants = filterPlantsByPrediction(activeFilter, plantList);
    setFilteredPlantList(filteredPlants);
  }, [activeFilter, plantList]);

  const navigateToSavedPredictionScreen = (plantId) => {
    navigation.navigate('SavedPredictionScreen', { plantId: plantId });
  };

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
          {["All", "Healthy", "Scab", "Black Rot", "Cedar Rust"].map(
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
        {filteredPlantList.map((plant) => (
          <TouchableOpacity
            key={plant.id}
            style={styles.plantItem}
            onPress={() => navigateToSavedPredictionScreen(plant.id)}
          >
            {plant.images.map((image, index) => (
              <Image
                key={`${plant.name}_${index}`}
                source={{ uri: image }}
                style={styles.plantImage}
              />
            ))}
            <Text style={styles.plantText}>{plant.name}</Text>
          </TouchableOpacity>
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
