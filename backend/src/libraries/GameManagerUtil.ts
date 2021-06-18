import CardEnum from "../core/types/CardEnum";
import PlayerType from "../core/types/PlayerType";

export default class GameManagerUtil {

    /**
     * Hides player data if current user should not know it
     * @param {PlayerType[]} players with all player data
     * @param {PlayerType} player current player
     * @param {boolean} dontHide player data (e.g. if game is over)
     * @returns {PlayerType[]} hidden players data
     */
    public static hidePlayerData(players: PlayerType[], player?: PlayerType, dontHide: boolean = false): PlayerType[] {
        return (JSON.parse(JSON.stringify(players))as PlayerType[]).map(p => {
            return {
                name: p.name,
                avatar: p.avatar,
                role: p.role,
                connected: p.connected,
                cards: p.cards?.map(c => { return {
                    visible: c.visible,
                    type: (dontHide || (player && player.name) === p.name || c.visible) ? c.type : CardEnum.UNKNOWN
                }}),
                mind: (dontHide || (player && player.name) === p.name) ? p.mind : undefined,
                inTurn: p.inTurn
            }
        })
    }
}