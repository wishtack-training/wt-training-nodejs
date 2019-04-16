import { Database, Statement } from 'sqlite3';
import { promisify } from 'util';
import { Recipe } from './recipe';

function promisifyDatabase(database: Database) {
    return {
        all: promisify(database.all.bind(database)),
        each: database.each.bind(database),
        prepare: database.prepare.bind(database),
        run: promisify(database.run.bind(database))
    };
}

export class RecipeRepository {

    private _database: {
        all,
        each,
        prepare,
        run
    };

    async addRecipe(recipe: Recipe) {

        const database = await this._getDatabase();

        const statement = database.prepare('INSERT INTO recipe VALUES (?, ?)');

        await statement.run(recipe.title, recipe.type);

    }

    async getRecipeList() {

        const database = await this._getDatabase();

        const dataList = await database.all('SELECT title, type FROM recipe');

        return dataList.map(data => new Recipe(data));

    }

    /**
     * @deprecated WIP
     * @param recipe
     */
    async removeRecipe(recipe) {
        throw new Error('😱 Not implemented yet!');
    }

    private async _getDatabase() {

        if (this._database) {
            return this._database;
        }

        const database = new Database(':memory:');

        const promisifiedDatabase = promisifyDatabase(database);

        await promisifiedDatabase
            .run('CREATE TABLE IF NOT EXISTS recipe (title VARCHAR(255), type VARCHAR(255))');

        return this._database = promisifiedDatabase;

    }

}
