// FavoriteIcon.js

import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { addFavorites, removeFavorites } from "../../context/SliceFavorites";

const FavoriteIcon = ({ tour }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const isFav = favorites.some((fav) => fav === tour);
    setIsFavorite(isFav);
  }, [favorites, tour]);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorites(tour));
    } else {
      dispatch(addFavorites(tour));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleFavorite}>
        <Icon
          name={isFavorite ? "heart" : "heart-o"}
          size={30}
          color={isFavorite ? "red" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FavoriteIcon;
