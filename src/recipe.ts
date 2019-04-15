export class Recipe {

    title: string;
    type: string;
    ingredientList: string[];

    constructor(title, type, ingredientList) {
        this.title = title;
        this.type = type;
        this.ingredientList = ingredientList;
    }

}
