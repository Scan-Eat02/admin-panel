import { useCallback } from "react";
import { notification, NotificationArgsProps } from "antd";
type NotificationPlacement = NotificationArgsProps["placement"];
type NotificationMessage = NotificationArgsProps["message"];
type NotificationDescription = NotificationArgsProps["description"];
type NotificationDuration = NotificationArgsProps["duration"];
type NotificationType = "success" | "info" | "warning" | "error";

const useNotification = () => {
  const openNotification = useCallback(
    (
      type: NotificationType,
      message: NotificationMessage,
      description: NotificationDescription,
      placement: NotificationPlacement = "top",
      duration: NotificationDuration = 5
    ) => {
      notification[type]({
        message,
        description,
        placement,
        duration,
      });
    },
    []
  );

  return openNotification;
};

export default useNotification;
