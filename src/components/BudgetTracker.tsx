import { AmountDisplay } from './AmountDisplay';

export const BudgetTracker = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2">
      <div className=" flex justify-center">
        <img src="/grafico.jpg" alt="Expenses graph" />
      </div>

      <div className=" flex flex-col justify-center items-center">
        <button
          type="button"
          className=" bg-pink-600 w-full p-2 text-white 
          uppercase font-bold rounded-lg hover:bg-pink-500
          transition-all duration-[250ms]
          after:content-['?'] after:opacity-0 
          hover:after:opacity-100 after:transition-all after:duration-[300ms]"
        >
          Reset
        </button>

        <AmountDisplay label="Budget" amount={300} />
        <AmountDisplay label="Aviable" amount={100} />
        <AmountDisplay label="Used" amount={200} />
      </div>
    </div>
  );
};
