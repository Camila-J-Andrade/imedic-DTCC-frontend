import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
        {/* <Image
          source={require("../assets/Detalhe_superior_oficial.png")}
          style={styles.detailImage}
        /> */}
      <View style={styles.div1}>
        <Image
          source={require('../assets/PerfilLogo.png')} // Adicione o caminho correto para sua imagem
          style={styles.image}
        />
        <Text style={styles.text1}>Seja Bem-Vindo</Text>
      </View>
      <Text style={styles.text2}>Meus medicamentos:</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.textButton}>Adicionar um tratamento</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF6EE',
    padding: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginTop: -20,
    marginLeft: -50,
  },
  detailImage: {
    width: "100%",
    height: "25%", // Aumente conforme necessário
    resizeMode: "cover",
    position: "absolute",
    top: 90, // Ajuste conforme o layout
  },
  button: {
    width: 234,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#89EBF6",
    borderRadius: 20,
    marginBottom: 40,
    marginTop: -100,
  },
  textButton: {
    fontSize: 16,
    color: "#000000",
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 20,
    marginBottom: 300
  },
  div1: {
    marginTop: 42,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 79,
  },
});
