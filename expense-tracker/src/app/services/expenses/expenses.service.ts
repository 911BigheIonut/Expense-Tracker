import { Injectable } from '@angular/core';
import { Expense } from '../../interfaces/models/expense.model';
import { DayOfWeek } from '../../interfaces/models/day-of-week.type';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private expensesByDay: { [key in DayOfWeek]: Expense[] } = {
    Monday: [
      { expenseId: 1, category: 'Groceries', amount: 50 },
      { expenseId: 2, category: 'Transport', amount: 10 },
    ],
    Tuesday: [],
    Wednesday: [{ expenseId: 3, category: 'Shopping', amount: 100 }],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  getExpensesForDay(day: DayOfWeek): Expense[] {
    return this.expensesByDay[day];
  }

  addExpense(day: DayOfWeek, expense: Expense): void {
    this.expensesByDay[day].push(expense);
  }

  editExpense(day: DayOfWeek, updatedExpense: Expense): void {
    const expenses = this.expensesByDay[day];
    const index = expenses.findIndex((expense) => expense.expenseId === updatedExpense.expenseId);
    if (index > -1) {
      expenses[index] = updatedExpense;
    }
  }

  deleteExpense(day: DayOfWeek, expenseId: number): void {
    this.expensesByDay[day] = this.expensesByDay[day].filter((expense) => expense.expenseId !== expenseId);
  }

  groupExpensesByDay(): { day: DayOfWeek; expenses: { category: string; total: number }[] }[] {
    return Object.entries(this.expensesByDay).map(([day, expenses]) => {
      if (expenses.length === 0) {
        return { day: day as DayOfWeek, expenses: [{ category: '-', total: 0 }] };
      }

      const categoryTotals: { [category: string]: number } = {};
      expenses.forEach((expense) => {
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
      });

      const groupedExpenses = Object.entries(categoryTotals).map(([category, total]) => ({
        category,
        total,
      }));

      return { day: day as DayOfWeek, expenses: groupedExpenses };
    });
  }

  calculateWeeklyTotal(): number {
    return Object.values(this.expensesByDay).reduce((weeklyTotal, expenses) => {
      return (
        weeklyTotal +
        expenses.reduce((dayTotal, expense) => dayTotal + expense.amount, 0)
      );
    }, 0);
  }
}
