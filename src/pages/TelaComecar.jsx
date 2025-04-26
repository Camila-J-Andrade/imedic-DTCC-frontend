import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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

      {/* Botão Começar com Gradiente */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")} activeOpacity={0.7}>
        <LinearGradient
          colors={["#006B9C", "#09B2FF", "#006B9C"]}
          locations={[0.16, 0.49, 0.83]} // Parâmetro "locations" reflete as paradas do Figma
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Começar</Text>
        </LinearGradient>
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
    top: 71+50,
    left: -10,
    width: 209,
    height: 27,
    backgroundColor: "#89EBF6",
    borderRadius: 14,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  topBarDark: {
    position: "absolute",
    top: 136+50,
    right: -10,
    width: 147,
    height: 27,
    backgroundColor: "#1C6789",
    borderRadius: 14,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#006B9B",
    marginBottom: 140,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 14,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  footerLogo: {
    width: 40+10,
    height: 65+10,
    position: "absolute",
    bottom: 40,
  },
});

