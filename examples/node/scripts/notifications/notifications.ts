import { getAuthenticatedClientFromEthersWallet } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClientFromEthersWallet(wallet);

  const allNotifications = await client.notifications.fetch({});

  allNotifications.unwrap().items.map((notification) => {
    console.log(`Notification from all notification:`, JSON.stringify(notification, null, 2));
  });

  const notificationsFromSpecificApp = await client.notifications.fetch({
    where: {
      publishedOn: ['app-id'],
    },
  });

  notificationsFromSpecificApp.unwrap().items.map((notification) => {
    console.log(`Notification from specific app id:`, JSON.stringify(notification, null, 2));
  });
}

main();
