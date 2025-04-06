// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import RadioGroup from 'react-native-radio-buttons-group';

// const MedicationForm = ({ navigation }) => {
//     const [medicationName, setMedicationName] = useState('');
//     const [nickname, setNickname] = useState('');
//     const [dosage, setDosage] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [selectedTarja, setSelectedTarja] = useState('');
//     const [selectedType, setSelectedType] = useState('Líquido');

//     // Novos estados para dados do tratamento
//     const [treatmentDosage, setTreatmentDosage] = useState('');
//     const [interval, setInterval] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');

//     const radioButtons = [
//         { id: 'Comprimido', label: 'Comprimido', value: 'Comprimido' },
//         { id: 'Líquido', label: 'Líquido', value: 'Líquido' }
//     ];

//     return (
//         <ScrollView>
//             <View style={styles.container}>
//                 <Text style={styles.title}>Dados do medicamento</Text>

//                 <TextInput
//                     style={styles.input}
//                     placeholder="Nome do medicamento"
//                     value={medicationName}
//                     onChangeText={setMedicationName}
//                 />

//                 <TextInput
//                     style={styles.input}
//                     placeholder="Apelido comum"
//                     value={nickname}
//                     onChangeText={setNickname}
//                 />

//                 <RadioGroup
//                     radioButtons={radioButtons}
//                     onPress={(value) => setSelectedType(value)}
//                     selectedId={selectedType}
//                     layout="row"
//                 />

//                 {selectedType === 'Líquido' ? (
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Dosagem em ml"
//                         keyboardType="numeric"
//                         value={dosage}
//                         onChangeText={setDosage}
//                     />
//                 ) : (
//                     <>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Dosagem em mg"
//                             keyboardType="numeric"
//                             value={dosage}
//                             onChangeText={setDosage}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Qtd. de comprimidos"
//                             keyboardType="numeric"
//                             value={quantity}
//                             onChangeText={setQuantity}
//                         />
//                     </>
//                 )}

//                 <Picker
//                     selectedValue={selectedTarja}
//                     onValueChange={(itemValue) => setSelectedTarja(itemValue)}
//                     style={styles.picker}
//                 >
//                     <Picker.Item label="Selecione a tarja" value="" />
//                     <Picker.Item label="Tarja Vermelha" value="vermelha" />
//                     <Picker.Item label="Tarja Preta" value="preta" />
//                     <Picker.Item label="Tarja Amarela" value="amarela" />
//                 </Picker>

//                 <Text style={styles.title}>Dados do tratamento</Text>

//                 <TextInput
//                     style={styles.input}
//                     placeholder="Dosagem"
//                     value={treatmentDosage}
//                     onChangeText={setTreatmentDosage}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Intervalo"
//                     value={interval}
//                     onChangeText={setInterval}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Data de início"
//                     keyboardType="numeric"
//                     value={startDate}
//                     onChangeText={setStartDate}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Data de término"
//                     keyboardType="numeric"
//                     value={endDate}
//                     onChangeText={setEndDate}
//                 />

//                 <Text style={styles.title}>Alarme</Text>
//                 <View style={styles.box1}>
//                     <Text style={styles.text2}>Próximo alarme</Text>
//                     <Text style={styles.text1}>{interval || '00:00'}</Text>
//                     <Text style={styles.text2}>À partir de:</Text>
//                     <Text style={styles.text1}>{startDate || '00/00/2025'}</Text>
//                 </View>

//                 <Text style={styles.title}>Minha rotina</Text>
//                 <View style={styles.box1}>
//                     <Text style={styles.text2}>Tomar {nickname || '[Nome do remédio]'}</Text>
//                     <Text style={styles.text1}>Segunda-feira</Text>
//                     <Text style={styles.text1}>{interval || '00:00 00:00 00:00'}</Text>
//                     <Text style={styles.text1}>Terça-feira</Text>
//                     <Text style={styles.text1}>{interval || '00:00 00:00 00:00'}</Text>
//                 </View>

