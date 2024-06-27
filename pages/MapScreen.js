import React from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"; // İkon kütüphanesi

const API_KEY = "YOUR_API_KEY"; // API anahtarınızı buraya ekleyin

const MapScreen = ({ route }) => {
  const { tourData } = route.params;

  const navigation = useNavigation();

  if (!tourData || !tourData.places) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Tour data is missing</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const tourStops = tourData.places;

  const waypoints = tourStops.slice(1, tourStops.length - 1).map((stop) => ({
    latitude: stop.lat,
    longitude: stop.lon,
  }));

  const origin = {
    latitude: tourStops[0].lat,
    longitude: tourStops[0].lon,
  };

  const destination = {
    latitude: tourStops[tourStops.length - 1].lat,
    longitude: tourStops[tourStops.length - 1].lon,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: tourStops[0].lat,
          longitude: tourStops[0].lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {tourStops.map((stop, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: stop.lat, longitude: stop.lon }}
            title={stop.name}
            pinColor={
              index === 0
                ? "green" // Başlangıç markerı yeşil
                : index === tourStops.length - 1
                ? "black" // Bitiş markerı siyah
                : "red" // Diğer markerlar kırmızı (isteğe bağlı)
            }
          >
            <Callout>
              <Text>{`${index + 1}. Durak: ${stop.name}`}</Text>
            </Callout>
          </Marker>
        ))}
        <MapViewDirections
          origin={origin}
          destination={destination}
          waypoints={waypoints}
          apikey={API_KEY} // API anahtarını kullanıyoruz
          strokeWidth={4}
          strokeColor="blue"
        />
      </MapView>

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
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  ClosebuttonContainer: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default MapScreen;
