import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesService } from '../../services/expenses/expenses.service';
import { Expense } from '../../interfaces/models/expense.model';
import { DayOfWeek } from '../../interfaces/models/day-of-week.type';
import { ExpenseComponent } from '../expense/expense.component';

@Component({
  selector: 'app-week-tabs',
  imports: [CommonModule, ExpenseComponent],
  templateUrl: './week-tabs.component.html',
})
export class WeekTabsComponent {
  daysOfWeek: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  selectedDay: DayOfWeek = 'Monday';
  expenses: Expense[] = [];
  showingSummary = false;
  groupedWeeklySummary: { day: DayOfWeek; expenses: { category: string; total: number }[] }[] = [];

  constructor(private expensesService: ExpensesService) {}

  ngOnInit(): void {
    this.getExpensesForDay(this.selectedDay);
  }

  getExpensesForDay(day: DayOfWeek): void {
    this.selectedDay = day;
    this.expenses = this.expensesService.getExpensesForDay(day);
    this.showingSummary = false;
  }

  addExpense(): void {
    const category = prompt('Enter expense category:');
    const amount = parseFloat(prompt('Enter expense amount:') || '0');
    if (category && !isNaN(amount)) {
      const newExpense: Expense = {
        expenseId: Date.now(),
        category,
        amount,
      };
      this.expensesService.addExpense(this.selectedDay, newExpense);
      this.getExpensesForDay(this.selectedDay);
    }
  }

  handleEditExpense(expense: Expense): void {
    const updatedCategory = prompt('Edit category:', expense.category);
    const updatedAmount = parseFloat(prompt('Edit amount:', expense.amount.toString()) || '0');
    if (updatedCategory && !isNaN(updatedAmount)) {
      const updatedExpense = { ...expense, category: updatedCategory, amount: updatedAmount };
      this.expensesService.editExpense(this.selectedDay, updatedExpense);
      this.getExpensesForDay(this.selectedDay);
    }
  }

  handleDeleteExpense(expenseId: number): void {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expensesService.deleteExpense(this.selectedDay, expenseId);
      this.getExpensesForDay(this.selectedDay);
    }
  }

  showSummary(): void {
    this.showingSummary = true;
    this.groupedWeeklySummary = this.expensesService.groupExpensesByDay();
  }

  calculateWeeklyTotal(): number {
    return this.expensesService.calculateWeeklyTotal();
  }
}
