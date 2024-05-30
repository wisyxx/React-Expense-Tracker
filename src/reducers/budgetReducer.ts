import type { Category, DraftExpense, Expense } from '../types';
import { v4 as uuidv4 } from 'uuid';

export type BudgetActions =
  | { type: 'define-budget'; payload: { budget: number } }
  | { type: 'show-modal' }
  | { type: 'close-modal' }
  | { type: 'show-reset-modal' }
  | { type: 'close-reset-modal' }
  | { type: 'add-expense'; payload: { expenses: DraftExpense } }
  | { type: 'remove-expense'; payload: { id: Expense['id'] } }
  | { type: 'update-expense'; payload: { expense: Expense } }
  | { type: 'get-expense-by-id'; payload: { id: Expense['id'] } }
  | { type: 'reset-app' }
  | { type: 'add-filter-category'; payload: { id: Category['id'] } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  resetModal: boolean;
  expenses: Expense[];
  editingId: Expense['id'];
  currentCategory: Category['id'];
};

const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem('budget');
  return localStorageBudget ? +localStorageBudget : 0;
};
const initialExpenses = (): Expense[] => {
  const localStorageExpenses = localStorage.getItem('expenses');
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  resetModal: false,
  expenses: initialExpenses(),
  editingId: '',
  currentCategory: '',
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
  if (action.type === 'show-reset-modal') {
    return {
      ...state,
      resetModal: true,
    };
  }
  if (action.type === 'close-reset-modal') {
    return {
      ...state,
      resetModal: false,
    };
  }
  if (action.type === 'reset-app') {
    return {
      ...state,
      expenses: [],
      budget: 0,
    };
  }
  if (action.type === 'add-filter-category') {
    return {
      ...state,
      currentCategory: action.payload.id,
    };
  }
  return state;
};
