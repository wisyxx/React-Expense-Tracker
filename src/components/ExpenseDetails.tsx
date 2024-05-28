import { useMemo } from 'react';
import { formatDate } from '../helpers';
import { Expense } from '../types';
import { categories } from '../data/categories';
import { AmountDisplay } from './AmountDisplay';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { useBudget } from '../hooks/useBudget';

type ExpenseDetailsProps = {
  expense: Expense;
};

export const ExpenseDetails = ({ expense }: ExpenseDetailsProps) => {
  const { dispatch } = useBudget();

  const { id, expenseName, category, amount, date } = expense;

  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === category)[0],
    [expense]
  );

  // Swipe actions
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => {}}>Update</SwipeAction>
    </LeadingActions>
  );
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          dispatch({ type: 'remove-expense', payload: { id } });
        }}
      >
        Delete
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className=" select-none bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-6">
          <div>
            <img
              className="w-20"
              src={`/icon_${categoryInfo.icon}.svg`}
              alt="Category icon"
            />
          </div>
          <div className=" flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">
              {`Category: ${categoryInfo.name}`}
            </p>
            <p>{expenseName}</p>
            <p className=" text-slate-600 text-sm">
              {formatDate(date!.toString())}
            </p>
          </div>

          <AmountDisplay amount={amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};
