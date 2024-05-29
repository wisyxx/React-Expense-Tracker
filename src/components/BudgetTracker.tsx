import { useMemo } from 'react';
import { useBudget } from '../hooks/useBudget';
import { AmountDisplay } from './AmountDisplay';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const BudgetTracker = () => {
  const { state, dispatch } = useBudget();

  const usedMoney = useMemo(
    () => state.expenses.reduce((total, expense) => total + expense.amount, 0),
    [state.expenses]
  );
  const aviableMoney = state.budget - usedMoney;

  const percentage = +((usedMoney / state.budget) * 100).toFixed(2);

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2">
      <div className=" flex justify-center">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            pathColor: percentage >= 100 ? '#DB2777' : '#3B82F6',
            textColor: percentage >= 100 ? '#DB2777' : '#3B82F6',
            textSize: 17,
          })}
        />
      </div>

      <div className=" flex flex-col justify-center items-center">
        <button
          onClick={() => dispatch({ type: 'reset-app' })}
          type="button"
          className=" bg-pink-600 w-full p-2 text-white 
          uppercase font-bold rounded-lg hover:bg-pink-500
          transition-all duration-[250ms]
          after:content-['?'] after:opacity-0 
          hover:after:opacity-100 after:transition-all after:duration-[300ms]"
        >
          Reset
        </button>

        <AmountDisplay label="Budget" amount={state.budget} />
        <AmountDisplay label="Aviable" amount={aviableMoney} />
        <AmountDisplay label="Used" amount={usedMoney} />
      </div>
    </div>
  );
};
