import axios, { AxiosResponse } from 'axios';
import Logger from './Logger';

interface ExpectedAPIResponse {
  username: string;
  uuid: string;
  ownedCosmetics: string[];
}

export const connectedUsers: { username: string; equippedCosmetics: string[] }[] = [];

export default class WebSocketManager {
  public static async getPlayersOwnedCosmetics(username: string): Promise<string> {
    const apiURI = `http://localhost:8080/user/${username}`;

    try {
      const response: AxiosResponse<ExpectedAPIResponse[]> = await axios.get(apiURI);
      const userData = response.data;
      Logger.debug("USERDATA", JSON.stringify(userData));
      return JSON.stringify(userData);
    } catch (error) {
      Logger.error(error);
      return JSON.stringify({ status: 500, body: 'Internal Server Error' });
    }
  }

    public static async updatePlayerCosmetics(username: string, equippedCosmetics: string[]): Promise<void> {
        const userIndex = connectedUsers.findIndex((user) => user.username === username);

        if (userIndex !== -1) {
            // User found in connectedUsers
            const user = connectedUsers[userIndex];

            // Assuming that getPlayersOwnedCosmetics returns an object with an 'ownedCosmetics' property
            const ownedCosmetics = JSON.parse(await this.getPlayersOwnedCosmetics(username)).ownedCosmetics;

            // Check and update equipped cosmetics
            for (const cosmetic of equippedCosmetics) {
                if (ownedCosmetics.includes(cosmetic)) {
                    // Update the user's equipped cosmetics if owned
                    user.equippedCosmetics.push(cosmetic);
                }
            }

            // Save the updated user back to the connectedUsers list
            connectedUsers[userIndex] = user;
        } else {
            // User not found, add them to connectedUsers
            connectedUsers.push({ "username": username, "equippedCosmetics": equippedCosmetics });
        }
    }



}
