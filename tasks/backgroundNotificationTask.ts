import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

import { useNotifications } from "../hooks/useNotifications";

export const TASK_NAME = "testing-background-task";

const { notify } = useNotifications();

BackgroundFetch.setMinimumIntervalAsync(1 * 60)

TaskManager.defineTask(TASK_NAME, async () => {
  notify("Background Notification Task", "Worked!");
  return BackgroundFetch.BackgroundFetchResult.NoData;
});

export async function registerBackgroundTaskAsync() {
  return BackgroundFetch.registerTaskAsync(TASK_NAME, {
    minimumInterval: 1 * 60,
    stopOnTerminate: false,
    startOnBoot: true,
  });
}

export async function unregisterBackgroundTaskAsync() {
  return BackgroundFetch.unregisterTaskAsync(TASK_NAME);
}

export async function isBackgroundNotificationsTaskRegistered(): Promise<boolean> {
  return TaskManager.isTaskRegisteredAsync(TASK_NAME);
}
