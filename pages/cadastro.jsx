import { StyleSheet, TextInput, Image, TouchableOpacity, Text, View } from 'react-native';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Cadastro({ navigation }) {
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirma_Senha, setConfirma_Senha] = useState('');
  const [data_nasc, setDataNasc] = useState('');

  const handleCadastro = () => {
    if (senha !== confirma_Senha) {
      alert('As senhas devem ser iguais');
      return;
    }

    fetch("http://localhost:3333/userController/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        email: email,
        data_nasc: data_nasc,
        senha: senha
      }),
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log("Cadastro bem-sucedido", responseData);
      navigation.navigate("Login");
    })
    .catch((error) => {
      console.error("Erro ao cadastrar:", error);
    });
  };

  return (
    <SafeAreaView style={styles.container2}>
      <View style={styles.container1}>
        <Image style={styles.logo} source={require("../assets/imediclogo.png")} />

        <TextInput
          placeholder='Nome'
          placeholderTextColor='#ADADAD'
          keyboardType='default'
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          placeholder='E-mail'
          placeholderTextColor='#ADADAD'
          keyboardType='email-address'
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder='Data de Nascimento'
          placeholderTextColor='#ADADAD'
          keyboardType='default'
          style={styles.input}
          value={data_nasc}
          onChangeText={setDataNasc}
        />

        <TextInput
          placeholder='Senha'
          placeholderTextColor='#ADADAD'
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />

        <TextInput
          placeholder='Confirmação da senha'
          placeholderTextColor='#ADADAD'
          secureTextEntry
          style={styles.input}
          value={confirma_Senha}
          onChangeText={setConfirma_Senha}
        />

        <View style={styles.buttonsDiv}>
          <TouchableOpacity style={styles.button} onPress={handleCadastro}> 
            <Text style={styles.textButton}>Cadastrar</Text>
          </TouchableOpacity>
          
          <Pressable style={styles.button2} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.textButton2}>Já possuo cadastro</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container1: {
    flex: 1,
    paddingTop: 149,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF6EE',
    padding: 8,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF6EE',
    padding: 8,
    marginTop: -90,
  },
  logo: {
    width: 139,
    height: 124,
    alignSelf: 'center',
    marginBottom: 81,
  },
  input: {
    backgroundColor: '#FFFFFF',
    width: 234,
    height: 29,
    paddingLeft: 15,
    borderRadius: 30,
    marginBottom: 19,
    borderColor: "#34C0FF",
    borderWidth: 2,
  },
  button: {
    width: 234,
    height: 35,
    alignItems: 'center',
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
  button2: {
    width: 234,
    height: 35,
    alignItems: 'center',
    backgroundColor: "#D9D9D9",
    justifyContent: 'center',
    borderRadius: 20,
  },
  textButton2: {
    fontSize: 16,
    color: "#8B8B8B",
    fontFamily: "",
  },
  buttonsDiv: {
    marginTop: 54
  },
  logoTech: {
    width: 55,
    height: 62,
    marginTop: 24,
  },
});
