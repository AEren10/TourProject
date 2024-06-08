import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SearchBar = ({ jsonData }) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const navigation = useNavigation();
  const clearSearch = () => {
    setQuery("");
    setFilteredData([]);
  };

  const searchTours = (input) => {
    setQuery(input);
    if (input.trim() === "") {
      setFilteredData([]);

      return;
    }
    const filteredTours = [];
    jsonData.cities.forEach((city) => {
      city.tours.forEach((tour) => {
        if (tour.name.toLowerCase().startsWith(input.toLowerCase())) {
          filteredTours.push({
            cityName: city.name,
            tour,
            tourName: tour.name,
            tourHeader: tour.tourHeader,
            tourImage: tour.tourImage,
          });
        }
      });
    });
    setFilteredData(filteredTours);
  };

  const handleInputChange = (text) => {
    setQuery(text);
    searchTours(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Ara..."
        value={query}
        onChangeText={handleInputChange}
      />
      {query && query.length > 0 && (
        <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
          <Ionicons name="close-circle" size={25} color="gray" />
        </TouchableOpacity>
      )}
      {query.trim() !== "" && (
        <ScrollView style={styles.resultsContainer}>
          {filteredData.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("TourScreen", { tourData: item.tour });
                console.log(item);
              }}
              key={index}
              style={styles.tourItem}
            >
              <ImageBackground
                style={styles.image}
                source={{ uri: item.tourImage }}
              ></ImageBackground>
              <View style={styles.content}>
                <Text style={styles.tourHeader}>{item.tourHeader}</Text>
                <View style={styles.tourContent}>
                  <Text style={styles.cityName}>{item.cityName},</Text>
                  <Text style={styles.tourName}>{item.tourName}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
  },
  searchInput: {
    height: 40,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
    margin: 10,
  },
  resultsContainer: {
    marginTop: 10,
  },
  tourItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tourContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  content: { flex: 1, justifyContent: "center", marginLeft: 20 },
  image: {
    height: 60,
    width: 80,
    borderRadius: 12,
    overflow: "hidden",
  },
  cityName: {
    fontSize: 15,
    fontStyle: "italic",
    marginRight: 3,
  },
  tourName: {
    fontSize: 15,
    fontStyle: "italic",
  },
  tourHeader: {
    fontSize: 16,
    fontWeight: "600",
  },
  clearButton: {
    position: "absolute",
    top: 58,
    right: 18,
    padding: 5,
  },
});

export default SearchBar;
