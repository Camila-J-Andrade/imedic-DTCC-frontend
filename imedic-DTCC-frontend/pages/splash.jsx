import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const splash = ({ navigation }) => {
  useEffect(() => {
    // Timer para mudar de tela após 3 segundos
    const timer = setTimeout(() => {
      navigation.replace("Dashboard");
    }, 5000);

    return () => clearTimeout(timer); // Limpa o timer ao desmontar
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require ('../assets/splashOficial.png')} style={styles.img}></Image>
    </View>
  );
};

export default splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  img: {
    width: 380,
    height: 700,
    resizeMode: 'cover'
  },
});
