import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  Button,
} from "react-native";
import SearchBar from "../component/SearchScreen/SearchBar.js";
import PopularSearchItem from "../component/SearchScreen/PopularSearchItem.js";
import SearchCard from "../component/SearchScreen/SearchCard.js";
import { useNavigation } from "@react-navigation/native";
const jsonData = require("./citys.json");
// JSON dosyasını içe aktarma

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [popularTours, setPopularTours] = useState([]);

  useEffect(() => {
    // JSON verisinden tüm turları toplama ve rating değerlerine göre sıralama
    const tours = jsonData.cities.flatMap((city) =>
      city.tours.map((tour) => ({
        ...tour,
        tourHeader: city.name,
        tourImage: tour.tourImage,
        cityName: city.name,
        places: city.places,
        tour,
      }))
    );

    // Turları rating'e göre azalan sırada sıralama
    const sortedTours = tours.sort((a, b) => b.rating - a.rating);

    // En fazla 8 öğeyi alacak şekilde slice uyguluyoruz
    setPopularTours(sortedTours.slice(0, 8));
  }, []);

  const [randomTours, setRandomTours] = useState([]);

  useEffect(() => {
    const tours = jsonData.cities.flatMap((city) =>
      city.tours.map((tour) => tour.name)
    );
    const randomTours = tours.sort(() => 0.5 - Math.random()).slice(0, 7);
    setRandomTours(randomTours);
  }, []);

  const navigateToRandomTour = () => {
    const randomIndex = Math.floor(Math.random() * popularTours.length);
    const randomTour = popularTours[randomIndex];
    navigation.navigate("TourScreen", { tourData: randomTour });
  };

  return (
    <View style={styles.containerMain}>
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
            renderItem={({ item }) => <SearchCard item={item} />}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={styles.list}
          />
        </View>
      </ScrollView>
      <View style={styles.stickyContainer}>
        <View style={styles.stickyButtonContainer}>
          <Button
            title="Beni rastgele bir yere gönder"
            onPress={navigateToRandomTour}
            style={{ color: "black" }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
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
  stickyButtonContainer: {
    borderRadius: 12,
    height: 50,
    marginBottom: 5,
    width: 370,
    backgroundColor: "#666666",
    padding: 6,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  stickyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
