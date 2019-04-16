export enum RecipeType {
    Salad = 'salad',
    Main = 'main',
    Dessert = 'dessert'
}

export class Recipe {

    title: string;
    type: RecipeType;
    ingredientList: string[];

    constructor(args: Partial<Recipe> = {}) {
        this.title = args.title;
        this.type = args.type;
        this.ingredientList = args.ingredientList || [];
    }

}
