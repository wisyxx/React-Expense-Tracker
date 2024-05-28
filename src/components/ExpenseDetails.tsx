import { formatDate } from '../helpers';
import { Expense } from '../types';
import { AmountDisplay } from './AmountDisplay';

type ExpenseDetailsProps = {
  expense: Expense;
};

export const ExpenseDetails = ({ expense }: ExpenseDetailsProps) => {
  return (
    <div className=" bg-white shadow-lg p-10 w-full border-b border-gray-200">
      <div></div>
      <div>
        <p>{expense.expenseName}</p>
        <p className=" text-slate-600 text-sm">
          {formatDate(expense.date!.toString())}
        </p>
      </div>

      <AmountDisplay amount={expense.amount} />
    </div>
  );
};
