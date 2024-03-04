import { type Action } from "redux";

export interface ActionReducer extends Action {
    payload: object
}