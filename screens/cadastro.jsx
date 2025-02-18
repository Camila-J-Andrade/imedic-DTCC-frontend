// import { StyleSheet, TextInput, Image, TouchableOpacity, Text, View } from 'react-native';
// import { Pressable } from 'react-native';
// import { Link } from 'expo-router';

// export default function Cadastro({ navigation }) {
//   return (
//     <View style={styles.container2}>
//       <View style={styles.container1}>
//         <Image style={styles.logo} source={require("../assets/imediclogo.png")}></Image>

//         <TextInput
//           placeholder= 'Nome'
//           placeholderTextColor= '#ADADAD'
//           keyboardType='text'
//           style ={styles.input}
//         />

//         <TextInput
//           placeholder= 'Data de nascimento'
//           placeholderTextColor= '#ADADAD'
//           keyboardType='text'
//           style ={styles.input}
//         />

//         <TextInput
//           placeholder= 'E-mail'
//           placeholderTextColor= '#ADADAD'
//           keyboardType='text'
//           style ={styles.input}
//         />

//         <TextInput
//           placeholder= 'Senha'
//           placeholderTextColor= '#ADADAD'
//           keyboardType='text'
//           style ={styles.input}
//         />

//         <TextInput
//           placeholder= 'Confirmação da senha'
//           placeholderTextColor= '#ADADAD'
//           keyboardType='text'
//           style ={styles.input}
//         />

//         <View style={styles.buttonsDiv}>

//           <Pressable style={styles.button}>
//             <Text style={styles.textButton} >Cadastrar</Text>
//           </Pressable>
          
//         <Link replace href={'./login.jsx'}>
//           <Pressable style={styles.button2}>
//             <Text style={styles.textButton2} >Já possuo cadastro</Text>
//           </Pressable>
//         </Link>
//         </View>

//         {/* <Image style={styles.logoTech} source={require("./assets/logo.png")}></Image> */}

//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container1: {
//     flex: 1,
//     paddingTop: 149,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFF6EE',
//     padding: 8,
//   },
//   container2: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFF6EE',
//     padding: 8,
//   },
//   logo: {
//     width: 139,
//     height: 124,
//     alignSelf: 'center',
//     marginBottom: 81,
//   },
//   input: {
//     backgroundColor: '#FFFFFF',
//     width: 234,
//     height: 29,
//     paddingLeft: 15,
//     borderRadius: 30,
//     marginBottom: 19,
//     borderColor: "#34C0FF",
//     borderWidth: 2,
//   },
//   button: {
//     width: 234,
//     height: 35,
//     alignItems: 'center',
//     backgroundColor: "#89EBF6",
//     justifyContent: 'center',
//     borderRadius: 20,
//     marginBottom: 10,
//   },
//   textButton: {
//     fontSize: 16,
//     color: "#000000",
//     fontFamily: "",
//   },
//   button2: {
//     width: 234,
//     height: 35,
//     alignItems: 'center',
//     backgroundColor: "#D9D9D9",
//     justifyContent: 'center',
//     borderRadius: 20,
//   },
//   textButton2: {
//     fontSize: 16,
//     color: "#8B8B8B",
//     fontFamily: "",
//   },
//   buttonsDiv: {
//     marginTop: 54
//   },
//   logoTech: {
//     width: 55,
//     height: 62,
//     marginTop: 24,
//   },
// });
