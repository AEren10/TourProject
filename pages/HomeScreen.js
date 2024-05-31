import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
// FlatList componentinin dosya yoluna göre düzenleyin
import FlatListComponent from "../component/Flat/FlatListComponent.js";
import CarouselComponent from "../component/Slider/CarouselComponent.js";

const cityData = require("./citys.json");

const HomeScreen = () => {
  const [istanbulData, setIstanbulData] = useState([]);
  const [avrupaData, setAvrupaData] = useState([]);

  useEffect(() => {
    const istanbulCity = cityData.cities.find(
      (city) => city.name === "İstanbul"
    );
    const avrupaCity = cityData.cities.find((city) => city.name === "Ankara");

    if (istanbulCity) {
      setIstanbulData(istanbulCity.tours);
    }

    if (avrupaCity) {
      setAvrupaData(avrupaCity.tours);
    }
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <CarouselComponent />
        <FlatListComponent
          header={"İstanbul Turları"}
          newsData={istanbulData}
        />
        <FlatListComponent header={"Avrupa Turları"} newsData={avrupaData} />
        <FlatListComponent header={"Mayıs Ayı Önerileri"} />
        <FlatListComponent header={"İtalya Turları"} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default HomeScreen;
