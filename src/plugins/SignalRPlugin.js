import { HubConnectionBuilder } from "@microsoft/signalr";

const createSignalRConnection = () => {
  return new signalR.HubConnectionBuilder()
    .withUrl("/speedrun-timer-hub")
    .build();
}

export default {
  install: (app, options) => {
    let connection = createSignalRConnection();
    connection.start();
  },
};
