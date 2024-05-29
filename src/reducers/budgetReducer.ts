import { DraftExpense, Expense } from '../types';
import { v4 as uuidv4 } from 'uuid';

export type BudgetActions =
  | { type: 'define-budget'; payload: { budget: number } }
  | { type: 'show-modal' }
  | { type: 'close-modal' }
  | { type: 'add-expense'; payload: { expenses: DraftExpense } }
  | { type: 'remove-expense'; payload: { id: Expense['id'] } }
  | { type: 'update-expense'; payload: { expense: Expense } }
  | { type: 'get-expense-by-id'; payload: { id: Expense['id'] } }
  // TODO: confirmation modal
  | { type: 'reset-app' };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense['id'];
};

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expenses: [],
  editingId: '',
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
      editingId: '',
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
  if (action.type === 'remove-expense') {
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      ),
    };
  }
  if (action.type === 'get-expense-by-id') {
    return {
      ...state,
      editingId: action.payload.id,
      modal: !state.modal,
    };
  }
  if (action.type === 'update-expense') {
    return {
      ...state,
      expenses: state.expenses.map((expense) =>
        expense.id === action.payload.expense.id
          ? action.payload.expense
          : expense
      ),
      modal: !state.modal,
      editingId: '',
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
