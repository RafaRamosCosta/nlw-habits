import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/inter';
import * as Notifications from 'expo-notifications';
import { Button, StatusBar } from 'react-native';
import { Loading } from './src/components/Loading';
import './src/lib/dayjs';
import { Routes } from './src/routes';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [loadedFonts] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  async function scheduleNotification() {
    const trigger = new Date(Date.now());
    trigger.setMinutes(trigger.getMinutes() + 0.3);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Olá, Rafael! 🙃',
        body: 'Você praticou seus hábitos hoje?',
      },
      trigger,
    });
  }

  async function getScheduledNotifications() {
    const schedules = await Notifications.getAllScheduledNotificationsAsync();
    console.log(schedules);
  }

  if (!loadedFonts) return <Loading />;

  return (
    <>
      <Button title="Enviar" onPress={scheduleNotification} />
      <Button title="Ver notificações" onPress={getScheduledNotifications} />
      <Routes />
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
    </>
  );
}
