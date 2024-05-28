import { DraftExpense, Expense } from '../types';
import { v4 as uuidv4 } from 'uuid';

export type BudgetActions =
  | { type: 'define-budget'; payload: { budget: number } }
  | { type: 'show-modal' }
  | { type: 'close-modal' }
  | { type: 'add-expense'; payload: { expenses: DraftExpense } }
  | { type: 'reset-app' };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
};

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expenses: [],
};

const createExpense = (draftExpense: DraftExpense) => {
  return {
    ...draftExpense,
    id: uuidv4(),
  };
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  if (action.type === 'define-budget') {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }
  if (action.type === 'show-modal') {
    return {
      ...state,
      modal: true,
    };
  }
  if (action.type === 'close-modal') {
    return {
      ...state,
      modal: !state.modal,
    };
  }
  if (action.type === 'add-expense') {
    const expense = createExpense(action.payload.expenses);

    return {
      ...state,
      expenses: [...state.expenses, expense],
      modal: !state.modal,
    };
  }
  if (action.type === 'reset-app') {
    return {
      ...state,
      expenses: [],
      budget: 0,
    };
  }

  return state;
};
