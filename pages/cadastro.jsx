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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF6EE',
    padding: 8,
    paddingTop: 105,
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff6ee',
    padding: 8,
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
  input: {
    height: 30,
    width: 300,
    borderColor: '#34C0FF',
    borderWidth: 2,
    borderRadius: 18,
    marginTop: 20,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 0,
    fontSize: 16,
    textAlignVertical: 'center',
  },
  button: {
    backgroundColor: '#89EBF6',
    width: 300,
    height: 29,
    padding: 5,
    borderRadius: 26,
    marginBottom: 15,
    justifyContent: 'flex-start',
  },
  textButton: {
    textAlign: 'center',
    color: 'black'
  },
  button2: {
    backgroundColor: '#D9D9D9',
    width: 300,
    height: 29,
    padding: 5,
    borderRadius: 26,
    marginBottom: 15,
  },
  textButton2: {
    textAlign: 'center',
    color: '#8B8B8B'
  },
  buttonsDiv: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 170
  },
});
