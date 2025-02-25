import {View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import React from "react";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.div1}>
        {/*<Image style={styles.logo} source={require("./assets/fotodeperfil.png")}></Image> */}
        
        <Text style= {styles.text1}> Bem-vindo, Usuário </Text>
       
      </View>

      <Text style= {styles.text2}> Meus medicamentos: </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.textButton} >Adicionar um tratamento</Text>
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
  logo: {
    width: 110.69,
    height: 110.69,
    alignSelf: 'center',
  },

  button: {
    width: 234,
    height: 35,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: "#89EBF6",
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
  textButton: {
    fontSize: 16,
    color: "#000000",
    fontFamily: "",
  },
  text1: {
    fontSize: 16,
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