import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View } from "react-native";

import {
  isBackgroundNotificationsTaskRegistered,
  registerBackgroundTaskAsync,
  unregisterBackgroundTaskAsync,
} from "./tasks/backgroundNotificationTask";

export default function App() {
  const [registered, setRegistered] = useState(false);

  return (
    <View style={styles.container}>
      {registered ? (
        <Button
          title="Unregister"
          onPress={async () => {
            await unregisterBackgroundTaskAsync();
            setRegistered(await isBackgroundNotificationsTaskRegistered());
          }}
        />
      ) : (
        <Button
          title="Register"
          onPress={async () => {
            await registerBackgroundTaskAsync();
            setRegistered(await isBackgroundNotificationsTaskRegistered());
          }}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
