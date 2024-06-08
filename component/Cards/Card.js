import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";
import StarHalfIcon from "../Icon/StarHalfIcon";
import StarIcon from "../Icon/StarIcon";

const Card = ({ item, onPress }) => {
  const ratings = item.places
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
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.inner_conteiner}>
          <ImageBackground
            style={styles.image}
            source={{ uri: item.tourImage }}
          ></ImageBackground>
          <View style={styles.textContainer}>
            <Text style={styles.textName}>{item.tourHeader}</Text>
            <Text style={styles.textCity}>{item.name}</Text>
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
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 240,
    height: 230,
    margin: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  image: {
    height: 150,
    width: 240,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    overflow: "hidden",
  },
  inner_conteiner: {},
  textName: {
    fontSize: 18,
    color: "black",
    marginBottom: 6,
    marginTop: 6,
  },
  textCity: {
    fontSize: 13,
    color: "black",
    textAlign: "left",
  },
  textContainer: {
    backgroundColor: "white",
  },
});

export default Card;
