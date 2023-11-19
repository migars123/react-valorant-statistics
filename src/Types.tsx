export interface Response {
    status: number;
    data:   Data[];
}

export interface Data {
    metadata:  Metadata;
    players:   Players;
    observers: any[];
    coaches:   any[];
    teams:     Teams;
    rounds:    null;
    kills:     null;
}

export interface Metadata {
    map:                string;
    game_version:       string;
    game_length:        number;
    game_start:         number;
    game_start_patched: string;
    rounds_played:      number;
    mode:               Mode;
    mode_id:            ModeID;
    queue:              Queue;
    season_id:          string;
    platform:           PlatformEnum;
    matchid:            string;
    premier_info:       PremierInfo;
    region:             Region;
    cluster:            Cluster;
}

export enum Cluster {
    Frankfurt = "Frankfurt",
    London = "London",
    Paris = "Paris",
}

export enum Mode {
    Competitive = "Competitive",
}

export enum ModeID {
    Competitive = "competitive",
}

export enum PlatformEnum {
    PC = "PC",
}

export interface PremierInfo {
    tournament_id: null;
    matchup_id:    null;
}

export enum Queue {
    Standard = "Standard",
}

export enum Region {
    Eu = "eu",
}

export interface Players {
    all_players: Player[];
    red:         Player[];
    blue:        Player[];
}

export interface Player {
    puuid:               string;
    name:                string;
    tag:                 string;
    team:                TeamEnum;
    level:               number;
    character:           string;
    currenttier:         number;
    currenttier_patched: string;
    player_card:         string;
    player_title:        string;
    party_id:            string;
    session_playtime:    SessionPlaytime;
    behavior:            Behavior;
    platform:            PlatformClass;
    ability_casts:       AbilityCasts;
    assets:              Assets;
    stats:               Stats;
    economy:             Economy;
    damage_made:         number;
    damage_received:     number;
}

export interface AbilityCasts {
    c_cast: number;
    q_cast: number;
    e_cast: number;
    x_cast: number;
}

export interface Assets {
    card:  Card;
    agent: Agent;
}

export interface Agent {
    small:    string;
    bust:     string;
    full:     string;
    killfeed: string;
}

export interface Card {
    small: string;
    large: string;
    wide:  string;
}

export interface Behavior {
    afk_rounds:      number;
    friendly_fire:   FriendlyFire;
    rounds_in_spawn: number;
}

export interface FriendlyFire {
    incoming: number;
    outgoing: number;
}

export interface Economy {
    spent:         LoadoutValue;
    loadout_value: LoadoutValue;
}

export interface LoadoutValue {
    overall: number;
    average: number;
}

export interface PlatformClass {
    type: PlatformEnum;
    os:   OS;
}

export interface OS {
    name:    Name;
    version: Version;
}

export enum Name {
    Windows = "Windows",
}

export enum Version {
    The10019042176864Bit = "10.0.19042.1.768.64bit",
    The10019043125664Bit = "10.0.19043.1.256.64bit",
    The10019044125664Bit = "10.0.19044.1.256.64bit",
    The10019045125664Bit = "10.0.19045.1.256.64bit",
    The10019045176864Bit = "10.0.19045.1.768.64bit",
    The10022000125664Bit = "10.0.22000.1.256.64bit",
    The10022621125664Bit = "10.0.22621.1.256.64bit",
    The10022621176864Bit = "10.0.22621.1.768.64bit",
    The10022631125664Bit = "10.0.22631.1.256.64bit",
}

export interface SessionPlaytime {
    minutes?:     number;
    seconds:      number | null;
    milliseconds: number | null;
}

export interface Stats {
    score:     number;
    kills:     number;
    deaths:    number;
    assists:   number;
    bodyshots: number;
    headshots: number;
    legshots:  number;
}

export enum TeamEnum {
    Blue = "Blue",
    Red = "Red",
}

export interface Teams {
    red:  Team;
    blue: Team;
}

export interface Team {
    has_won:     boolean;
    rounds_won:  number;
    rounds_lost: number;
    roster:      null;
}
