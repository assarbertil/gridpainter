import { empty } from "../empty.js";
import { nanoid } from "nanoid";
export class Teams {
    teams = [];
    constructor() { }
    team = {
        create: (teamName) => {
            const newTeam = {
                id: nanoid(),
                name: teamName,
                state: "preGame",
                players: [],
                pixelData: empty.pixelData,
            };
            this.teams = [...this.teams, newTeam];
        },
        delete: (teamName) => {
            this.teams = this.teams.filter((team) => team.name !== teamName);
        },
        getState: (teamName) => {
            const state = this.team.findByName(teamName);
            if (state !== undefined) {
                return state.state;
            }
        },
        changeState: (teamName, state) => {
            this.teams = this.teams.map((team) => ({
                ...team,
                state: team.name === teamName ? state : team.state,
            }));
        },
        findByName: (teamName) => {
            return this.teams.find((team) => team.name === teamName);
        },
        addPlayer: (teamName, player) => {
            this.teams = this.teams.map((team) => ({
                ...team,
                players: team.name === teamName ? [...team.players, player] : team.players,
            }));
        },
        removePlayer: (playerSid, teamName) => {
            this.teams = this.teams.map((team) => ({
                ...team,
                players: team.name === teamName
                    ? team.players.filter((user) => user.sid !== playerSid)
                    : team.players,
            }));
        },
        getPlayers: (teamName) => {
            const team = this.team.findByName(teamName);
            return team ? team.players : [];
        },
        addPixel: (teamName, x, y, color) => {
            const team = this.team.findByName(teamName);
            if (team) {
                team.pixelData[y][x] = color;
            }
        },
    };
    player = {
        findBySid: (playerSid) => {
            const team = this.player.getTeam(playerSid);
            if (!team) {
                return undefined;
            }
            return team.players.find((user) => user.sid === playerSid);
        },
        getTeam: (playerSid) => {
            return this.teams.find((team) => team.players.some((user) => user.sid === playerSid));
        },
    };
}
