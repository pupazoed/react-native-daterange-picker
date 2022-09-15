import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { width, height } from "../../modules";

const Header = ({ index, dayHeaderTextStyle, dayHeaderStyle, day }) => {
  const dayHeaderStyles = {
    ...styles.dayHeader,
    ...dayHeaderStyle,
  };
  const dayHeaderTextStyles = {
    ...styles.dayHeaderText,
    ...dayHeaderTextStyle,
  };
  return (
    <View key={"headers-" + index} style={dayHeaderStyles}>
      <Text style={dayHeaderTextStyles}>{day}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  dayHeader: {
    width: width * 0.085,
    height: height * 0.025,
    justifyContent: "center",
  },
  dayHeaderText: {
    opacity: 0.6,
    textAlign: "center",
  },
});
