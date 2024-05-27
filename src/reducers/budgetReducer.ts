export type BudgetActions =
  | { type: 'define-budget'; payload: { budget: number } }
  | { type: 'show-modal' }
  | { type: 'close-modal' }
  | {type: 'add-expense'};

export type BudgetState = {
  budget: number;
  modal: boolean;
};

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
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

  return state;
};
