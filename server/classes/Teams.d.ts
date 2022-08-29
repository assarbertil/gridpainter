declare type TeamStates = "preGame" | "inGame" | "endGame";
interface Player {
    sid: string;
    name: string;
}
interface Team {
    name: string;
    state: TeamStates;
    players: Player[];
}
export declare class Teams {
    teams: Team[];
    constructor();
    team: {
        create: (teamName: string) => void;
        delete: (teamName: string) => void;
        changeState: (teamName: string, state: TeamStates) => void;
        findByName: (teamName: string) => Team | undefined;
        addPlayer: (teamName: string, player: Player) => void;
        removePlayer: (playerSid: string, teamName: string) => void;
        getPlayers: (teamName: string) => Player[];
    };
    player: {
        findBySid: (playerSid: string) => Player | undefined;
        getTeam: (playerSid: string) => Team | undefined;
    };
}
export {};
