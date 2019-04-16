
export enum RecipeType {
    Salad = 'salad',
    Main = 'main',
    Dessert = 'dessert'
}

export class Recipe {

    title: string;
    type: RecipeType;
    ingredientList: string[];

    constructor({title, type, ingredientList}: { title: string, type: RecipeType, ingredientList: string[] }) {
        this.title = title;
        this.type = type;
        this.ingredientList = ingredientList;
    }

}
