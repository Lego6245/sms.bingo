import { Player } from "./Player";
import { SquareData } from "./SquareData";

export type FeedEvent = ChatEvent | NewCardEvent | GoalEvent | ColorEvent | RevealedEvent | ConnectionEvent;

export interface FeedEventCommon {
    player: Player,
    player_color: string,
    timestamp: number,
}

export interface ChatEvent extends FeedEventCommon {
    type: "chat",
    text: string,
}

export interface NewCardEvent extends FeedEventCommon {
    type: "new-card",
    game: string,
    seed: number,
    hide_card: boolean,
    is_current: boolean,
}

export interface GoalEvent extends FeedEventCommon {
    type: "goal",
    square: SquareData,
    color: string,
    remove: boolean,
}

export interface ColorEvent extends FeedEventCommon {
    type: "color",
    color: string,
}

export interface RevealedEvent extends FeedEventCommon {
    type: "revealed",
}

export interface ConnectionEvent extends FeedEventCommon {
    type: "connection",
    event_type: "connected" | "disconnected"
}
