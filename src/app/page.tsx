/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useMemo, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencySymbols } from "@/utils";
import AddNote from "@/components/AddNote";
import Notes from "@/components/Notes";
import { Note, TransactioState, CurrencyTotals } from "@/types/note.type";
import {
  addNote,
  removeNote,
  addNotes
} from "@/features/transaction/transactionSlice";
import { useGetCurrencyQuery } from "@/features/transaction/currencyApi";
import ViewNote from "@/components/ViewNote";
import Statistics from "@/components/Statistics";
import Button from "@/components/ui/Buttons/Button";
import { generateRandomNote } from "@/utils";
import NoteBalance from "@/components/NoteBalance";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { data, isLoading } = useGetCurrencyQuery({
    pollingInterval: 3000,
    refetchOnMountOrArgChange: false
  });

  const [isViewNoteOpen, setIsViewNoteOpen] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [singleNote, setSingleNote] = useState<Note>({
    id: "",
    currency: "",
    counts: [
      {
        currency_note: 1,
        count: 0
      }
    ],
    total_amount: 0,

    type: "Income",
    text: "",
    created_date: ""
  });
  const dispatch = useDispatch();
  const { notes, currency } = useSelector(
    (state: TransactioState) => state.transaction
  );

  const selectCurrency = getCurrencySymbols(currency);


  const handleAddNote = (note: Note) => {
    dispatch(
      addNote({
        ...note,
        currency: currency || "usd"
      })
    );
  };

  const handleViewNote = (note: Note) => {
    setSingleNote(note);
    setIsViewNoteOpen(true);
  };

  const handleRemoveNote = (noteId: string) => {
    dispatch(removeNote(noteId));
  };

  const handleRandomNote = async (): Promise<void> => {
    const promises: Promise<Note>[] = Array.from(
      { length: 100 },
      generateRandomNote
    );

    const results = await Promise.allSettled(promises);

    const successfulResults = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => (result as PromiseFulfilledResult<Note>).value);

    dispatch(addNotes(successfulResults));

    const errors = results
      .filter((result) => result.status === "rejected")
      .map((result) => (result as PromiseRejectedResult).reason);

    if (errors.length > 0) {
      console.error(
        "Errors occurred during random note generation:",
        errors.map((error) => error.message)
      );
    }
  };

  const currencyTotals: Record<string, number> = notes.reduce(
    (acc, transaction) => {
      const { currency, total_amount } = transaction;
      acc[currency] = (acc[currency] || 0) + total_amount;
      return acc;
    },
    {} as CurrencyTotals
  );

  const convartTotal = (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): number => {
    const convertedAmount =
      amount *
      (data?.data[toCurrency?.toUpperCase()]?.value /
        data?.data[fromCurrency?.toUpperCase()]?.value);
    return convertedAmount;
  };

  const calculateTotalBalance = (): number => {
    return Object.entries(currencyTotals).reduce(
      (total, [currentCurrency, totalAmount]) => {
        return Math.ceil(
          total + convartTotal(totalAmount, currentCurrency, currency)
        );
      },
      0
    );
  };

  let totalBalance = calculateTotalBalance();

  return (
    <div className="p-4  sm:px-6 lg:px-8 mx-auto space-y-10 w-full max-w-7xl">
      <div className="sm:flex sm:items-center space-y-2 sm:space-y-0 sm:justify-between">
        <div>
          <span className="sm:text-3xl text-sm">
            Welcome to Your Financial Hub
          </span>
          <h2 className="sm:text-3xl text-xl font-bold">
            Personal Wallet Management
          </h2>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setIsAddNoteOpen(true)}
            className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">
            Add Note
          </button>
        </div>
      </div>
      {notes.length > 0 ? (
        <div className="flex flex-wrap md:flex-nowrap md:space-x-5 ">
          <div className="md:w-3/5 w-full order-1 md:order-none ">
            <div className="bg-white border rounded-lg shadow-sm p-3">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-lg font-bold leading-6 text-gray-900">
                    Recent Notes
                  </h1>
                </div>
              </div>
              <Notes
                removeNote={handleRemoveNote}
                handleViewNote={handleViewNote}
                notes={notes}
              />
            </div>
          </div>
          <div className="md:w-2/5 w-full space-y-8 md:mb-0 mb-10">
            <NoteBalance
              localCurrency={currency}
              totalBalance={totalBalance || 0}
              notes={notes}
            />
            <Statistics notes={notes} />
          </div>
        </div>
      ) : (
        <div className="min-h-full h-[300px] border flex flex-grow items-center justify-center bg-white">
          <div className="rounded-lg  text-center sm:shadow-sm py-5">
            <h1 className="mb-4 text-4xl font-bold">Empty Note</h1>
            <p className="text-gray-600">
              Oops! The note you are looking for is missing. For testing
              purposes, please click on the 'Random Note Generator' to display
              random data, and create a new note by clicking the 'Add Note'
              button.
            </p>
            <Button
              className="py-1.5 px-3 mt-4 rounded-md"
              onClick={handleRandomNote}>
              Random Note Generator
            </Button>
          </div>
        </div>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <AddNote
          isOpen={isAddNoteOpen}
          setIsOpen={setIsAddNoteOpen}
          addNote={handleAddNote}
          currency={selectCurrency}
        />
        {isViewNoteOpen && (
          <ViewNote
            isOpen={isViewNoteOpen}
            setIsOpen={setIsViewNoteOpen}
            note={singleNote}
          />
        )}
      </Suspense>
    </div>
  );
};

export default Home;
