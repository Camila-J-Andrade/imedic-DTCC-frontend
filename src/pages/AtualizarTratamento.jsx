import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    Modal,
    Image
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as Calendar from "expo-calendar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AtualizarTratamento = ({ route, navigation }) => {
    const { tratamento } = route.params;
    const id = tratamento.id_tratamento;

    const [nomeRemedio, setNomeRemedio] = useState("");
    const [miligramagem, setMiligramagem] = useState("");
    const [tipo, setTipo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [intervaloHoras, setIntervaloHoras] = useState("");
    const [dataInicio, setDataInicio] = useState(new Date());
    const [dataFim, setDataFim] = useState(new Date());
    const [tarja, setTarja] = useState("");
    const [listaTarjas, setListaTarjas] = useState([]);
    const [tarjaSelecionadaLabel, setTarjaSelecionadaLabel] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [showInicio, setShowInicio] = useState(false);
    const [showFim, setShowFim] = useState(false);
    const [showHoraInicio, setShowHoraInicio] = useState(false);

    useEffect(() => {
        fetchTarjas();
        preencherDadosTratamento();
    }, []);

    // Atualiza o label da tarja sempre que tarja ou listaTarjas mudarem
    useEffect(() => {
        if (tarja && listaTarjas.length > 0) {
            const tarjaSelecionada = listaTarjas.find(
                (t) => String(t.id_tarja) === String(tarja)
            );
            setTarjaSelecionadaLabel(tarjaSelecionada ? tarjaSelecionada.nome_tarja : "");
        }
    }, [tarja, listaTarjas]);

    const fetchTarjas = async () => {
        try {
            const response = await fetch("http://35.247.196.19:3333/tarja");
            const data = await response.json();
            setListaTarjas(data);
        } catch (error) {
            console.error("Erro ao buscar tarjas:", error);
        }
    };

    const preencherDadosTratamento = () => {
        setNomeRemedio(tratamento.nome_remedio || "");
        setMiligramagem(String(tratamento.dosagem || ""));
        setTipo(tratamento.tipo || "");
        setDescricao(tratamento.descricao || "");
        setIntervaloHoras(String(tratamento.intervalo_horas || ""));
        setDataInicio(tratamento.data_inicio ? new Date(tratamento.data_inicio) : new Date());
        setDataFim(tratamento.data_fim ? new Date(tratamento.data_fim) : new Date());
        if (tratamento.id_tarja !== undefined && tratamento.id_tarja !== null) {
            setTarja(String(tratamento.id_tarja));
        }
    };

    const getTarjaColors = (nomeTarja) => {
        switch (nomeTarja.toLowerCase()) {
            case "vermelha":
                return { backgroundColor: "#FF0000", color: "#FFFFFF" };
            case "amarela":
                return { backgroundColor: "#FFFF00", color: "#000000" };
            case "preta":
                return { backgroundColor: "#000000", color: "#FFFFFF" };
            default:
                return { backgroundColor: "#CCCCCC", color: "#000000" };
        }
    };

    const getDefaultCalendarSource = async () => {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        const defaultCalendar = calendars.find(cal => cal.source?.name === "Default");
        return defaultCalendar ? defaultCalendar.source : calendars[0].source;
    };

    const criarEventos = async () => {
        try {
            const { status } = await Calendar.requestCalendarPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permissão negada", "Não foi possível acessar o calendário.");
                return;
            }

            const defaultCalendarSource = await getDefaultCalendarSource();

            const calendars = await Calendar.getCalendarsAsync();
            let calendar = calendars.find(cal => cal.title === "I-Medic");
            let calendarId;
            if (!calendar) {
                calendarId = await Calendar.createCalendarAsync({
                    title: "I-Medic",
                    color: "#00C9FF",
                    entityType: Calendar.EntityTypes.EVENT,
                    source: defaultCalendarSource,
                    name: "I-Medic Calendário",
                    ownerAccount: "personal",
                    accessLevel: Calendar.CalendarAccessLevel.OWNER,
                });
            } else {
                calendarId = calendar.id;
            }

            let data = new Date(dataInicio);
            const eventos = [];

            while (data <= dataFim) {
                const novoEventoId = await Calendar.createEventAsync(calendarId, {
                    title: nomeRemedio,
                    notes: descricao,
                    startDate: new Date(data),
                    endDate: new Date(data.getTime() + 30 * 60000),
                    timeZone: "America/Sao_Paulo",
                });

                eventos.push(String(novoEventoId));
                data = new Date(data.getTime() + parseInt(intervaloHoras) * 3600000);
            }

            await AsyncStorage.setItem(`eventos_${id}`, JSON.stringify(eventos));
        } catch (error) {
            console.log("Erro ao criar eventos:", error);
        }
    };

    const excluirEventosAntigos = async () => {
        try {
            const data = await AsyncStorage.getItem(`eventos_${id}`);
            if (data) {
                const eventos = JSON.parse(data);
                for (const eventoId of eventos) {
                    if (eventoId) {
                        await Calendar.deleteEventAsync(String(eventoId));
                    }
                }
                await AsyncStorage.removeItem(`eventos_${id}`);
            }
        } catch (error) {
            console.log("Erro ao excluir eventos antigos:", error);
        }
    };

    const atualizarTratamento = async () => {
        if (!nomeRemedio || !miligramagem || !tipo || !tarja || !intervaloHoras) {
            Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        try {
            const response = await fetch(`http://35.247.196.19:3333/tratamento/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome_remedio: nomeRemedio,
                    id_tarja: parseInt(tarja),
                    data_inicio: dataInicio.toISOString(),
                    data_fim: dataFim.toISOString(),
                    dosagem: miligramagem,
                    tipo,
                    descricao,
                    intervalo_horas: intervaloHoras,
                }),
            });

            const resJson = await response.json();

            if (response.ok) {
                await excluirEventosAntigos();
                await criarEventos();

                Alert.alert("Sucesso", "Tratamento atualizado com sucesso!");
                navigation.goBack();
            } else {
                Alert.alert("Erro", resJson.message || "Erro ao atualizar.");
            }
        } catch (error) {
            console.error("Erro ao atualizar tratamento:", error);
            Alert.alert("Erro", "Erro na atualização.");
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image source={require('../assets/pilula.png')} style={styles.image} />
                <Text style={styles.titulo}>Editar Tratamento</Text>

                <TextInput
                    placeholder="Nome do Remédio"
                    value={nomeRemedio}
                    onChangeText={setNomeRemedio}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Miligramagem"
                    value={miligramagem}
                    onChangeText={setMiligramagem}
                    keyboardType="numeric"
                    style={styles.input}
                />
                <View style={styles.radioGroup}>
                    <Text style={styles.radioLabel}>Tipo:</Text>
                    <View style={styles.radioButtons}>
                        {["comprimido", "liquido"].map((opcao) => (
                            <TouchableOpacity
                                key={opcao}
                                style={[styles.radioButton, tipo === opcao && styles.selected]}
                                onPress={() => setTipo(opcao)}
                            >
                                <Text style={[styles.radioText, tipo === opcao && styles.selectedText]}>
                                    {opcao.charAt(0).toUpperCase() + opcao.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <TextInput
                    placeholder="Descrição"
                    value={descricao}
                    onChangeText={setDescricao}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Intervalo de horas"
                    value={intervaloHoras}
                    onChangeText={setIntervaloHoras}
                    keyboardType="numeric"
                    style={styles.input}
                />

                <Text style={styles.label}>Tarja</Text>
                <TouchableOpacity style={styles.customPicker} onPress={() => setModalVisible(true)}>
                    <Text style={styles.customPickerText}>{tarjaSelecionadaLabel || "Selecione a tarja"}</Text>
                </TouchableOpacity>

                <Modal transparent visible={modalVisible} animationType="fade">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            {listaTarjas.map((item) => {
                                const { backgroundColor, color } = getTarjaColors(item.nome_tarja);
                                return (
                                    <TouchableOpacity
                                        key={item.id_tarja}
                                        style={[styles.optionItem, { backgroundColor }]}
                                        onPress={() => {
                                            setTarja(String(item.id_tarja));
                                            setTarjaSelecionadaLabel(item.nome_tarja);
                                            setModalVisible(false);
                                        }}
                                    >
                                        <Text style={[styles.optionText, { color }]}>{item.nome_tarja}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={{ fontWeight: "bold" }}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View style={styles.datas}>
                    <TouchableOpacity
                        onPress={() => setShowInicio(true)}
                        style={styles.dataBtn}
                    >
                        <Text>Data Início: {dataInicio.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    {showInicio && (
                        <DateTimePicker
                            value={dataInicio}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowInicio(false);
                                if (selectedDate) {
                                    setDataInicio(new Date(
                                        selectedDate.setHours(dataInicio.getHours(), dataInicio.getMinutes())
                                    ));
                                }
                            }}
                        />
                    )}

                    <TouchableOpacity
                        onPress={() => setShowHoraInicio(true)}
                        style={styles.dataBtn}
                    >
                        <Text>Hora Início: {dataInicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    </TouchableOpacity>
                    {showHoraInicio && (
                        <DateTimePicker
                            value={dataInicio}
                            mode="time"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowHoraInicio(false);
                                if (selectedDate) {
                                    setDataInicio(new Date(
                                        dataInicio.setHours(selectedDate.getHours(), selectedDate.getMinutes())
                                    ));
                                }
                            }}
                        />
                    )}

                    <TouchableOpacity
                        onPress={() => setShowFim(true)}
                        style={styles.dataBtn}
                    >
                        <Text>Data Fim: {dataFim.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    {showFim && (
                        <DateTimePicker
                            value={dataFim}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowFim(false);
                                if (selectedDate) {
                                    setDataFim(new Date(
                                        selectedDate.setHours(dataFim.getHours(), dataFim.getMinutes())
                                    ));
                                }
                            }}
                        />
                    )}
                </View>

                <TouchableOpacity style={styles.botao} onPress={atualizarTratamento}>
                    <Text style={styles.botaoTexto}>Atualizar Tratamento</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#FFF6EE" },
    titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    input: {
        backgroundColor: "#FFF",
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#DDD",
    },
    radioGroup: { marginBottom: 12 },
    radioLabel: { fontWeight: "bold", marginBottom: 8 },
    radioButtons: { flexDirection: "row", gap: 12 },
    radioButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 6,
    },
    selected: {
        backgroundColor: "#007AFF",
        borderColor: "#007AFF",
    },
    radioText: { color: "#000" },
    selectedText: { color: "#FFF" },
    label: { fontWeight: "bold", marginBottom: 8 },
    customPicker: {
        backgroundColor: "#FFF",
        padding: 12,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#CCC",
        marginBottom: 12,
    },
    customPickerText: { fontSize: 16 },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "#FFF",
        borderRadius: 15,
        padding: 20,
        width: "80%",
    },
    optionItem: {
        padding: 12,
        marginVertical: 6,
        borderRadius: 6,
        alignItems: "center",
    },
    optionText: {
        fontWeight: "bold",
        fontSize: 16,
    },
    cancelButton: {
        marginTop: 12,
        padding: 12,
        backgroundColor: "#DDD",
        borderRadius: 6,
        alignItems: "center",
    },
    datas: { marginBottom: 20 },
    dataBtn: {
        backgroundColor: "#FFF",
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#CCC",
    },
    botao: {
        backgroundColor: "#89EBF6",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 10,
    },
    botaoTexto: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    image: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginBottom: 20,
    },
});

export default AtualizarTratamento;
