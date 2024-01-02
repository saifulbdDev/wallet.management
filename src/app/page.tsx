/* eslint-disable react/no-unescaped-entities */
"use client";
import Notes from "@/components/Notes";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencySymbols } from "@/utils";
import AddNote from "@/components/AddNote";
import { Note, TransactioState } from "@/types/note.type";
import { addNote, removeNote, addNotes } from "@/features/transaction/transactionSlice";
import { useGetCurrencyQuery } from "@/features/transaction/currencyApi";
import Balance from "@/components/Balance";
import ViewNote from "@/components/ViewNote";
import Statistics from "@/components/Statistics";
import Button from "@/components/ui/Buttons/Button";
import {generateRandomNote} from "@/utils"
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
    currency_note: 0,
    total_amount: 0,
    count: 0,
    type: "Income",
    text: "",
    created_date: ""
  });
  const dispatch = useDispatch();
  const { notes, currency } = useSelector(
    (state: TransactioState) => state.transaction
  );

  const selectCurrency = getCurrencySymbols(currency);

  const convartCurrency = (count: number, currency: string) => {
    const exchangeRate =
      data?.data["USD"]?.value / data?.data[currency?.toUpperCase()]?.value;
    return Math.ceil(count * exchangeRate) || 0;
  };

  const handleAddNote = (note: Note) => {
    let convertedCount = note.count * note.currency_note;
    dispatch(
      addNote({
        ...note,
        total_amount: convertedCount || 0,
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
    const promises: Promise<Note>[] = Array.from({ length: 100 }, () => generateRandomNote());
  
    const results = await Promise.allSettled(promises);
   

    const successfulResults = results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value as Note);
  
   
    dispatch(addNotes(successfulResults));
  
    const errors = results
      .filter(result => result.status === 'rejected')
      .map(result => result.reason);
  
    if (errors.length > 0) {
      console.error('Errors occurred during random note generation:', errors);
    }
  };
  const calculateTotalBalance = (currency: string) => {
    return notes.reduce(
      (total, note) => total + note.currency_note * note.count,
      0
    );
  };

  return (
    <div className="px-8 py-8 sm:px-6 lg:px-8 mx-auto space-y-10 w-full max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <span>Welcome to Your Financial Hub</span>
          <h2 className="text-3xl font-bold">Personal Wallet Management</h2>
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
        <div className="flex space-x-5">
          <div className="md:w-3/5">
            <div className="bg-white shadow-lg p-3">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-lg font-bold leading-6 text-gray-900">
                    Recent Notes
                  </h1>
                </div>
                {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                  type="button"
                  onClick={() => setIsAddNoteOpen(true)}
                  className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">
                  Add Note
                </button>
              </div> */}
              </div>
              <Notes
                removeNote={handleRemoveNote}
                handleViewNote={handleViewNote}
                notes={notes}
              />
            </div>
          </div>
          <div className="md:w-2/5 space-y-8">
            <>
              <div className="bg-indigo-700 bg-[url('/background-currency.svg')] bg-no-repeat bg-center bg-contain rounded-3xl shadow-lg p-3">
                <div className="text-left border border-white md:w-full inline-block rounded-xl px-7 p-3">
                  <h2 className="uppercase text-white text-base">
                    your balance
                  </h2>
                  <span className="text-3xl uppercase text-white font-bold">
                    {calculateTotalBalance(currency)} {currency}
                  </span>
                </div>
                <h2 className="capitalize mt-3 text-xl text-white font-bold">
                  currency wise balance List
                </h2>
                <Balance data={notes} convartCurrency={convartCurrency} />
              </div>
              <Statistics notes={notes} />
            </>
          </div>
        </div>
      ) : (
        <div className="min-h-full h-[300px] flex flex-grow items-center justify-center bg-gray-50">
          <div className="rounded-lg bg-white p-8 text-center shadow-xl">
            <h1 className="mb-4 text-4xl font-bold">Emtry Note</h1>
            <p className="text-gray-600">
            Oops! The note you are looking for is missing. For testing purposes, please click on the 'Random Note Generator' to display random data, and create a new note by clicking the 'Add Note' button.
            </p>
            <Button className="py-1.5 px-3 mt-4 rounded-md" onClick={handleRandomNote}>
              Random Note Generator
            </Button>
          </div>
        </div>
      )}

      <AddNote
        isOpen={isAddNoteOpen}
        setIsOpen={setIsAddNoteOpen}
        addNote={handleAddNote}
        currency={selectCurrency}
      />
      {isViewNoteOpen ? (
        <ViewNote
          isOpen={isViewNoteOpen}
          setIsOpen={setIsViewNoteOpen}
          note={singleNote}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
