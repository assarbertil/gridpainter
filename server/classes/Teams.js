export class Teams {
    teams = [];
    constructor() { }
    team = {
        create: (teamName) => {
            const newTeam = {
                name: teamName,
                state: "preGame",
                players: [],
            };
            this.teams = [...this.teams, newTeam];
        },
        delete: (teamName) => {
            this.teams = this.teams.filter(team => team.name !== teamName);
        },
        changeState: (teamName, state) => {
            this.teams = this.teams.map(team => ({
                ...team,
                state: team.name === teamName ? state : team.state,
            }));
        },
        findByName: (teamName) => {
            return this.teams.find(team => team.name === teamName);
        },
        addPlayer: (teamName, player) => {
            this.teams = this.teams.map(team => ({
                ...team,
                players: team.name === teamName ? [...team.players, player] : team.players,
            }));
        },
        removePlayer: (playerSid, teamName) => {
            this.teams = this.teams.map(team => ({
                ...team,
                players: team.name === teamName
                    ? team.players.filter(user => user.sid !== playerSid)
                    : team.players,
            }));
        },
        getPlayers: (teamName) => {
            const team = this.team.findByName(teamName);
            return team ? team.players : [];
        },
    };
    player = {
        findBySid: (playerSid) => {
            const team = this.player.getTeam(playerSid);
            if (!team) {
                return undefined;
            }
            return team.players.find(user => user.sid === playerSid);
        },
        getTeam: (playerSid) => {
            return this.teams.find(team => team.players.some(user => user.sid === playerSid));
        },
    };
}
