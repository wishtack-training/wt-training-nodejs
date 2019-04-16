import { interval, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, filter, map, retry, switchMap, take } from 'rxjs/operators';
import { Recipe } from './recipe/recipe';
import { RecipeRepository } from './recipe/recipe-repository';


async function demo3() {

    const recipeRepository = new RecipeRepository();

    await recipeRepository.addRecipe(new Recipe({
        title: 'A'
    }));
    await recipeRepository.addRecipe(new Recipe({
        title: 'B'
    }));
    await recipeRepository.addRecipe(new Recipe({
        title: 'C'
    }));
    await recipeRepository.addRecipe(new Recipe({
        title: 'D'
    }));

    recipeRepository.getRecipes()
        .subscribe(data => {
            console.log(data);
        });

}

demo3();


function demo2() {
    const subject = new ReplaySubject();

    subject.subscribe(data => console.log(`A: ${data}`));

    subject.next(1);
    subject.next(2);

    subject
        .pipe(
            distinctUntilChanged()
        )
        .subscribe(data => console.log(`B: ${data}`));

    subject.next(3);
    subject.next(3);
    subject.next(4);
}


function demo1() {

    const source$ = interval(100);

    source$
        .pipe(
            map(data => data % 10),
            filter(data => {
                if (data === 8) {
                    throw new Error('test');
                }
                return data % 2 === 0;
            }),
            retry(3),
            take(10)
        )
        .subscribe({
            next: value => console.log(value),
            error: error => console.log('error'),
            complete: () => {
                console.log('DONE');
            }
        });
}
