import React, { useState } from 'react';
import {
    StyleSheet, View, Text, Alert, TouchableOpacity, TextInput, Linking, Image
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
    const [farmacia, setFarmacia] = useState(null);
    const [medicamento, setMedicamento] = useState('');

    const linksFarmacias = {
        'Drogasil': 'https://www.drogasil.com.br/search?w=',
        'Ultrafarma': 'https://www.ultrafarma.com.br/busca?q=',
        'Drogaria São Paulo': 'https://www.drogariasaopaulo.com.br/pesquisa?q=',
        'Droga Raia': 'https://www.drogaraia.com.br/search?w=',
        'Pague menos': 'https://www.paguemenos.com.br/busca?termo='
    };

    const handleBuscar = () => {
        if (!farmacia || medicamento.trim() === '') {
            Alert.alert('Erro', 'Selecione a farmácia e digite o medicamento.');
            return;
        }

        const baseUrl = linksFarmacias[farmacia];
        const urlCompleta = `${baseUrl}${encodeURIComponent(medicamento)}`;
        Linking.openURL(urlCompleta);
    };

    return (
        <View style={styles.container}>
            {/* HEADER FIXO NO TOPO */}
            <View style={styles.header}>
                <Image
                    source={require('../assets/Rectangle 1.png')}
                    style={styles.waveImage}
                    resizeMode="cover"
                />
                <View style={styles.headerContent}>
                    <MaterialCommunityIcons name="ticket-percent" size={80} color="#1C6789" />
                    <Text style={styles.headerText}>Busca de promoções</Text>
                </View>
            </View>

            {/* ELEMENTOS */}
            <View style={styles.elements}>
                <Text style={styles.instruction}>
                    Digite o medicamento e selecione a farmácia para ser redirecionado à página de promoções.
                </Text>

                <TextInput
                    style={styles.inputBusca}
                    placeholder="Pesquise o medicamento"
                    placeholderTextColor="#000"
                    value={medicamento}
                    onChangeText={setMedicamento}
                />
                
                <RNPickerSelect
                    onValueChange={(value) => setFarmacia(value)}
                    placeholder={{ label: 'Selecione a rede da farmácia', value: null }}
                    items={Object.keys(linksFarmacias).map((farm) => ({
                        label: farm,
                        value: farm
                    }))}
                    style={{
                        inputIOS: styles.input,
                        inputAndroid: styles.input,
                        placeholder: { color: '#777' },
                    }}
                    useNativeAndroidPickerStyle={false}
                />


                <TouchableOpacity style={styles.button} onPress={handleBuscar}>
                    <Text style={styles.buttonText}>Buscar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF6EE',
        paddingTop: 200, // Espaço para o header fixo
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    waveImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
        zIndex: 0,
    },
    headerContent: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 8,
    },
    elements: {
        padding: 30,
    },
    instruction: {
        fontSize: 16,
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
        lineHeight: 22,
    },
    button: {
        backgroundColor: '#89EBF6',
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '600',
    },
    input: {
        fontSize: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#DEDEDE',
        borderRadius: 30,
        color: 'black',
        marginBottom: 12,
        backgroundColor: '#D9D9D9',
    },
    inputBusca: {
        fontSize: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 2.5,
        borderColor: '#89EBF6',
        borderRadius: 30,
        color: 'black',
        marginBottom: 12,
        backgroundColor: '#FFF',
        height: 50,
    }
});
