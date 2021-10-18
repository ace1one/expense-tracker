import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormGroup, Validators} from '@angular/forms'
import { Expenses } from 'src/app/model/expenses';
import { ExpensesService } from 'src/app/services/expenses.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
formValue !: FormGroup
allExpensesData:any
expensesData: Expenses = new Expenses()
  constructor(private api:ExpensesService,private formbuilder: FormBuilder) {
        this.formValue =   this.formbuilder.group({
          title:[''],
          options:[''],
          amount:['']
        })
   }

  ngOnInit(): void {
    this.getExpenses()
  }
 
  addExpenses(){
    this.expensesData = this.formValue.value
    this.api.createExpenses(this.expensesData)
    .subscribe(res=>{
      console.log("posted")
    })
  }

  getExpenses(){
    this.api.getExpenses()
    .subscribe(res=>{
        this.allExpensesData = res
    })
  }


}
