import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const Button = ({ children, onPress, buttonStyle, buttonTextStyle }) => {
  const mergedStyles = {
    button: {
      ...styles.button,
      ...buttonStyle,
    },
    buttonText: {
      ...styles.buttonText,
      ...buttonTextStyle,
    },
  };
  return (
    <TouchableOpacity onPress={onPress} style={mergedStyles.button}>
      <Text style={mergedStyles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#D9E0E8",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 12,
  },
});

export default Button;
