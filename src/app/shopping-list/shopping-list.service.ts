

import { Subject } from 'rxjs';
import { Ingredinet } from '../shared/ingredient.model';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredinet[]>();
    startEditing = new Subject<number>();
    ingredients: Ingredinet[] =[
        new Ingredinet('Apples',5),
        new Ingredinet('Strawberry',10)
     
      ];

      getIngredinets() {
          return this.ingredients.slice();
      }

      getIngredient(index: number) {
            return this.ingredients[index];
      }

      addIngredinet(ingredinet: Ingredinet){
          this.ingredients.push(ingredinet);
          this.ingredientsChanged.next(this.ingredients.slice());

      }

      addIngredinets(ingredinets: Ingredinet[]) {
          //for  (let ingredinet of ingredinets) {
            //  this.addIngredinet(ingredinet);
         // }
          this.ingredients.push(...ingredinets);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredient(index: number, newIngredinet: Ingredinet) {
          this.ingredients[index]= newIngredinet;
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index: number) {
          this.ingredients.splice(index,1);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

}