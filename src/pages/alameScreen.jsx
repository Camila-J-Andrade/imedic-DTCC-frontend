import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	Image,
	TextInput,
	Alert,
	Platform,
	ImageBackground,
	Animated,
} from "react-native";
import * as Calendar from "expo-calendar";
import * as Notifications from "expo-notifications";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather } from "@expo/vector-icons";

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
	const [selectedCard, setSelectedCard] = useState(null);

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
				await deleteAlarm(eventId);
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
		if (date <= new Date()) {
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

			setAlarmTitle("");
			setAlarmDescription("");

			Alert.alert("✅ Alarme criado", `Alarme configurado para ${alarmDate.toLocaleString()}`);
		} catch (error) {
			console.error("Erro ao criar evento:", error);
		}
	};

	const deleteAlarm = async (eventId) => {
		try {
			await Calendar.deleteEventAsync(eventId);
			setAlarms((prev) => prev.filter((alarm) => alarm.id !== eventId));
			console.log("⛔ Evento excluído:", eventId);
		} catch (error) {
			console.error("Erro ao excluir evento:", error);
		}
	};

	const loadAlarms = async () => {
		try {
			const calendarId = await getOrCreateCalendar();
			const now = new Date();
			const future = new Date(now.getFullYear() + 1, now.getMonth());
			const events = await Calendar.getEventsAsync([calendarId], now, future);
			setAlarms(events);
		} catch (error) {
			console.error("Erro ao carregar alarmes:", error);
		}
	};

	const handleConfirm = (date) => {
		setAlarmDate(date);
		setDatePickerVisibility(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<ImageBackground source={require("../assets/Rectangle 1.png")} style={styles.headerBackground}>
					<View style={styles.headerContent}>
						<Image source={require("../assets/icon de relogio.png")} style={styles.iconClock} />
						<Text style={styles.headerText}>Meus alarmes:</Text>
					</View>
				</ImageBackground>

				<View style={styles.view2}>
					<TouchableOpacity style={styles.button} onPress={() => setDatePickerVisibility(true)}>
						<Text style={styles.text2}>Adicionar hora e data</Text>
					</TouchableOpacity>
				</View>

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

					<View style={styles.view2}>
						<TouchableOpacity style={styles.button} onPress={createAlarmEvent} disabled={!hasPermission}>
							<Text style={styles.text2}>Criar Alarme</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={{ marginTop: 40, paddingHorizontal: 20 }}>
					<Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>🔔 Alarmes Criados:</Text>

					{alarms.length === 0 ? (
						<Text style={{ color: "#666" }}>Nenhum alarme encontrado.</Text>
					) : (
						alarms
							.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
							.map((event) => (
								<TouchableOpacity
									key={event.id}
									onPress={() => setSelectedCard(selectedCard === event.id ? null : event.id)}
								>
									<View style={styles.card}>
										<Text style={{ fontWeight: "bold", color: "#fff" }}>{event.title}</Text>
										<Text style={{ color: "#fff" }}>
											🗓️ Início: {new Date(event.startDate).toLocaleString()}
										</Text>
										<Text style={{ color: "#fff" }}>
											🛑 Fim: {new Date(event.endDate).toLocaleString()}
										</Text>
										{event.notes && <Text style={{ color: "#fff" }}>📝 {event.notes}</Text>}

										{selectedCard === event.id && (
											<Animated.View style={{ marginTop: 10, alignItems: "flex-end" }}>
												<TouchableOpacity onPress={() => deleteAlarm(event.id)}>
													<Feather name="trash-2" size={24} color="white" />
												</TouchableOpacity>
											</Animated.View>
										)}
									</View>
								</TouchableOpacity>
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
	headerBackground: {
		width: "100%",
		height: 150,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 25,
		borderRadius: 5,
		overflow: "hidden",
	},
	headerContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	iconClock: {
		width: 70,
		height: 70,
		marginRight: 10,
	},
	headerText: {
		color: "#000000",
		fontSize: 24,
		fontWeight: "bold",
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
		borderColor: "#CCCCCC",
		borderWidth: 1,
		borderRadius: 8,
		padding: 10,
		marginVertical: 10,
		backgroundColor: "#FFF",
		fontSize: 16,
	},
	card: {
		backgroundColor: "#1C6789",
		padding: 15,
		borderRadius: 8,
		marginBottom: 15,
	},
});
