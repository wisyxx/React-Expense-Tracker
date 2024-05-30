import { useBudget } from '../hooks/useBudget';

type ConfirmationModalProps = {
  show: boolean;
};

export const ConfirmationModal = ({ show }: ConfirmationModalProps) => {
  const { dispatch } = useBudget();
  if (show) {
    return (
      <div
        className=" shadow-2xl max-w-5xl bg-slate-100 p-5 flex flex-col rounded-lg
         justify-center items-center mt-5 md:mt-0"
      >
        <p>Are you sure?</p>
        <div className=" space-x-4 mt-3">
          <button
            onClick={() => dispatch({ type: 'reset-app' })}
            className=" bg-blue-500 text-white uppercase font-bold px-2 rounded-md"
          >
            Yes
          </button>
          <button
            onClick={() => dispatch({ type: 'close-reset-modal' })}
            className=" bg-pink-600 text-white uppercase font-bold px-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
};
