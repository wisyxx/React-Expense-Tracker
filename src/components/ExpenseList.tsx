import { useMemo } from 'react';
import { useBudget } from '../hooks/useBudget';
import { ExpenseDetails } from './ExpenseDetails';


export const ExpenseList = () => {
  const { state } = useBudget();

  const IS_EMPTY = useMemo(() => state.expenses.length === 0, [state.expenses]);

  return (
    
        <div className=" mt-10 shadow-lg bg-white rounded-lg p-10">
          {IS_EMPTY ? (
            <p className=" text-gray-600 text-2xl font-bold">
              No expenses yet!
            </p>
          ) : (
            <>
              <p className="text-gray-600 text-2xl font-bold my-5">
                Expense list
              </p>
              {state.expenses.map((expense) => (
                <ExpenseDetails key={expense.id} expense={expense} />
              ))}
            </>
          )}
        </div>
  );
};
