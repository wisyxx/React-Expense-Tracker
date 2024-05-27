import { useState } from 'react';
import DatePicker from 'react-date-picker';
import { categories } from '../data/categories';
import { formatCurrency } from '../helpers';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export const ExpenseForm = () => {
  const EXAMPLE_AMOUNT = 50;

  /* Calendar */
  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [value, onChange] = useState<Value>(new Date());

  return (
    <form className=" space-y-5">
      <legend
        className=" uppercase text-center text-2xl font-black border-b-4
       border-blue-500 py-2"
      >
        New expense
      </legend>

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
        />
      </div>
      <div className=" flex flex-col gap-2">
        <label htmlFor="amount" className=" text-xl">
          Expense name:
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          className=" p-2 focus:outline-none focus:ring-[3px] ring-blue-500 transition 
        duration-300 ease-in-out rounded-sm"
          placeholder={`Ex: ${formatCurrency(EXAMPLE_AMOUNT)}`}
        />
      </div>
      <div className=" flex flex-col gap-2">
        <label htmlFor="amount" className=" text-xl">
          Expense name:
        </label>
        <select
          name="category"
          id="category"
          className=" p-2 focus:outline-none focus:ring-[3px] ring-blue-500 transition 
        duration-300 ease-in-out rounded-sm"
        >
          <option disabled selected value="">
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
        <label htmlFor="date" className=" text-xl">
          Date:
        </label>
        <DatePicker
          className=" bg-slate-100 p-2 border-0"
          onChange={onChange}
          value={value}
        />
      </div>

      <input
        type="submit"
        value="Add"
        className=" bg-blue-600 cursor-pointer w-full p-2 text-white
     uppercase font-bold rounded-lg hover:bg-blue-400 hover:scale-[100.5%] transition-all duration-[250ms]"
      />
    </form>
  );
};
