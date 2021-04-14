import AvatarConfigurationType from "../core/types/AvatarConfigurationType";

export type PlayerStorageType = {
    name: string,
    avatar: AvatarConfigurationType
}

const LOCAL_STORAGE_NAME = "player";

export default class PlayerStorage {
    /**
     * Gets saved player from local storage or null if nothing was saved previously
     * @returns {PlayerStorageType | null}
     */
    static getPlayer() : PlayerStorageType | null {
        const roles = window.localStorage.getItem(LOCAL_STORAGE_NAME);
        if (!roles)
            return null;
        else
            return  JSON.parse(roles);
    }

    /**
     * Sets new player data to local storage
     * @param {PlayerStorageType} player to be saved
     */
    static setPlayer(player: PlayerStorageType) {
        window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(player));
    }

    /**
     * Removes player data from local storage
     */
    static removePlayer(){
        window.localStorage.removeItem(LOCAL_STORAGE_NAME);
    }
}
