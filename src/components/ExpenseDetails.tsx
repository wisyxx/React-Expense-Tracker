import { useMemo } from 'react';
import { formatDate } from '../helpers';
import { Expense } from '../types';
import { AmountDisplay } from './AmountDisplay';
import { categories } from '../data/categories';

type ExpenseDetailsProps = {
  expense: Expense;
};

export const ExpenseDetails = ({ expense }: ExpenseDetailsProps) => {
  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === expense.category)[0],
    [expense]
  );

  return (
    <div className=" bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-6">
      <div>
        <img className='w-20' src={`/icon_${categoryInfo.icon}.svg`} alt="Category icon" />
      </div>
      <div className=' flex-1 space-y-2'>
        <p className="text-sm font-bold uppercase text-slate-500">
          {`Category: ${categoryInfo.name}`}
        </p>
        <p>{expense.expenseName}</p>
        <p className=" text-slate-600 text-sm">
          {formatDate(expense.date!.toString())}
        </p>
      </div>

      <AmountDisplay amount={expense.amount} />
    </div>
  );
};
