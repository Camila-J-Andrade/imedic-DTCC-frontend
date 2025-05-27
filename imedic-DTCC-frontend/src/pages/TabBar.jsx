import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importação das telas
import HomeScreen from './home1';
import AlarmScreen from './alameScreen';
import GeoScreen from './geolocation';
import PromoScreen from './promoTela';

// Importando Botões:
import ButtonHome from '../components/ButtonHome';
import ButtonAlarm from '../components/ButtonAlarm';
import ButtonPromo from '../components/ButtonPromo';
import ButtonGeo from '../components/ButtonGeo';

const Tab = createBottomTabNavigator();

export default function HomeWithTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#89EBF6',
          borderTopColor: 'transparent',
          height: 90,
          paddingBottom: 5,  // Ajustando o padding inferior
          paddingTop: -8,     // Ajustando o padding superior
        },
      }}
    >
      <Tab.Screen
        name='Tela Inicial'
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, size }) => (
            <ButtonHome size={size} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name='Alarme'
        component={AlarmScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, size }) => (
            <ButtonAlarm size={size} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name='Geolocalização'
        component={GeoScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, size }) => (
            <ButtonGeo size={size} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name='Promoções'
        component={PromoScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, size }) => (
            <ButtonPromo size={size} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
