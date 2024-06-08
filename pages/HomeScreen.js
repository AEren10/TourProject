import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
// FlatList componentinin dosya yoluna göre düzenleyin
import FlatListComponent from "../component/Flat/FlatListComponent.js";
import CarouselComponent from "../component/Slider/CarouselComponent.js";

const cityData = require("./citys.json");

const HomeScreen = () => {
  const [istanbulData, setIstanbulData] = useState([]);
  const [italyaData, setitalyaData] = useState([]);
  const [ispanyaData, setispanyaData] = useState([]);

  useEffect(() => {
    const istanbulCity = cityData.cities.find(
      (city) => city.name === "İstanbul"
    );
    const italyaCity = cityData.cities.find((city) => city.name === "İtalya");
    const ispanyaCity = cityData.cities.find((city) => city.name === "İspanya");

    if (istanbulCity) {
      setIstanbulData(istanbulCity.tours);
    }

    if (italyaCity) {
      setitalyaData(italyaCity.tours);
    }

    if (ispanyaCity) {
      setispanyaData(ispanyaCity.tours);
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
        <FlatListComponent header={"İtalya Turları"} newsData={italyaData} />
        <FlatListComponent header={"İspanya Turları"} newsData={ispanyaData} />
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
