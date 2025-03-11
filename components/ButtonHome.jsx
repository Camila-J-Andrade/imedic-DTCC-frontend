import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Entypo } from '@expo/vector-icons';

export default function ButtonHome({ size, focused}){
    return(
        <View style={[styles.container, { backgroundColor: focused ? '#FFFFFF' : '#DEDEDE',  // Fundo branco quando selecionado
            borderWidth: focused ? 2 : 2,  // Adiciona borda para efeito visual
            borderColor: '#4682B4'} ]}>
            <Entypo name="home" color={ focused ? '#4682B4' : '#4169E1'} size={size} focused={focused}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    }
})