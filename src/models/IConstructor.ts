import {IIngredient} from "./IIngredient";

export interface IConstructor {
    ingredients: IIngredient[],
    availableIngredients: "bun" | "sauce" | "main" | "all",
    totalPrice: number,
}