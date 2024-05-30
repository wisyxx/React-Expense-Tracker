import { useEffect, useMemo } from 'react';
import { useBudget } from './hooks/useBudget';
import { BudgetForm } from './components/BudgetForm';
import { BudgetTracker } from './components/BudgetTracker';
import ExpenseModal from './components/ExpenseModal';
import { ExpenseList } from './components/ExpenseList';
import { FilterByCategory } from './components/FilterByCategory';

const App = () => {
  const { state } = useBudget();

  if (state.budget === 0) {
    state.resetModal = false;
  }

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString());
    localStorage.setItem('expenses', JSON.stringify(state.expenses));
  }, [state]);

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  return (
    <>
      <header className=" bg-blue-600 py-8 max-h-72">
        <h1 className=" uppercase text-center font-black text-4xl text-white">
          Expense Tracker
        </h1>
      </header>

      <div className=" max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? (
          <BudgetTracker showReset={!state.resetModal} />
        ) : (
          <BudgetForm />
        )}
      </div>

      {isValidBudget && (
        <main className=" max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  );
};

export default App;
