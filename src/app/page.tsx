"use client";
import Notes from "@/components/Notes";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencySymbols } from "@/utils";
import AddNote from "@/components/AddNote";
import { Note, TransactioState } from "@/types/note.type";
import { addNote, removeNote } from "@/features/transaction/transactionSlice";
import { useGetCurrencyQuery } from "@/features/transaction/currencyApi";
import Balance from "@/components/Balance";
const Home = () => {
  const { data, isLoading } = useGetCurrencyQuery({
    pollingInterval: 3000,
    refetchOnMountOrArgChange: false
  });

  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const dispatch = useDispatch();
  const wallet = useSelector((state: TransactioState) => state.transaction);

  const selectCurrency = getCurrencySymbols(wallet.currency);
  const convartCurrency = (count: number, currency: string) => {
    const exchangeRate = data?.data[wallet?.currency?.toUpperCase()]?.value;

    return Math.ceil(count * exchangeRate);
  };

  const handleAddNote = (note: Note) => {
    let convertedCount = note.count * note.currency_note;

    // Dispatch the action with the converted count
    dispatch(
      addNote({
        ...note,
        total_amount: convertedCount || 0,
        currency: wallet?.currency || "usd"
      })
    );
  };
  const handleRemoveNote = (noteId: string) => {
    dispatch(removeNote(noteId));
  };

  const calculateTotalBalance = () => {
    return wallet.notes.reduce(
      (total, note) => total + note.currency_note * note.count,
      0
    );
  };
  return (
    <div className="px-8 py-8 sm:px-6 lg:px-8 mx-auto  space-y-10 w-full max-w-7xl">
      <div className="justify-between flex">
        <div>
          <span>Welcome to Your Financial Hub</span>
          <h2 className="text-3xl font-bold">Personal Wallet Management</h2>
        </div>
        <div className="bg-white inline-block rounded-xl px-7 shadow-md p-3">
          <h2 className="up">your balance</h2>
          <span className="text-3xl text-indigo-700 font-bold">
            {calculateTotalBalance()} usd
          </span>
        </div>
      </div>
      <div className="flex space-x-5">
        <div className="md:w-3/5 ">
          <div className="bg-white  shadow-lg p-3">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  Recent Notes
                </h1>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  onClick={() => setIsAddNoteOpen(true)}
                  className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">
                  Add Note
                </button>
              </div>
            </div>
            <Notes
           
              currency={wallet?.currency}
              removeNote={handleRemoveNote}
              notes={wallet?.notes}
            />
          </div>
        </div>
        <div className="flow-root md:w-2/5 text-center">
         <Balance data={wallet?.notes}/>
        </div>
      </div>
      <AddNote
        isOpen={isAddNoteOpen}
        setIsOpen={setIsAddNoteOpen}
        addNote={handleAddNote}
        currency={selectCurrency}
      />
    </div>
  );
};

export default Home;
