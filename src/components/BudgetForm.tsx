import { useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';

export const BudgetForm = () => {
  const [budget, setBudget] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber);
  };

  const isValid = useMemo(() => isNaN(budget) || budget <= 0, [budget]);

  return (
    <form className=" space-y-5">
      <div className=" flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className=" text-4xl text-blue-600 font-bold text-center"
        >
          Define budget
        </label>
      </div>

      <input
        id="budgetID"
        type="number"
        className=" w-full bg-white border border-gray-200 p-2 font-bold rounded-lg focus:outline-none focus:ring-2 ring-blue-800 transition duration-300 ease-in-out"
        placeholder="Define your budget"
        name="budget"
        onChange={handleChange}
      />

      <input
        type="submit"
        value="Set budget"
        className=" bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all duration-[250ms]
         w-full p-2 text-white font-black uppercase disabled:opacity-50 disabled:hover:bg-blue-600"
        disabled={isValid}
      />
    </form>
  );
};
