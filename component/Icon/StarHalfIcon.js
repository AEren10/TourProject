// FavoriteIcon.js

import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const StarHalfIcon = () => {
  return (
    <View
      style={{
        marginLeft: 3,
      }}
    >
      <Icon name={"star-half-o"} size={16} color={"gold"} />
    </View>
  );
};

export default StarHalfIcon;
