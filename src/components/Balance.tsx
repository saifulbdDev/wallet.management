import React from "react";

interface Transaction {
  id: string;
  currency: string;
  total_amount: number;
  // Add other properties as needed
}

interface BalanceProps {
  data: Transaction[];
  convartCurrency: (amount: number, currency:string) => string; // Assuming your conversion function takes a number and returns a string
}

const Balance: React.FC<BalanceProps> = ({ data, convartCurrency }) => {
  const currencyTotals: Record<string, number> = data.reduce(
    (acc, transaction) => {
      const { currency, total_amount } = transaction;
      acc[currency] = (acc[currency] || 0) + total_amount;
      return acc;
    },
    {}
  );

  return (
   
    
    
      <table className="min-w-full">
        <thead className="border-b border-gray-300 text-gray-900">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
            >
              Currency
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-white sm:table-cell"
            >
              Amount
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-white sm:table-cell"
            >
              USD
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(currencyTotals).map(([currency, totalAmount]) => (
            <tr key={currency} className="border-b">
              <td className="max-w-0 py-5 pl-4 pr-3 text-left text-sm sm:pl-0">
                <div className="font-medium text-white uppercase">
                  {currency}
                </div>
              </td>
              <td className="py-5 pl-3 pr-4 text-left text-sm text-white sm:pr-0">
                {totalAmount}
              </td>
              <td className="py-5 pl-3 pr-4 text-left text-sm text-white sm:pr-0">
                {convartCurrency(totalAmount, currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
   
  );
};

export default Balance;
