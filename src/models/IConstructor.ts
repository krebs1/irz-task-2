import {IIngredient} from "./IIngredient";

interface IConstructorIngredient extends IIngredient{
    key: string,
}

export interface IConstructor {
    ingredients: IConstructorIngredient[],
    availableIngredients: "bun" | "sauce" | "main" | "all",
    totalPrice: number,
}