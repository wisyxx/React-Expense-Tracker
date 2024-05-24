import { createContext, useReducer } from 'react';
import { budgetReducer, initialState } from '../reducers/budgetReducer';
import type { BudgetActions, BudgetState } from '../reducers/budgetReducer';
import type { Dispatch, ReactNode } from 'react';

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
};
type BudgetProviderProps = {
  children: ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);
  
  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
