import { Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, View, Pressable} from 'react-native';
import React, {useState} from 'react';


export default function Login({ navigation }) {

const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');
const [login, setLogin] = useState(null);
const [cadastro, setCadastro] = useState (null);

const Login = () => {
  setLogin({email}, {senha});
};

  return (
    <ScrollView style={styles.scroll}>
    <View style={styles.container2}>
    <Image source = {require('../assets/imediclogo.png')} style={styles.logo}></Image>
       <TextInput
         style= {styles.input}
         placeholder= "E-mail"
         value= {email}
         onChangeText = {setEmail}
         keyboardType="email adress"
         />
         <TextInput
         style= {styles.input}
         placeholder= "Senha"
         value= {senha}
         onChangeText = {setSenha}
         keyboardType="default"
         />
         <Pressable>
          <Text style={styles.SubTituloSenha}>Esqueci a Senha</Text>
         </Pressable>
         </View>
         <View style={styles.ButtonsDiv}>
        <TouchableOpacity style={styles.botao} onPress={() =>  fetch("http://localhost:3333/login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        senha: senha
      }),
    })
  .then((response) => response.json())
  .then((responseData) => {
    navigation.navigate("Home1")
    console.log("OK pressionado")
  }) }>
        <Text style={styles.textBotao}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao2} onPress={cadastro}>
        <Text style={styles.textBotao2}>Não possuo cadastro</Text>
        </TouchableOpacity>
      </View>
      {/* <Image source = {require('./assets/logotipo tech flint.png')} style = {styles.logo2}></Image> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#fff6ee',
    padding: 8,
  },
  SubTituloSenha: {
    color: '#A9A9A9',
    justifyContent: 'center',
    fontSize: '10',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF6EE',
    padding: 8,
    },
  ButtonsDiv: {
    marginTop: 54,
    alignItems: 'center',
    justifyContent: 'center',
    },
  logo: {
    width: 120,
    height: 124,
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'contain',
    padding: 50,
    marginBottom: 35,
  },
  logo2: {
    width: 55,
    height: 62,
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'contain',
  },
  input: {
    height: 29,
    width: 234,
    borderColor: '#34C0FF',
    borderWidth: 2,
    borderRadius: 18,
    marginTop: 20,
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
   botao: {
    backgroundColor: '#89EBF6',
    width: 234,
    height: 29,
    padding: 5,
    borderRadius: 26,
    marginTop: 30,
    marginBottom: 15,
    justifyContent: 'flex-start',
  },
  textBotao: {
    textAlign: 'center',
    color: 'black'
  },
   botao2: {
    backgroundColor: '#D9D9D9',
    width: 234,
    height: 29,
    padding: 5,
    borderRadius: 26,
    marginBottom: 15,
  },
  textBotao2: {
    textAlign: 'center',
    color: '#8B8B8B'
  }  
})