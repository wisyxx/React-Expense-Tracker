import { categories } from '../data/categories';
import { formatCurrency } from '../helpers';

export const ExpenseForm = () => {
  const EXAMPLE_AMOUNT = 50;

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

      <input
        type="submit"
        value="Add"
        className=" bg-blue-600 cursor-pointer w-full p-2 text-white
     uppercase font-bold rounded-lg hover:bg-blue-400 hover:scale-[100.5%] transition-all duration-[250ms]"
      />
    </form>
  );
};
