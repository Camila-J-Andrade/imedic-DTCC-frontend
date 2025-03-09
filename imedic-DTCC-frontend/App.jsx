// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import HomeScreen from "./pages/splash.jsx"; // Importa a tela inicial
// import DashboardScreen from "./pages/TelaComecar.jsx"; // Importa a tela de destino
// import Login from "./pages/login.jsx";
// import Home1 from "./pages/home1.jsx";
// // import Cadastro from "./screens/cadastro.jsx";

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Dashboard" component={DashboardScreen} />
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Home1" component={Home1} />
//         {/* <Stack.Screen name="Cadastro" component={Cadastro} /> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./pages/splash.jsx"; // Importa a tela de Splash
import DashboardScreen from "./pages/TelaComecar.jsx"; // Importa a tela de Começar
import Login from "./pages/login.jsx";
import TabBar from "./pages/TabBar.jsx";
import Cadastro from "./pages/cadastro.jsx"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="TabBar" component={TabBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
