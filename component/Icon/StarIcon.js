// FavoriteIcon.js

import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const StarIcon = () => {
  return (
    <View
      style={{
        marginLeft: 3,
      }}
    >
      <Icon name={"star"} size={16} color={"gold"} />
    </View>
  );
};

export default StarIcon;
