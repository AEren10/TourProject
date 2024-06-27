import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Button,
} from "react-native";

import FavoriteIcon from "../component/Icon/FavoriteIcon";
import TourCard from "../component/Cards/TourCard";
import calculateDistance from "../Utils/calculateDistance";
import StarHalfIcon from "../component/Icon/StarHalfIcon";
import StarIcon from "../component/Icon/StarIcon";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import FavoriteCard from "../component/Cards/FavoriteCard";
import Icon from "react-native-vector-icons/Ionicons"; // İkon kütüphanesi

const { width } = Dimensions.get("window");

const cityData = require("./citys.json");

const TourScreen = ({ route }) => {
  const { tourData } = route.params;
  const [selectedId, setSelectedId] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();

  const [randomTours, setRandomTours] = useState([]);
  const navigation = useNavigation();

  const renderStops = () => {
    return tourData.places.map((place, index) => (
      <TourCard stop={place} index={index} />
    ));
  };

  useEffect(() => {
    // Uygulama yüklendiğinde rastgele turlar oluştur
    const newRandomTours = getRandomTours(3, cityData);
    setRandomTours(newRandomTours);
  }, []);

  const getRandomTours = (count, cityData) => {
    const randomTours = [];
    const availableCities = [...cityData.cities];

    for (let i = 0; i < count; i++) {
      if (availableCities.length === 0) {
        break;
      }
      const randomCityIndex = Math.floor(
        Math.random() * availableCities.length
      );
      const randomCity = availableCities[randomCityIndex];

      // Şehrin tur listesinden rastgele bir tur seç
      const randomTourIndex = Math.floor(
        Math.random() * randomCity.tours.length
      );
      const randomTour = randomCity.tours[randomTourIndex];

      // **Places Bilgisini Ekle**
      randomTour.places = randomCity.tours[randomTourIndex].places;

      randomTours.push(randomTour);
      // Seçilen şehri ve turu listeden kaldır
      availableCities.splice(randomCityIndex, 3);
    }

    return randomTours;
  };
  const [isLoading, setIsLoading] = useState(false);

  const renderItem = ({ item }) => (
    <FavoriteCard
      item={item}
      onPress={() => navigation.navigate("TourScreen", { tourData: item })}
    />
  );

  // FlatList için benzer turları rastgele oluştur

  // total süre hesaplama
  let totalDistance = 0;
  const averageSpeed = 8; // km/h

  for (let i = 0; i < tourData.places.length - 1; i++) {
    const { lat: lat1, lon: lon1 } = tourData.places[i];
    const { lat: lat2, lon: lon2 } = tourData.places[i + 1];

    totalDistance += calculateDistance(lat1, lon1, lat2, lon2);
  }

  const averageTimeHours = totalDistance / averageSpeed;
  const averageTimeMinutes = averageTimeHours * 60;
  let totalTime = Math.round(averageTimeMinutes);

  //total durak hesaplama
  const getTotalStopsAndDuration = () => {
    let totalStops = tourData.places.length;
    let totalDuration = 0;

    tourData.places.forEach((place) => {
      totalDuration += place.duration || 0;
    });

    return { totalStops };
  };

  const { totalStops, totalDuration } = getTotalStopsAndDuration();

  const handleTabClick = (tabId) => {
    setSelectedId(tabId);
    scrollViewRef.current.scrollTo({ x: tabId * width, animated: true });
  };
  const indicatorWidth = scrollX.interpolate({
    inputRange: [0, width],
    outputRange: [width / 2, width / 2], // Genişliği ayarlayabilirsiniz
  });

  const translateX = scrollX.interpolate({
    inputRange: [0, width],
    outputRange: [0, width / 2],
  });
  /*     rating değeri    */
  const ratings = tourData.places
    .map((place) => place.rating)
    .filter((rating) => rating > 0);

  // Durakların ratinglerinin ortalamasını al
  const ortalamaRating =
    ratings.length > 0
      ? ratings.reduce((total, rating) => total + rating) / ratings.length
      : 0;

  // Ortalama rating'e göre tam ve yarım yıldız sayılarını hesapla
  const tamYildizSayisi = Math.floor(ortalamaRating);
  const yarimYildizVarMi = ortalamaRating % 1 !== 0;

  //****************************** */

  return (
    <View style={styles.container}>
      <View style={styles.fixedContent}>
        <Image style={styles.image} source={{ uri: tourData.tourImage }} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{tourData.tourHeader}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 3,
            }}
          >
            {[...Array(tamYildizSayisi)].map((_, i) => (
              <StarIcon key={i} />
            ))}
            {yarimYildizVarMi && <StarHalfIcon />}
            <Text style={{ marginLeft: 5 }}>{ortalamaRating.toFixed(1)}</Text>
          </View>
        </View>
        <View style={styles.infoBar}>
          <Text style={styles.infoBarText}>
            {totalStops} Durak • {totalTime} Dakika • Türkçe
          </Text>
          <FavoriteIcon tour={tourData} />
        </View>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>{tourData.name}</Text>
        </View>
      </View>

      <View style={styles.scrollableContent}>
        <View style={styles.headerList}>
          <TouchableOpacity
            onPress={() => handleTabClick(0)}
            style={[
              styles.headerContainer,
              selectedId === 0 && styles.selectedHeaderContainer,
            ]}
          >
            <Text
              style={[
                styles.headerText,
                selectedId === 0 && styles.selectedHeaderText,
              ]}
            >
              Hakkında
            </Text>
            {selectedId === 0 && <View style={styles.selectedIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleTabClick(1)}
            style={[
              styles.headerContainer,
              selectedId === 1 && styles.selectedHeaderContainer,
            ]}
          >
            <Text
              style={[
                styles.headerText,
                selectedId === 1 && styles.selectedHeaderText,
              ]}
            >
              Benzer
            </Text>
            {selectedId === 1 && <View style={styles.selectedIndicator} />}
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            styles.animatedIndicator,
            { width: indicatorWidth, transform: [{ translateX }] },
          ]}
        />

        <ScrollView
          horizontal
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setSelectedId(index);
          }}
          style={styles.descScroll}
          ref={scrollViewRef}
        >
          <ScrollView style={styles.InnerContainerScroll}>
            <View style={[styles.contentContainer, { width }]}>
              <View style={styles.contentInnerContainer}>{renderStops()}</View>
            </View>
          </ScrollView>
          <ScrollView style={styles.InnerContainerScroll}>
            <View style={[styles.contentContainer, { width }]}>
              <FlatList
                data={randomTours}
                keyExtractor={(item) => item.tour}
                renderItem={renderItem}
                style={{ width, padding: 20 }}
                pagingEnabled
              />
            </View>
          </ScrollView>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonInnerContainer}>
            <Button
              title="Tura Başla"
              onPress={() => navigation.navigate("MapScreen", { tourData })}
              color="white"
              style={styles.tourButton}
            />
          </View>
        </View>
      </View>
      <View style={styles.ClosebuttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <Icon name="arrow-back-circle-sharp" size={35} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixedContent: {
    // Üst kısım sabit içerik için stil
  },
  ClosebuttonContainer: {
    backgroundColor: "rgba(0, 0, 255, 0.2)",
    position: "absolute",
    borderRadius: 20,
    top: 40,
    left: 20,
  },
  image: {
    width: "100%",
    height: 290,
    borderBottomWidth: 2,
    borderColor: "black",
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
  },
  infoBar: {
    backgroundColor: "lightgray",
    padding: 5,
    paddingLeft: 20,
    paddingRight: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoBarText: {
    fontSize: 15,
    fontWeight: "550",
  },
  locationContainer: {
    position: "absolute",
    top: 277, // Görselin yüksekliği kadar
    left: 15,
    width: 110,
    backgroundColor: "#D54568",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 8,
  },
  locationText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 20,
  },
  scrollableContent: {
    flex: 1,
  },
  headerList: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  headerListContent: {
    paddingHorizontal: 10,
  },
  headerContainer: {
    padding: 7,
    marginHorizontal: 10,
    alignItems: "center",
    width: 100,
  },
  headerText: {
    fontSize: 18,
    color: "#000",
  },
  selectedHeaderText: {
    color: "#D54568",
  },
  animatedIndicator: {
    height: 2,
    backgroundColor: "#D54568",
    position: "absolute",
    top: 40,
    left: 0,
  },
  descScroll: {
    flex: 1,
  },
  descContainer: {
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  descText: {
    fontSize: 14,
  },
  contentContainer: { justifyContent: "center", alignItems: "center" },
  contentInnerContainer: { padding: 20 },
  InnerContainerScroll: {},
  buttonInnerContainer: {
    borderRadius: 12,
    height: 50,
    width: 370,
    backgroundColor: "#D54568",
    padding: 6,
    borderTopWidth: 1,
    borderColor: "#ddd",
    color: "white",
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TourScreen;
