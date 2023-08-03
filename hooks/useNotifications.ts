import * as Notifications from "expo-notifications";

import { NotificationBehavior } from "expo-notifications"

interface useNotificationsProps {
  behavior?: Partial<NotificationBehavior>
}

export function useNotifications(props?: useNotificationsProps | undefined) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      priority: Notifications.AndroidNotificationPriority.MAX,
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      ...(props?.behavior || {})
    }),
  });

  async function notify(title: string, body: string) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body
      },
      trigger: null,
    })
  }

  return { notify }
}
