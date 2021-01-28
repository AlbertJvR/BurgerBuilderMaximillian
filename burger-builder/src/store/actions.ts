import { Action } from 'redux';

export enum ActionType {
    AddIngredient = 'ADD_INGREDIENT',
    RemoveIngredient = 'REMOVE_INGREDIENT'
}

export function isAction<A extends Action>(action: Action, type: string): action is A {
    return action.type === type;
}

export interface IActionAddIngredient extends Action {
    type: ActionType.AddIngredient,
    ingredientName: string
}

export interface IActionRemoveIngredient extends Action {
    type: ActionType.RemoveIngredient,
    ingredientName: string
}

export type AppActions = IActionAddIngredient | IActionRemoveIngredient;