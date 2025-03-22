import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";

const Splash = ({ navigation }) => {
  useEffect(() => {
    // Timer para mudar de tela após 3 segundos
    const timer = setTimeout(() => {
      navigation.replace("Dashboard");
    }, 5000);

    return () => clearTimeout(timer); // Limpa o timer ao desmontar
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require ('../assets/imedicSplash.gif')} style={styles.img}></Image>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#89EBF6",
  },
  img: {
    width: 209,
    height: 61,
    // resizeMode: 'cover'
  },
});
