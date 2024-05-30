import { useMemo } from 'react';
import { useBudget } from '../hooks/useBudget';
import { ExpenseDetails } from './ExpenseDetails';

export const ExpenseList = () => {
  const { state } = useBudget();

  const filteredExpenses = state.currentCategory
    ? state.expenses.filter(
        (expense) => expense.category === state.currentCategory
      )
    : state.expenses;

  const IS_EMPTY = useMemo(
    () => filteredExpenses.length === 0,
    [filteredExpenses]
  );

  return (
    <div className=" mt-10 shadow-lg bg-white rounded-lg p-10">
      {IS_EMPTY ? (
        <p className=" text-gray-600 text-2xl font-bold">No expenses yet!</p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5">Expense list</p>
          {filteredExpenses.map((expense) => (
            <ExpenseDetails key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
};
