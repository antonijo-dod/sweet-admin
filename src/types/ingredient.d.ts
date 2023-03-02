export type Ingredient = {
    id: number
    name: string
    createdAt: string
    updatedAt: string
}

export type IngredientResponse = {
    data: Ingredient[]
    meta: {}
}