import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Expense } from '../../interfaces/models/expense.model';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  standalone: true,
})
export class ExpenseComponent {
  @Input() expense!: Expense;
  @Output() edit = new EventEmitter<Expense>();
  @Output() delete = new EventEmitter<number>();

  onEdit(): void {
    this.edit.emit(this.expense);
  }

  onDelete(): void {
    this.delete.emit(this.expense.expenseId);
  }
}
