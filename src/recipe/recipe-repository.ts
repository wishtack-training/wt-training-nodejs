import { Database, Statement } from 'sqlite3';
import { promisify } from 'util';
import { Recipe } from './recipe';

export class RecipeRepository {

    private _database: Database;

    async addRecipe(recipe: Recipe) {

        const database = await this._getDatabase();

        const statement = database.prepare('INSERT INTO recipe VALUES (?, ?)');

        const statementRun = promisify(statement.run.bind(statement)) as any;

        await statementRun(recipe.title, recipe.type);

    }

    async getRecipeList() {

        const database = await this._getDatabase();

        const all = promisify(database.all.bind(database));

        const dataList = await all('SELECT title, type FROM recipe');

        return dataList.map(data => new Recipe(data));

    }

    async removeRecipe(recipe) {

    }

    private async _getDatabase() {

        if (this._database) {
            return this._database;
        }

        this._database = new Database(':memory:');

        const run = promisify(this._database.run.bind(this._database));

        await run('CREATE TABLE IF NOT EXISTS recipe (title VARCHAR(255), type VARCHAR(255))');

        return this._database;

    }

}
