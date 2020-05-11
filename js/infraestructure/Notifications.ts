import PushNotification from 'react-native-push-notification';

class Notifications {
  private lastId: number = 0;

  constructor(onNotification: any) {
    this.configure(onNotification);
  }

  configure(onNotification: any) {
    PushNotification.configure({
      onNotification: onNotification,

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
    });
  }

  localNotification() {
    this.lastId++;
    PushNotification.localNotification({
      title: 'Local Notification',
      message: 'My Notification Message',
      playSound: false,
      soundName: 'default',
      actions: '["Yes", "No"]',
    });
  }

  //Appears after a specified time. App does not have to be open.
  scheduleNotification() {
    const nineAM = new Date(Date.now());
    nineAM.setHours(9);
    nineAM.setMinutes(0);
    nineAM.setSeconds(0);

    this.lastId++;
    PushNotification.localNotificationSchedule({
      date: nineAM,
      title: 'Es hora de tu autoevaluación diaria',
      message: 'Revisemos como están tus sintomas',
      playSound: true,
      soundName: 'default',
    });
  }

  checkPermission(cbk: any) {
    return PushNotification.checkPermissions(cbk);
  }

  cancelNotif() {
    PushNotification.cancelLocalNotifications({ id: '' + this.lastId });
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}

export default Notifications;
