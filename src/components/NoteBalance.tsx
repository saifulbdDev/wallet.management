import React from "react";
import { Note } from "@/types/note.type";



interface NoteBalanceProps {
  notes: Note[];
  totalBalance: number;
  localCurrency: string;
}

interface CurrencyGroups {
  [currency: string]: Note[] | undefined;
}

const NoteBalance: React.FC<NoteBalanceProps> = ({ notes, totalBalance, localCurrency }) => {
  const groupNotesByCurrency = (): CurrencyGroups => {
    return notes.reduce((groupedNotes, note) => {
      const { currency } = note;
      groupedNotes[currency] = [...(groupedNotes[currency] || []), note];
      return groupedNotes;
    }, {} as CurrencyGroups);
  };

  const currencyGroups: CurrencyGroups = groupNotesByCurrency();

  const calculateTotalNoteCountAndAmount = (currency: string, denomination: number): { count: number; amount: number } => {
    return (
      currencyGroups[currency]?.reduce(
        (total, note) => {
          const countObj = note.counts.find((count) => count.currency_note === denomination);
          total.count += countObj ? countObj.count : 0;
          total.amount += note.total_amount;
          return total;
        },
        { count: 0, amount: 0 }
      ) || { count: 0, amount: 0 }
    );
  };

  const currencyDenominations = [1, 5, 10, 20];

  return (
    <div className="bg-indigo-700 bg-[url('/background-currency.svg')] bg-no-repeat bg-center bg-contain rounded-3xl shadow-lg p-3">
      <div className="text-left border border-white w-full inline-block rounded-xl px-7 p-3">
        <h2 className="uppercase text-white text-base">your balance</h2>
        <span className="text-3xl uppercase text-white font-bold">
          {totalBalance} {localCurrency}
        </span>
      </div>
      <h2 className="capitalize mt-3 text-xl text-white font-bold">Currency Wise Notes Count</h2>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
              Currency
            </th>
            {currencyDenominations.map((denomination) => (
              <th key={denomination} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                Notes {denomination}
              </th>
            ))}
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
              Total Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(currencyGroups).map((currency) => (
            <tr key={currency} className="border-b">
              <td className="max-w-0 py-5 pl-4 pr-3 text-left text-sm sm:pl-0">
                <div className="font-medium text-white uppercase">{currency}</div>
              </td>
              {currencyDenominations.map((denomination) => (
                <td className="py-5 pl-3 pr-4 text-left text-sm text-white sm:pr-0" key={`${currency}-${denomination}`}>
                  {calculateTotalNoteCountAndAmount(currency, denomination).count}
                </td>
              ))}
              <td className="py-5 pl-3 pr-4 text-left text-sm text-white sm:pr-0">
                {currencyGroups[currency]?.reduce((total, note) => total + note.total_amount, 0) || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NoteBalance;