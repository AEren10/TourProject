import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// FlatList componentinin dosya yoluna göre düzenleyin
import FlatListComponent from "../component/Flat/FlatListComponent.js";
import CarouselComponent from "../component/Slider/CarouselComponent.js";

const cityData = require("./citys.json");

const HomeScreen = () => {
  const [istanbulData, setIstanbulData] = useState([]);
  const [italyaData, setitalyaData] = useState([]);
  const [ispanyaData, setispanyaData] = useState([]);
  const [avrupaData, setavrupaData] = useState([]);
  const [egeData, setegeData] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const istanbulCity = cityData.cities.find(
      (city) => city.name === "İstanbul"
    );
    const italyaCity = cityData.cities.find((city) => city.name === "İtalya");
    const ispanyaCity = cityData.cities.find((city) => city.name === "İspanya");

    const avrupacity = cityData.cities.find((city) => city.name === "Avrupa");
    const egecity = cityData.cities.find((city) => city.name === "Ege");

    if (istanbulCity) {
      setIstanbulData(istanbulCity.tours);
    }

    if (italyaCity) {
      setitalyaData(italyaCity.tours);
    }

    if (ispanyaCity) {
      setispanyaData(ispanyaCity.tours);
    }
    if (avrupacity) {
      setavrupaData(avrupacity.tours);
    }
    if (egecity) {
      setegeData(egecity.tours);
    }
  }, []);

  const onPress = () => {
    const allTours = [
      ...istanbulData,
      ...italyaData,
      ...ispanyaData,
      ...egeData,
      ...avrupaData,
    ];
    if (allTours.length > 0) {
      const randomTour = allTours[Math.floor(Math.random() * allTours.length)];
      navigation.navigate("TourScreen", { tourData: randomTour });
    } else {
      alert("Şu anda turlar mevcut değil.");
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <CarouselComponent />
        <View style={styles.stickyContainer}>
          <View style={styles.stickyButtonContainer}>
            <Button
              title="Beni rastgele bir yere gönder"
              onPress={onPress}
              color="white"
              style={{ color: "white" }}
            />
          </View>
        </View>

        <FlatListComponent header={"Ege Turları"} newsData={egeData} />
        <FlatListComponent header={"Avrupa Turları"} newsData={avrupaData} />
        <FlatListComponent header={"İtalya Turları"} newsData={italyaData} />
        <FlatListComponent
          header={"İstanbul Turları"}
          newsData={istanbulData}
        />
        <FlatListComponent header={"İspanya Turları"} newsData={ispanyaData} />
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
  stickyButtonContainer: {
    borderRadius: 12,
    height: 50,
    width: 370,
    backgroundColor: "#D54568",
    padding: 6,
    borderTopWidth: 1,
    borderColor: "#ddd",
    color: "white",
    marginTop: 10,
  },
  stickyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
