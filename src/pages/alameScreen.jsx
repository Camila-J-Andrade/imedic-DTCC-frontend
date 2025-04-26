import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import * as Calendar from "expo-calendar";
import * as Notifications from "expo-notifications";
import DateTimePickerModal from "react-native-modal-datetime-picker";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

export default function AlarmScreen() {
	const [alarmDate, setAlarmDate] = useState(new Date());
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [hasPermission, setHasPermission] = useState(false);
	const [alarms, setAlarms] = useState([]);
	const [alarmTitle, setAlarmTitle] = useState("");
	const [alarmDescription, setAlarmDescription] = useState("");
	const alarmMap = useRef({});

	useEffect(() => {
		(async () => {
			const { status: calendarStatus } = await Calendar.requestCalendarPermissionsAsync();
			const { status: notifStatus } = await Notifications.requestPermissionsAsync();

			if (calendarStatus === "granted") {
				setHasPermission(true);
				await loadAlarms();
			} else {
				Alert.alert("Permissão necessária", "O aplicativo precisa acessar o calendário.");
				setHasPermission(false);
			}

			if (notifStatus !== "granted") {
				Alert.alert("Permissão de notificação necessária", "Para tocar som no alarme.");
			}
		})();

		const subscription = Notifications.addNotificationReceivedListener(async (notification) => {
			const notifId = notification.request.identifier;
			const eventId = alarmMap.current[notifId];

			if (eventId) {
				try {
					await Calendar.deleteEventAsync(eventId);
					console.log("⛔ Evento excluído após notificação:", eventId);
					setAlarms((prevAlarms) => prevAlarms.filter((alarm) => alarm.id !== eventId));
				} catch (error) {
					console.error("Erro ao excluir evento:", error);
				}
			}
		});

		return () => {
			subscription.remove();
		};
	}, []);

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

	const scheduleNotification = async (date, eventId) => {
		const now = new Date();
		if (date <= now) {
			Alert.alert("Erro", "Escolha uma data futura para o alarme.");
			return;
		}

		const notificationId = await Notifications.scheduleNotificationAsync({
			content: {
				title: alarmTitle || "⏰ Alarme!",
				body: alarmDescription || "Está na hora do seu compromisso!",
				sound: "default",
			},
			trigger: {
				timestamp: date.getTime(),
				type: "date",
			},
		});

		alarmMap.current[notificationId] = eventId;
	};

	const createAlarmEvent = async () => {
		try {
			const calendarId = await getOrCreateCalendar();

			const event = await Calendar.createEventAsync(calendarId, {
				title: alarmTitle || "Meu Alarme",
				notes: alarmDescription,
				startDate: alarmDate,
				endDate: new Date(alarmDate.getTime() + 60000),
				timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
				alarms: [{ relativeOffset: 0, method: Calendar.AlarmMethod.ALERT }],
			});

			await scheduleNotification(alarmDate, event.id);
			await loadAlarms();

			// Agora salva no banco
			await fetch('http://35.199.71.92:3333/alarmes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					titulo: alarmTitle,
					descricao: alarmDescription,
					data_hora: alarmDate.toISOString(),
				}),
			})
				.then(response => {
					if (!response.ok) {
						throw new Error('Erro ao salvar alarme no servidor.');
					}
					console.log("✅ Alarme salvo no banco também!");
				})
				.catch(error => {
					console.error('Erro ao salvar alarme no banco:', error);
				});

			// Limpa campos
			setAlarmTitle("");
			setAlarmDescription("");

			Alert.alert("✅ Alarme criado", `Alarme configurado para ${alarmDate.toLocaleString()}`);
		} catch (error) {
			console.error("Erro ao criar evento:", error);
		}
	};

	const loadAlarms = async () => {
		try {
			const calendarId = await getOrCreateCalendar();

			const now = new Date();
			const future = new Date();
			future.setFullYear(now.getFullYear() + 1);

			const events = await Calendar.getEventsAsync([calendarId], now, future);
			setAlarms(events);
		} catch (error) {
			console.error("Erro ao carregar alarmes:", error);
			Alert.alert("Erro", "Não foi possível carregar os alarmes.");
		}
	};

	const handleConfirm = (date) => {
		setAlarmDate(date);
		setDatePickerVisibility(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				{/* Header */}
				<View style={styles.row}>
					<Image
						source={require("../assets/icon de relogio.png")}
						resizeMode="stretch"
						style={styles.image}
					/>
					<View style={styles.box} />
					<Text style={styles.text}>{"Meus alarmes:"}</Text>
				</View>

				{/* Botão de Adicionar Alarme */}
				<View style={styles.view2}>
					<TouchableOpacity style={styles.button} onPress={() => setDatePickerVisibility(true)}>
						<Text style={styles.text2}>Adicionar alarme</Text>
					</TouchableOpacity>
				</View>

				{/* Inputs */}
				<View style={{ paddingHorizontal: 20 }}>
					<TextInput
						placeholder="Título do Alarme"
						value={alarmTitle}
						onChangeText={setAlarmTitle}
						style={styles.input}
					/>

					<TextInput
						placeholder="Descrição do Alarme"
						value={alarmDescription}
						onChangeText={setAlarmDescription}
						multiline
						numberOfLines={3}
						style={[styles.input, { height: 80 }]}
					/>

					<DateTimePickerModal
						isVisible={isDatePickerVisible}
						mode="datetime"
						date={alarmDate}
						onConfirm={handleConfirm}
						onCancel={() => setDatePickerVisibility(false)}
					/>

					{/* Botão Criar Alarme */}
					<View style={styles.view2}>
						<TouchableOpacity style={styles.button} onPress={createAlarmEvent} disabled={!hasPermission}>
							<Text style={styles.text2}>Criar Alarme</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Listagem de Alarmes */}
				<View style={{ marginTop: 40, paddingHorizontal: 20 }}>
					<Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
						🔔 Alarmes Criados:
					</Text>

					{alarms.length === 0 ? (
						<Text style={{ color: "#666" }}>Nenhum alarme encontrado.</Text>
					) : (
						alarms
							.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
							.map((event) => (
								<View
									key={event.id}
									style={styles.card}
								>
									<Text style={{ fontWeight: "bold", color: "#fff" }}>{event.title}</Text>
									<Text style={{ color: "#fff" }}>🗓️ Início: {new Date(event.startDate).toLocaleString()}</Text>
									<Text style={{ color: "#fff" }}>🛑 Fim: {new Date(event.endDate).toLocaleString()}</Text>
									{event.notes && <Text style={{ color: "#fff" }}>📝 {event.notes}</Text>}
								</View>
							))
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF6EE",
	},
	box: {
		flex: 1,
	},
	button: {
		alignItems: "center",
		backgroundColor: "#89EBF6",
		borderRadius: 14,
		paddingVertical: 8,
		paddingHorizontal: 55,
		shadowColor: "#00000040",
		shadowOpacity: 0.3,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowRadius: 4,
		elevation: 4,
		marginTop: 20,
	},
	image: {
		width: 70,
		height: 70,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 36,
		marginTop: 10,
	},
	text: {
		color: "#000000",
		fontSize: 20,
		fontWeight: "bold",
		marginVertical: 28,
		marginRight: 42,
	},
	text2: {
		color: "#000000",
		fontSize: 16,
		fontWeight: "bold",
	},
	view2: {
		alignItems: "center",
		marginBottom: 20,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 10,
		marginBottom: 10,
		backgroundColor: "#fff",
	},
	card: {
		marginBottom: 15,
		padding: 10,
		backgroundColor: "#1C6789",
		borderRadius: 20,
		shadowColor: "#000",
		shadowOpacity: 0.3,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowRadius: 4,
		elevation: 5,
	},
});
