import { Component, OnInit,ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder,FormGroup, Validators,FormGroupDirective} from '@angular/forms'
import { Expenses } from 'src/app/model/expenses';
import { ExpensesService } from 'src/app/services/expenses.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
formValue !: FormGroup
@ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

allExpensesData:any
 date: Date = new Date();  
expensesData: Expenses = new Expenses()
  constructor(private api:ExpensesService,private formbuilder: FormBuilder) {
        this.formValue =   this.formbuilder.group({
          title:['',Validators.required],
          options:['',Validators.required],
          amount:['',Validators.required],
          datetime:[this.date]
         
        })
      
   }

  ngOnInit(): void {
    this.getExpenses()
    
    
  }
 
  addExpenses(){
    
    if (this.formValue.valid){
      this.expensesData = this.formValue.value
      this.api.createExpenses(this.expensesData)
      .subscribe(res=>{
        this.getExpenses()
      })
      
      this.formValue.markAsPristine()
      this.formValue.markAsUntouched()
      this.formValue.reset()
    }
    }
    clearForm(){
      this.formValue.markAsUntouched()
  }

  getExpenses(){
    this.api.getExpenses()
    .subscribe(res=>{
        this.allExpensesData = res
    })
  }


}