//                 <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TabBar')}>
//                     <Text style={styles.textbutton}>Cadastrar tratamento</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('TabBar')}>
//                     <Text style={styles.textbutton}>Cancelar</Text>
//                 </TouchableOpacity>
//             </View>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#FDF6F0',
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         color: '#000',
//         textAlign: 'center',
//     },
//     input: {
//         width: '90%',
//         borderWidth: 2,
//         borderColor: '#00AEEF',
//         borderRadius: 20,
//         padding: 12,
//         marginBottom: 12,
//         backgroundColor: '#fff',
//         fontSize: 16,
//     },
//     picker: {
//         height: 30,
//         color: '#000',
//         width: 234,
//         borderRadius: 30,
//         backgroundColor: '#D9D9D9',
//         paddingHorizontal: 15,
//         paddingVertical: 5,
//     },
//     box1: {
//         backgroundColor: '#EAE9E8',
//         width: 234,
//         padding: 23,
//         borderRadius: 10,
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     button: {
//         backgroundColor: '#89EBF6',
//         width: 234,
//         height: 29,
//         padding: 5,
//         borderRadius: 26,
//         marginTop: 30,
//         marginBottom: 15,
//         justifyContent: 'flex-start',
//     },
//     textbutton: {
//         textAlign: 'center',
//         color: 'black',
//         fontWeight: 'bold',
//     },
//     button1: {
//         backgroundColor: '#D9D9D9',
//         width: 234,
//         height: 29,
//         padding: 5,
//         borderRadius: 26,
//         marginTop: 30,
//         marginBottom: 15,
//         justifyContent: 'flex-start',
//     },
//     text1: {
//         fontSize: 14,
//     },
//     text2: {
//         fontSize: 14,
//         fontWeight: 'bold',
//     },
// });

// export default MedicationForm;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RadioGroup from 'react-native-radio-buttons-group';
import { useTreatment } from '../components/TreatmentContext'; // <- Importa o contexto

const MedicationForm = ({ navigation }) => {
    const [medicationName, setMedicationName] = useState('');
    const [nickname, setNickname] = useState('');
    const [dosage, setDosage] = useState('');
    const [quantity, setQuantity] = useState('');
    const [selectedTarja, setSelectedTarja] = useState('');
    const [selectedType, setSelectedType] = useState('Líquido');

    const [treatmentDosage, setTreatmentDosage] = useState('');
    const [interval, setInterval] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { treatment, setTreatment } = useTreatment(); // <- Acessa o contexto

    const radioButtons = [
        { id: 'Comprimido', label: 'Comprimido', value: 'Comprimido' },
        { id: 'Líquido', label: 'Líquido', value: 'Líquido' }
    ];

    const handleSubmit = () => {
        const newTreatment = {
            medicationName,
            nickname,
            dosage,
            quantity,
            selectedTarja,
            selectedType,
            treatmentDosage,
            interval,
            startDate,
            endDate
        };

        setTreatment(prev => [...prev, newTreatment]);
        navigation.navigate('TabBar');
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Dados do medicamento</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nome do medicamento"
                    value={medicationName}
                    onChangeText={setMedicationName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Apelido comum"
                    value={nickname}
                    onChangeText={setNickname}
                />

                <RadioGroup
                    radioButtons={radioButtons}
                    onPress={(value) => setSelectedType(value)}
                    selectedId={selectedType}
                    layout="row"
                />

                {selectedType === 'Líquido' ? (
                    <TextInput
                        style={styles.input}
                        placeholder="Dosagem em ml"
                        keyboardType="numeric"
                        value={dosage}
                        onChangeText={setDosage}
                    />
                ) : (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Dosagem em mg"
                            keyboardType="numeric"
                            value={dosage}
                            onChangeText={setDosage}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Qtd. de comprimidos"
                            keyboardType="numeric"
                            value={quantity}
                            onChangeText={setQuantity}
                        />
                    </>
                )}

                <Picker
                    selectedValue={selectedTarja}
                    onValueChange={(itemValue) => setSelectedTarja(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Selecione a tarja" value="" />
                    <Picker.Item label="Tarja Vermelha" value="vermelha" />
                    <Picker.Item label="Tarja Preta" value="preta" />
                    <Picker.Item label="Tarja Amarela" value="amarela" />
                </Picker>

                <Text style={styles.title}>Dados do tratamento</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Dosagem"
                    value={treatmentDosage}
                    onChangeText={setTreatmentDosage}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Intervalo"
                    value={interval}
                    onChangeText={setInterval}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Data de início"
                    keyboardType="numeric"
                    value={startDate}
                    onChangeText={setStartDate}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Data de término"
                    keyboardType="numeric"
                    value={endDate}
                    onChangeText={setEndDate}
                />

                <Text style={styles.title}>Alarme</Text>
                <View style={styles.box1}>
                    <Text style={styles.text2}>Próximo alarme</Text>
                    <Text style={styles.text1}>{interval || '00:00'}</Text>
                    <Text style={styles.text2}>À partir de:</Text>
                    <Text style={styles.text1}>{startDate || '00/00/2025'}</Text>
                </View>

                <Text style={styles.title}>Minha rotina</Text>
                <View style={styles.box1}>
                    <Text style={styles.text2}>Tomar {nickname || '[Nome do remédio]'}</Text>
                    <Text style={styles.text1}>Segunda-feira</Text>
                    <Text style={styles.text1}>{interval || '00:00 00:00 00:00'}</Text>
                    <Text style={styles.text1}>Terça-feira</Text>
                    <Text style={styles.text1}>{interval || '00:00 00:00 00:00'}</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.textbutton}>Cadastrar tratamento</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('TabBar')}>
                    <Text style={styles.textbutton}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FDF6F0',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
        textAlign: 'center',
    },
    input: {
        width: '90%',
        borderWidth: 2,
        borderColor: '#00AEEF',
        borderRadius: 20,
        padding: 12,
        marginBottom: 12,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    picker: {
        height: 30,
        color: '#000',
        width: 234,
        borderRadius: 30,
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    box1: {
        backgroundColor: '#EAE9E8',
        width: 234,
        padding: 23,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#89EBF6',
        width: 234,
        height: 29,
        padding: 5,
        borderRadius: 26,
        marginTop: 30,
        marginBottom: 15,
        justifyContent: 'flex-start',
    },
    textbutton: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
    },
    button1: {
        backgroundColor: '#D9D9D9',
        width: 234,
        height: 29,
        padding: 5,
        borderRadius: 26,
        marginTop: 30,
        marginBottom: 15,
        justifyContent: 'flex-start',
    },
    text1: {
        fontSize: 14,
    },
    text2: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default MedicationForm;
