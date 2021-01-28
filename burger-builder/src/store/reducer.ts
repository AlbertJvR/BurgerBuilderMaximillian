import { ActionType, AppActions } from './actions';

const INGREDIENT_PRICES: Ingredients = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

export type Ingredients = {salad: number, bacon: number, cheese: number, meat: number}

export interface AppState {
    ingredients: any,
    totalPrice: number
}

const initialState = {
    ingredients: {
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0
    },
    totalPrice: 4
}

const reducer = (state: AppState = initialState, action: AppActions): AppState => {
    switch (action.type) {
        case ActionType.AddIngredient:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName as keyof Ingredients]
            };
        case ActionType.RemoveIngredient:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName as keyof Ingredients]
            };
        default:
            return state;
    }
}

export default reducer;

