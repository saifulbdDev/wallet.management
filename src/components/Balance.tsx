import React from "react";
import { CurrencyTotals } from "@/types/note.type";

interface BalanceProps {
  loacalCurrency:string
  totalBalance: number;
  currencyTotals: CurrencyTotals;
  convertCurrency: (amount: number, currency: string) => number; // Assuming your conversion function takes a number and returns a string
}



const Balance: React.FC<BalanceProps> = ({loacalCurrency, totalBalance, currencyTotals, convertCurrency }) => {
 

  return (
    <div className="bg-indigo-700 bg-[url('/background-currency.svg')] bg-no-repeat bg-center bg-contain rounded-3xl shadow-lg p-3">
      <div className="text-left border border-white w-full inline-block rounded-xl px-7 p-3">
        <h2 className="uppercase text-white text-base">your balance</h2>
        <span className="text-3xl uppercase text-white font-bold">
          {totalBalance} {loacalCurrency}
        </span>
      </div>
      <h2 className="capitalize mt-3 text-xl text-white font-bold">
        currency wise balance List
      </h2>

      <table className="min-w-full">
        <thead className="border-b border-gray-300  text-gray-900">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
              Currency
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-white sm:table-cell">
              Amount
            </th>
            <th
              scope="col"
              className="uppercase px-3 py-3.5 text-left text-sm font-semibold text-white sm:table-cell">
              {loacalCurrency}
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
                {convertCurrency(totalAmount, currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Balance;
