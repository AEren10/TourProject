// FavoriteIcon.js

import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const FavoriteIcon = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
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
