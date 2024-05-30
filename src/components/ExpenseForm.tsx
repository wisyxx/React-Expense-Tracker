import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useBudget } from '../hooks/useBudget';
import DatePicker from 'react-date-picker';
import { formatCurrency } from '../helpers';
import { ErrorMessage } from './ErrorMessage';
import { categories } from '../data/categories';
import type { DraftExpense, Value } from '../types';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export const ExpenseForm = () => {
  const EXAMPLE_AMOUNT = 50;

  const [expense, setExpense] = useState<DraftExpense>({
    expenseName: '',
    amount: 0,
    category: '',
    date: new Date(),
  });

  const [error, setError] = useState('');
  const { state, dispatch } = useBudget();

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.filter(
        (currentExpense) => currentExpense.id === state.editingId
      )[0];

      setExpense(editingExpense);
    }
  }, [state.editingId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const isAmountField = ['amount'].includes(name);
    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value,
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({ ...expense, date: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate
    if (Object.values(expense).includes('')) {
      setError('You must fill all the fields');
      return;
    }

    // Add new expense
    if (state.editingId) {
      dispatch({
        type: 'update-expense',
        payload: { expense: { id: state.editingId, ...expense } },
      });
    } else {
      dispatch({
        type: 'add-expense',
        payload: { expenses: expense },
      });
    }
  };

  return (
    <form className=" space-y-5" onSubmit={handleSubmit}>
      <legend
        className=" uppercase text-center text-2xl font-black border-b-4
       border-blue-500 py-2"
      >
        {state.editingId === '' ? 'New expense' : 'Update expense'}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className=" flex flex-col gap-2">
        <label htmlFor="expenseName" className=" text-xl">
          Expense name:
        </label>
        <input
          type="text"
          name="expenseName"
          id="expenseName"
          className=" p-2 focus:outline-none focus:ring-[3px] ring-blue-500 transition 
        duration-300 ease-in-out rounded-sm"
          placeholder="Ex: Groceries, Shoes..."
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>
      <div className=" flex flex-col gap-2">
        <label htmlFor="amount" className=" text-xl">
          Amount:
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          className=" p-2 focus:outline-none focus:ring-[3px] ring-blue-500 transition 
        duration-300 ease-in-out rounded-sm"
          placeholder={`Ex: ${formatCurrency(EXAMPLE_AMOUNT)}`}
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className=" flex flex-col gap-2">
        <label htmlFor="category" className=" text-xl">
          Expense type:
        </label>
        <select
          defaultValue={'DEFAULT'}
          name="category"
          id="category"
          className=" p-2 focus:outline-none focus:ring-[3px] ring-blue-500 transition 
          duration-300 ease-in-out rounded-sm"
          onChange={handleChange}
        >
          <option disabled value="DEFAULT">
            Select category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className=" flex flex-col gap-2">
        <label className=" text-xl">Date:</label>
        <DatePicker
          className=" bg-slate-100 p-2 border-0"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        value={state.editingId === '' ? 'Add' : 'Update'}
        className=" bg-blue-600 cursor-pointer w-full p-2 text-white
     uppercase font-bold rounded-lg hover:bg-blue-400 hover:scale-[100.5%] transition-all duration-[250ms]"
      />
    </form>
  );
};
