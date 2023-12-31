import React from "react";

const Balance = ({ data }) => {
  const currencyTotals = data.reduce((acc, transaction) => {
    const { currency, total_amount } = transaction;
    acc[currency] = (acc[currency] || 0) + total_amount;
    return acc;
  }, {});
  return (
    <div className="bg-indigo-700 bg-[url('/background-currency.svg')]  bg-no-repeat bg-center bg-contain rounded-3xl shadow-lg p-3">
      <table className="min-w-full">
        <thead className="border-b border-gray-300 text-gray-900">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0  ">
              Currency
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-white sm:table-cell">
              Total Amount
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-white sm:table-cell">
              Total USD
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
                {totalAmount}
              </td>
            </tr>
          ))}

      
        </tbody>
      </table>
    </div>
  );
};

export default Balance;
