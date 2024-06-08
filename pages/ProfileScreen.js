import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Text, FlatList } from "react-native";
import SearchBar from "../component/SearchScreen/SearchBar.js";
import PopularSearchItem from "../component/SearchScreen/PopularSearchItem.js";
import SearchCard from "../component/SearchScreen/SearchCard.js";
const jsonData = require("./citys.json");
// JSON dosyasını içe aktarma

const tours = jsonData.cities.flatMap((city) => city.tours);
const popularTours = tours.slice(0, 8);

const ProfileScreen = () => {
  const [randomTours, setRandomTours] = useState([]);

  useEffect(() => {
    const tours = jsonData.cities.flatMap((city) =>
      city.tours.map((tour) => tour.name)
    );
    const randomTours = tours.sort(() => 0.5 - Math.random()).slice(0, 7);
    setRandomTours(randomTours);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <SearchBar jsonData={jsonData} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popüler Aramalar</Text>
        <View style={styles.popularSearches}>
          {randomTours.map((item, index) => (
            <PopularSearchItem key={index} text={item} />
          ))}
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Popüler Turlar</Text>
        <FlatList
          data={popularTours}
          renderItem={({ item }) => (
            <SearchCard image={item.image} title={item.name} />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  popularSearches: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tours: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default ProfileScreen;
