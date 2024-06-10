import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet,
  Image,
  onPressRemove,
} from "react-native";
import StarHalfIcon from "../Icon/StarHalfIcon";
import StarIcon from "../Icon/StarIcon";
import TrashIcon from "../Icon/TrashIcon";
import { useDispatch } from "react-redux";
import { removeFavorites } from "../../context/SliceFavorites";

const FavoriteCard = ({ item, onPress, showRemoveButton }) => {
  const dispatch = useDispatch();

  const onPressRemove = () => {
    dispatch(removeFavorites(item));
  };

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
        <View style={styles.innerContainer}>
          <ImageBackground
            style={styles.image}
            source={{ uri: item.tourImage }}
          ></ImageBackground>
          <View style={styles.contentContainer}>
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
                <Text style={{ marginLeft: 5 }}>
                  {ortalamaRating.toFixed(1)}
                </Text>
              </View>
            </View>
            {showRemoveButton && (
              <TouchableOpacity
                onPress={onPressRemove}
                style={styles.favoriteButton}
              >
                <TrashIcon />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 10,
  },
  innerContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
  },
  image: {
    height: 150,
    width: 130,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    overflow: "hidden",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  textContainer: {
    flex: 1,
  },
  textName: {
    fontSize: 18,
    color: "black",
    marginBottom: 6,
    marginTop: 6,
    fontWeight: "600",
  },
  textCity: {
    fontSize: 13,
    color: "black",
    textAlign: "left",
  },
  favoriteButton: {
    height: 150,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export default FavoriteCard;
