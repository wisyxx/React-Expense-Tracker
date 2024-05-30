import { useMemo } from 'react';
import { useBudget } from '../hooks/useBudget';
import { AmountDisplay } from './AmountDisplay';
import { ConfirmationModal } from './ConfirmationModal';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type BudgetTrackerProps = {
  showReset: boolean;
};

export const BudgetTracker = ({ showReset }: BudgetTrackerProps) => {
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
        {showReset && (
          <button
            onClick={() => dispatch({ type: 'show-reset-modal' })}
            className=" bg-pink-600  p-2 text-white 
          mt-5 md:mt-0 w-full uppercase font-bold rounded-lg hover:bg-pink-500
          transition-all duration-[250ms]"
          >
            Reset
          </button>
        )}

        <ConfirmationModal show={state.resetModal} />
        <AmountDisplay label="Budget" amount={state.budget} />
        <AmountDisplay label="Aviable" amount={aviableMoney} />
        <AmountDisplay label="Used" amount={usedMoney} />
      </div>
    </div>
  );
};
