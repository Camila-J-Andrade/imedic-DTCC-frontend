import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Barras estilizadas no topo */}
      <View style={styles.topBarLight} />
      <View style={styles.topBarDark} />

      {/* Logo principal */}
      <Image source={require("../assets/imediclogo.png")} style={styles.logo} />

      {/* Nome da Aplicação */}
      <Text style={styles.appName}>i-medic.</Text>

      {/* Botão Começar */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>

      {/* Logo do rodapé */}
      <Image source={require("../assets/logoTechFlint.png")} style={styles.footerLogo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6EE",
    alignItems: "center",
    justifyContent: "center",
  },
  topBarLight: {
    position: "absolute",
    top: 40,
    left: 30,
    width: 120,
    height: 20,
    backgroundColor: "#89EBF6",
    borderRadius: 10,
  },
  topBarDark: {
    position: "absolute",
    top: 80,
    right: 50,
    width: 90,
    height: 20,
    backgroundColor: "#1C6789",
    borderRadius: 10,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  appName: {
    color: "#006B9B",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 50,
  },
  button: {
    backgroundColor: "#006B9C",
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  footerLogo: {
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 20,
  },
});
