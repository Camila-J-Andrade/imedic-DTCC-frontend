import { Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, View, Pressable } from 'react-native';
import React, { useState } from 'react';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlelogin = () => {
    setLoading(true);
    setError('');

    fetch("http://34.151.222.98:3333/login/", {
      method: "POST",
      headers: {
        Accept: "application/json", // Corrigido
        "Content-Type": "application/json", // Corrigido
      },
      body: JSON.stringify({
        email: email,
        senha: senha
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      setLoading(false);
      // Verifique se a mensagem indica sucesso
      if (data.message === "Login efetuado com sucesso") {
        console.log(data.message); // Exibe a mensagem de sucesso
        navigation.navigate("TabBar");
      } else {
        setError(data.message || 'Falha no login');
      }
    })
    .catch((err) => {
      setLoading(false);
      setError('Erro de conexão. Tente Novamente');
    });
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container2}>
        <Image source={require('../assets/imediclogo.png')} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor='#ADADAD'
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address" // Corrigido
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor='#ADADAD'
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <Pressable>
          <Text style={styles.SubTituloSenha}>Esqueci a Senha</Text>
        </Pressable>
      </View>

      {error ? <Text style={{ color: 'red' }}>{String(error)}</Text> : null}

      <View style={styles.ButtonsDiv}>
        <TouchableOpacity style={styles.botao} onPress={handlelogin/*() => navigation.navigate("TabBar")*/}>
          <Text style={styles.textBotao}>
            {loading ? 'Carregando...' : 'Login'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao2} onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.textBotao2}>Não possuo cadastro</Text>
        </TouchableOpacity>
      </View>
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
    textAlign: 'left',
    fontSize: 14,
    width: 265 
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF6EE',
    padding: 8,
    paddingTop: 149,
    marginBottom: 265
  },
  ButtonsDiv: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 107
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
  botao: {
    backgroundColor: '#89EBF6',
    width: 300,
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
    width: 300,
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
// import {
//   Text,
//   ScrollView,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   View,
//   Pressable
// } from 'react-native';
// import React, { useState } from 'react';

// export default function Login({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [senha, setSenha] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = () => {
//     setLoading(true);
//     setError('');

//     fetch("http://34.151.222.98:3333/login/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         email: email,
//         senha: senha
//       }),
//     })
//       .then(async (response) => {
//         const data = await response.json();
//         setLoading(false);

//         if (response.ok) {
//           if (data.message === "Login efetuado com sucesso") {
//             console.log(data.message);
//             navigation.navigate("TabBar");
//           } else {
//             setError(data.message || 'Falha no login');
//           }
//         } else {
//           setError(data.message || 'Erro desconhecido');
//         }
//       })
//       .catch((err) => {
//         setLoading(false);
//         console.log(err);
//         setError('Erro de conexão. Tente novamente.');
//       });
//   };

//   return (
//     <ScrollView style={styles.scroll}>
//       <View style={styles.container2}>
//         <Image
//           source={require('../assets/imediclogo.png')}
//           style={styles.logo}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="E-mail"
//           placeholderTextColor="#ADADAD"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Senha"
//           placeholderTextColor="#ADADAD"
//           value={senha}
//           onChangeText={setSenha}
//           secureTextEntry
//         />
//         <Pressable>
//           <Text style={styles.SubTituloSenha}>Esqueci a Senha</Text>
//         </Pressable>
//       </View>

//       {error ? <Text style={{ color: 'red', textAlign: 'center' }}>{String(error)}</Text> : null}

//       <View style={styles.ButtonsDiv}>
//         <TouchableOpacity style={styles.botao} onPress={handleLogin}>
//           <Text style={styles.textBotao}>
//             {loading ? 'Carregando...' : 'Login'}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.botao2}
//           onPress={() => navigation.navigate("Cadastro")}
//         >
//           <Text style={styles.textBotao2}>Não possuo cadastro</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   scroll: {
//     flex: 1,
//     backgroundColor: '#fff6ee',
//     padding: 8,
//   },
//   SubTituloSenha: {
//     color: '#A9A9A9',
//     textAlign: 'left',
//     fontSize: 14,
//     width: 265,
//   },
//   container2: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFF6EE',
//     padding: 8,
//     paddingTop: 149,
//     marginBottom: 265,
//   },
//   ButtonsDiv: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 107,
//   },
//   logo: {
//     width: 120,
//     height: 124,
//     marginTop: 10,
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     resizeMode: 'contain',
//     padding: 50,
//     marginBottom: 35,
//   },
//   input: {
//     height: 30,
//     width: 300,
//     borderColor: '#34C0FF',
//     borderWidth: 2,
//     borderRadius: 18,
//     marginTop: 20,
//     backgroundColor: 'white',
//     paddingHorizontal: 15,
//     fontSize: 16,
//     textAlignVertical: 'center',
//   },
//   botao: {
//     backgroundColor: '#D9D9D9',
//     width: 300,
//     height: 29,
//     padding: 5,
//     borderRadius: 26,
//     marginBottom: 15,
//   },
//   textBotao2: {
//     textAlign: 'center',
//     color: '#8B8B8B'
//   }
// })
