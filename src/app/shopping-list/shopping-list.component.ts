import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Ingredinet } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
 ingredients!: Ingredinet[];
 
 private igChangeSub!: Subscription;
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients=this.slService.getIngredinets();
    this.igChangeSub=this.slService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredinet[]) => {
        this.ingredients= ingredients;
      }
    );
  }

  onEditItem(index: number){
    this.slService.startEditing.next(index);

  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
  

}
