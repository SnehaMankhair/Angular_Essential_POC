import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredinet } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm!: NgForm;
  subscription!: Subscription;
  editMode= false;
  editedItemIndex!: number;
  editedItem!: Ingredinet;
 
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription=this.slService.startEditing
    .subscribe(
      (index: number) => {
        this.editedItemIndex= index;
        this.editMode= true;
        this.editedItem=this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

    onSubmit(form: NgForm){
        const value= form.value;
        const newIngredinet= new Ingredinet(value.name,value.amount);
        if(this.editMode){
          this.slService.updateIngredient(this.editedItemIndex,newIngredinet);
        }else{
          this.slService.addIngredinet(newIngredinet);
        }
        this.editMode=false;
        form.reset();   
    }

    onClear(){
      this.slForm.reset();
      this.editMode=false;
    }

    onDelete(){
      this.slService.deleteIngredient(this.editedItemIndex);
      this.onClear();
      
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
}
