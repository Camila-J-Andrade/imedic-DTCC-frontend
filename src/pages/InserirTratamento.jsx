import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform, Modal, Image, Pressable, ImageBackground } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Calendar from "expo-calendar";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function InserirTratamento({ navigation }) {
    const [nomeRemedio, setNomeRemedio] = useState("");
    const [miligramagem, setMiligramagem] = useState("");
    const [tipo, setTipo] = useState("");
    const [tarja, setTarja] = useState("");
    const [listaTarjas, setListaTarjas] = useState([]);
    const [descricao, setDescricao] = useState("");
    const [dataInicio, setDataInicio] = useState(new Date());
    const [dataFim, setDataFim] = useState(new Date());
    const [intervaloHoras, setIntervaloHoras] = useState("");


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [pickerMode, setPickerMode] = useState("inicio");

    const [modalVisible, setModalVisible] = useState(false);
    const [tarjaSelecionadaLabel, setTarjaSelecionadaLabel] = useState("Selecione uma tarja");

    const alarmMap = useRef({});

    useEffect(() => {
        (async () => {
            const { status: calendarStatus } = await Calendar.requestCalendarPermissionsAsync();
            const { status: notifStatus } = await Notifications.requestPermissionsAsync();

            if (calendarStatus !== "granted") {
                Alert.alert("Permissão necessária", "Conceda permissão para acessar o calendário.");
            }

            if (notifStatus !== "granted") {
                Alert.alert("Permissão de notificação necessária", "Conceda permissão para notificações.");
            }
        })();

        fetchTarjas();
    }, []);

    const fetchTarjas = async () => {
        try {
            const response = await fetch("http://34.95.189.56:3333/tarja");
            const data = await response.json();
            setListaTarjas(data);
        } catch (error) {
            console.error("Erro ao carregar tarjas:", error);
            Alert.alert("Erro", "Não foi possível carregar as tarjas do servidor.");
        }
    };

    const getOrCreateCalendar = async () => {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        const existing = calendars.find((c) => c.title === "Alarme Expo");
        if (existing) return existing.id;

        const defaultCalendarSource =
            Platform.OS === "ios"
                ? await Calendar.getDefaultCalendarSourceAsync()
                : { isLocalAccount: true, name: "Expo Calendar" };

        return await Calendar.createCalendarAsync({
            title: "Alarme Expo",
            color: "blue",
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: "Alarme",
            ownerAccount: "personal",
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });
    };

    const criarAlarmes = async () => {
        try {
            const calendarId = await getOrCreateCalendar();
            let atual = new Date(dataInicio);

            while (atual <= dataFim) {
                const novoEvento = await Calendar.createEventAsync(calendarId, {
                    title: `Tomar ${nomeRemedio}`,
                    notes: `Dose: ${miligramagem}mg\nTipo: ${tipo}\nTarja: ${tarjaSelecionadaLabel}\n${descricao}`,
                    startDate: atual,
                    endDate: new Date(atual.getTime() + 60000),
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    alarms: [{ relativeOffset: 0, method: Calendar.AlarmMethod.ALERT }],
                });

                const notificationId = await Notifications.scheduleNotificationAsync({
                    content: {
                        title: `Hora do Remédio: ${nomeRemedio}`,
                        body: `Dose: ${miligramagem}mg - ${tipo} - Tarja: ${tarjaSelecionadaLabel}`,
                        sound: "default",
                    },
                    trigger: {
                        timestamp: atual.getTime(),
                        type: "date",
                    },
                });

                alarmMap.current[notificationId] = novoEvento;
                atual = new Date(atual.getTime() + intervaloHoras * 3600 * 1000);
            }

            Alert.alert("Sucesso", "Todos os alarmes e o tratamento foram criados!");
        } catch (error) {
            console.error("Erro ao criar alarmes:", error);
            Alert.alert("Erro", "Não foi possível criar os alarmes e tratamento.");
        }
    };

    const cadastrarTratamento = async () => {
        try {
            const response = await fetch("http://34.95.189.56:3333/tratamento", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome_remedio: nomeRemedio,
                    id_tarja: tarja,
                    data_inicio: dataInicio,
                    data_fim: dataFim,
                    dosagem: miligramagem,
                }),
            });

            const resJson = await response.json();

            if (response.ok) {
                criarAlarmes();
                navigation.navigate('TabBar');
            } else {
                Alert.alert("Erro", resJson.message || "Falha ao cadastrar tratamento.");
            }
        } catch (error) {
            console.error("Erro ao cadastrar tratamento:", error);
            Alert.alert("Erro", "Erro ao cadastrar tratamento.");
        }
    };

    const handleConfirm = (date) => {
        if (pickerMode === "inicio") {
            setDataInicio(date);
        } else {
            setDataFim(date);
        }
        setDatePickerVisibility(false);
    };

    return (
        <ScrollView style={styles.container}>
            <ImageBackground
                source={require("../assets/Rectangle 1.png")}
                style={styles.headerBackground}
                resizeMode="cover"
            >
                <View style={styles.titleOverlay}>
                    <Image source={require("../assets/pilula.png")} style={styles.image} />
                    <Text style={styles.title}>Inserir Tratamento</Text>
                </View>
            </ImageBackground>

            <TextInput
                placeholder="Nome do remédio"
                value={nomeRemedio}
                onChangeText={setNomeRemedio}
                style={styles.input}
            />
            <TextInput
                placeholder="Miligramagem (mg)"
                value={miligramagem}
                onChangeText={setMiligramagem}
                keyboardType="numeric"
                style={styles.input}
            />
            {/* Marcação de Tipo (Comprimido/Líquido) */}
            <View style={styles.radioGroup}>
                <Text style={styles.radioLabel}>Tipo:</Text>
                <View style={styles.radioButtons}>
                    <TouchableOpacity
                        style={[styles.radioButton, tipo === "comprimido" && styles.selected]}
                        onPress={() => setTipo("comprimido")}
                    >
                        <Text style={styles.radioText}>Comprimido</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.radioButton, tipo === "liquido" && styles.selected]}
                        onPress={() => setTipo("liquido")}
                    >
                        <Text style={styles.radioText}>Líquido</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.label}>Tarja</Text>
            <TouchableOpacity
                style={styles.customPicker}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.customPickerText}>
                    {tarjaSelecionadaLabel}
                </Text>
            </TouchableOpacity>

            <Modal transparent visible={modalVisible} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {listaTarjas.map((item, index) => {
                            let backgroundColor = "#fff";
                            let color = "#000";
                            if (index === 0) backgroundColor = "#cccccc";
                            else if (index === 1) backgroundColor = "#ff0000";
                            else if (index === 2) backgroundColor = "#ffdd00";
                            else if (index === 3) {
                                backgroundColor = "#000000";
                                color = "#ffffff";
                            }

                            return (
                                <TouchableOpacity
                                    key={item.id_tarja}
                                    style={[styles.optionItem, { backgroundColor }]}
                                    onPress={() => {
                                        setTarja(item.id_tarja);
                                        setTarjaSelecionadaLabel(item.nome_tarja);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={[styles.optionText, { color }]}>
                                        {item.nome_tarja}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={{ fontWeight: "bold" }}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TextInput
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
                multiline
                style={[styles.input, { height: 80 }]}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setPickerMode("inicio");
                    setDatePickerVisibility(true);
                }}
            >
                <Text style={styles.buttonText}>Selecionar Data e Hora de Início</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setPickerMode("fim");
                    setDatePickerVisibility(true);
                }}
            >
                <Text style={styles.buttonText}>Selecionar Data e Hora de Fim</Text>
            </TouchableOpacity>

            <Text style={styles.dateText}>Início: {dataInicio.toLocaleString()}</Text>
            <Text style={styles.dateText}>Fim: {dataFim.toLocaleString()}</Text>

            <TextInput
                placeholder="Intervalo (em horas)"
                value={intervaloHoras}
                onChangeText={setIntervaloHoras}
                keyboardType="numeric"
                style={styles.input}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={cadastrarTratamento}
            >
                <Text style={styles.buttonText}>Cadastrar Tratamento</Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                date={pickerMode === "inicio" ? dataInicio : dataFim}
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
            />
            <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Voltar</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF6EE",
        padding: 7,
    },
    headerBackground: {
        width: 390,
        height: 170,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 35,
        borderRadius: 15,
        marginTop: -30,
        overflow: "hidden",
        padding: 1,
    },
    titleOverlay: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000", // se necessário, para contraste
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    customPicker: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        padding: 12,
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    customPickerText: {
        fontSize: 16,
        color: "#333",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "#fff",
        width: "80%",
        borderRadius: 15,
        padding: 20,
    },
    optionItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginBottom: 10,
    },
    optionText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    cancelButton: {
        marginTop: 10,
        alignItems: "center",
        padding: 10,
    },
    button: {
        backgroundColor: "#89EBF6",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 10,
    },
    buttonText: {
        color: "#000",
        fontWeight: "bold",
    },
    dateText: {
        marginBottom: 10,
        color: "#333",
        fontSize: 16,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    radioGroup: {
        marginBottom: 20,
    },
    radioLabel: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    radioButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    radioButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
    },
    selected: {
        backgroundColor: "#89EBF6",
    },
    radioText: {
        fontSize: 16,
        color: "#333",
    },
    backButton: {
        marginBottom: 10,
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 8,
    },
    backButtonText: {
        fontSize: 12,
        color: '#333',
        fontWeight: 'bold',
    },
});
