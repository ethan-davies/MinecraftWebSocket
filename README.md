# Minecraft WebSocket
This project is designed for Minecraft Clients/Modpacks to have a base WebSocket for their cosmetic systems.

## Setting Up
To setup the WebSocket you can run the following commands:
```bash
git clone https://github.com/ethan-davies/minecraft-ws.git
```

That will clone the repository to your current locatation. Please do note that you must have [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed for this to work. After that, you can `cd` into the directory by doing:

```bash
cd minecraft-ws
```

Then, install the packages by running
```bash
npm install
# or
yarn install
# or 
pnpm install
```

Finnaly, if you would like to run the WebSocket run
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

For connecting to the WebSocket please refer to [this](https://github.com/ethan-davies/minecraft-ws?tab=readme-ov-file#client-connections) section 

## Customisation
The whole idea of the Minecraft WebSocket is for it to be customisable for the clients needs. Here are some of the things that you can change and how:

- `Port`
    - The Port can be customised through the [`.env`](https://github.com/ethan-davies/minecraft-ws/blob/master/.env) under the `PORT` value. If not set this will default to 3000
- `validTypes`
    - You can customise the validTypes through the [`enums.ts`](https://github.com/ethan-davies/minecraft-ws/blob/master/src/websocket/enums.ts) file and add a custom reponse in the switch case within [`handleMessage.ts`](https://github.com/ethan-davies/minecraft-ws/blob/master/src/websocket/handleMessage.ts) 
- `defaultMessages`
    - Default messages are mostly found in the two files: [`handleMessage.ts`](https://github.com/ethan-davies/minecraft-ws/blob/master/src/websocket/handleMessage.ts) and [`index.ts`](https://github.com/ethan-davies/minecraft-ws/blob/master/src/index.ts)
- `Anything`
    - This project is open sourced so you can customise anything to your likings


## Client Connections
Connecting a client to your WebSocket will vary based on the langauge. However, I have gave a basic demonstration in how to use it in JavaScript. This can be found in the [connect.js](https://github.com/ethan-davies/minecraft-ws/blob/master/src/client/connect.js) file which is easily ran by running the `connect` script. You can use this JavaScript file to simulate a connection from your client for testing purposes. 