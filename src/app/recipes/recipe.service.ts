import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredinet } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    //recipeSelected = new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

//    private recipes: Recipe[] =[
//         new Recipe(
//         'Tasty Sandwich',
//         'A super tasty sandwich - just awesome',
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-SFnvQrtpCQWlAh2PU5IOz2JiVODhUuS2QA&usqp=CAU ',
//         [
//             new Ingredinet('Meat',1),
//             new Ingredinet('Cheese',1)

//         ]),
//         new Recipe(
//             'Big Fat Burger',
//             'The classic burger is an all time BBQ favourite!',
//             'https://realfood.tesco.com/media/images/Burger-31LGH-a296a356-020c-4969-86e8-d8c26139f83f-0-1400x919.jpg',
//             [
//                 new Ingredinet('Meat',1),
//                 new Ingredinet('Cheese',2),
//                 new Ingredinet('Buns',2),
               
//             ])
//       ];
      private recipes : Recipe[] = [];
      constructor(private slService: ShoppingListService){

      }

      setRecipes(recipes : Recipe[]) {
          this.recipes = recipes;
          this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index: number) {
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredinet[]){
          this.slService.addIngredinets(ingredients);

      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
         this.recipes[index] = newRecipe;
         this.recipesChanged.next(this.recipes.slice());
      }
      deleteRecipe(index: number){
         this.recipes.splice(index,1);
         this.recipesChanged.next(this.recipes.slice());
      }

}