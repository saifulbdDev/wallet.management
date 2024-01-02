// Notes.tsx
"use client";
import React, { useState } from 'react';
import classnames from 'classnames';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import NoteItem from './NoteItem';
import { Note } from '@/types/note.type';


interface NotesProps {
  notes: Note[];  
  removeNote: (noteId: string) => void;
  handleViewNote: (note: Note) => void;
}



const Notes: React.FC<NotesProps> = ({ notes, removeNote, handleViewNote }) => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastNote = currentPage * itemsPerPage;
  const indexOfFirstNote = indexOfLastNote - itemsPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  const totalPages = Math.ceil(notes.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <>
      <ul role="list" className="divide-y min-h-full divide-gray-100">
        {currentNotes.map((note) => (
          <NoteItem key={note.id} note={note} removeNote={removeNote} handleViewNote={handleViewNote} />
        ))}
      </ul>

      {totalPages > 1 && (
        <nav className="mt-4 text-end border-t border-gray-200 py-3">
          <ul className="pagination isolate inline-flex -space-x-px rounded-md shadow-sm justify-end">
            <li className="inline-block">
              <button
                onClick={prevPage}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index} className="inline-block">
                <button
                  onClick={() => paginate(index + 1)}
                  className={classnames(
                    'relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex',
                    {
                      'bg-indigo-500 text-white': currentPage === index + 1,
                      'bg-gray-200 text-gray-800': currentPage !== index + 1,
                    }
                  )}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className="inline-block">
              <button
                onClick={nextPage}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Notes;