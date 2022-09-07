import { nanoid } from "nanoid"
import { empty } from "../empty.js"

type TeamStates = "preGame" | "inGame" | "endGame"

interface Player {
  sid: string
  name: string
}

interface Team {
  id: string
  name: string
  state: TeamStates
  players: Player[]
  pixelData: (null | string)[][]
  startTime?: number
  endTime?: number
  facitId?: string
}

export class Teams {
  teams: Team[] = []

  constructor() {}

  team = {
    create: (teamName: string): void => {
      const newTeam: Team = {
        id: nanoid(),
        name: teamName,
        state: "preGame",
        players: [],
        pixelData: empty.pixelData,
      }

      this.teams = [...this.teams, newTeam]
    },

    delete: (teamName: string): void => {
      this.teams = this.teams.filter((team) => team.name !== teamName)
    },

    getState: (teamName: string): TeamStates | undefined => {
      const state = this.team.findByName(teamName)
      if (state !== undefined) {
        return state.state
      }
    },

    changeState: (teamName: string, state: TeamStates): void => {
      this.teams = this.teams.map((team) => ({
        ...team,
        state: team.name === teamName ? state : team.state,
      }))
    },

    findByName: (teamName: string): Team | undefined => {
      return this.teams.find((team) => team.name === teamName)
    },

    addPlayer: (teamName: string, player: Player): void => {
      this.teams = this.teams.map((team) => ({
        ...team,
        players:
          team.name === teamName ? [...team.players, player] : team.players,
      }))
    },

    removePlayer: (playerSid: string, teamName: string): void => {
      this.teams = this.teams.map((team) => ({
        ...team,
        players:
          team.name === teamName
            ? team.players.filter((user) => user.sid !== playerSid)
            : team.players,
      }))
    },

    getPlayers: (teamName: string): Player[] => {
      const team = this.team.findByName(teamName)
      return team ? team.players : []
    },

    addPixel: (teamName: string, x: number, y: number, color: string): void => {
      const team = this.team.findByName(teamName)

      if (team) {
        team.pixelData[y][x] = color
      }
    },
  }

  player = {
    findBySid: (playerSid: string): Player | undefined => {
      const team = this.player.getTeam(playerSid)
      if (!team) {
        return undefined
      }

      return team.players.find((user) => user.sid === playerSid)
    },

    getTeam: (playerSid: string): Team | undefined => {
      return this.teams.find((team) =>
        team.players.some((user) => user.sid === playerSid)
      )
    },
  }
}

// Testing
/* 
const t = new Teams()

console.log("Should be empty array")
console.log(t.teams)

t.team.create("Team 1")

console.log(t.teams)

t.team.addPlayer("Team 1", { sid: "ply_1xfg", name: "Assar" })

console.log(t.teams)

const playerBySid = t.player.findBySid("ply_1xfg")
console.log(playerBySid)

const teamOfPlayer = t.player.getTeam(playerBySid!.sid)
console.log(teamOfPlayer)

t.team.removePlayer("ply_1xfg", "Team 1")
console.log(t.teams)

t.team.delete("Team 1")
console.log(t.teams)
 */
