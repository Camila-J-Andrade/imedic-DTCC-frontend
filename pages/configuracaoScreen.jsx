import React from "react";
import { View, StyleSheet, Image, Text } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.div1}>
        <Image
          style={styles.logo}
          source={require("../assets/engrenagem.png")}
        />
        <Text style={styles.text1}>Minhas definições</Text>
      </View>

      <View style={styles.view}>
        <Text style={styles.text2}>Dados Pessoais</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.text2}>Notificações</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.text2}>Convidar amigos</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.text2}>Histórico de remédios</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.text2}>Alertas de promoções</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.text2}>Privacidade</Text>
      </View>

      <View style={styles.buttonsDiv} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF6EE',
    padding: 8,
  },
  div1: {
    flexDirection: 'row', // Deixa imagem e texto lado a lado
    alignItems: 'center', // Alinha verticalmente
    marginBottom: 20, // Espaçamento abaixo do título
    marginTop: -70
  },
  logo: {
    width: 90,
    height: 90,
    marginRight: 10, // Espaçamento entre imagem e texto
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  view: {
    width: '100%',
    alignItems: 'center', // Centraliza os textos
    marginVertical: 10, // Adiciona espaçamento entre os textos
    fontSize: 16,
  },
  text2: {
    fontSize: 16,
  },
});
