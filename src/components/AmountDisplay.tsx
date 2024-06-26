import { formatCurrency } from '../helpers';

type AmountDisplayProps = {
  label?: string;
  amount: number;
};

export const AmountDisplay = ({ label, amount }: AmountDisplayProps) => {
  return (
    <p
      className={`text-xl text-blue-600 font-bold ${label ? 'mt-6' : 'mt-2'}`}
    >
      {label && `${label}: `}
      <span
        className={`font-black ${amount < 0 ? 'text-pink-600' : 'text-black'}`}
      >
        {formatCurrency(amount)}
      </span>
    </p>
  );
};
