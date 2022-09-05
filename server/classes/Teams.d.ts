declare type TeamStates = "preGame" | "inGame" | "endGame";
interface Player {
    sid: string;
    name: string;
}
interface Team {
    id: string;
    name: string;
    state: TeamStates;
    players: Player[];
    pixelData: (null | string)[][];
    startTime?: number;
    endTime?: number;
    facitId?: string;
}
export declare class Teams {
    private teams;
    constructor();
    team: {
        create: (teamName: string) => void;
        delete: (teamName: string) => void;
        getState: (teamName: string) => TeamStates | undefined;
        changeState: (teamName: string, state: TeamStates) => void;
        findByName: (teamName: string) => Team | undefined;
        addPlayer: (teamName: string, player: Player) => void;
        removePlayer: (playerSid: string, teamName: string) => void;
        getPlayers: (teamName: string) => Player[];
        addPixel: (teamName: string, x: number, y: number, color: string) => void;
    };
    player: {
        findBySid: (playerSid: string) => Player | undefined;
        getTeam: (playerSid: string) => Team | undefined;
    };
}
export {};
