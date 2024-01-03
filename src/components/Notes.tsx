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
  const totalPages = Math.ceil(notes.length / itemsPerPage);
  const paginationDisplayLimit = 5; // Display only 5 page numbers

  // Calculate the index range for the currently displayed notes
  const indexOfLastNote = currentPage * itemsPerPage;
  const indexOfFirstNote = indexOfLastNote - itemsPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  // Generate an array of page numbers to display
  const renderPagination = () => {
    const pageNumbers: (number | string)[] = [];

    if (totalPages <= paginationDisplayLimit) {
      // Display all pages if totalPageCount is less than or equal to paginationDisplayLimit
      pageNumbers.push(...Array.from({ length: totalPages }, (_, i) => i + 1));
    } else {
      // Display rangeStart to rangeEnd with ellipsis if necessary
      const rangeStart = Math.max(0, currentPage - Math.floor(paginationDisplayLimit / 2));
      const rangeEnd = Math.min(totalPages - 1, rangeStart + paginationDisplayLimit - 1);

      pageNumbers.push(rangeStart + 1);
      if (rangeStart + 1 !== rangeEnd) {
        pageNumbers.push(-1); // -1 represents ellipsis
      }
      for (let i = rangeStart + 1; i <= rangeEnd - 1; i++) {
        pageNumbers.push(i + 1);
      }
      if (rangeStart !== rangeEnd) {
        pageNumbers.push(-1); // -1 represents ellipsis
      }
      pageNumbers.push(rangeEnd + 1);
    }

    return pageNumbers.map((pageNumber, index) => (
      <li key={index} className="inline-block">
        <button
          onClick={() => typeof pageNumber === 'number' && paginate(pageNumber)}
          className={classnames(
            'relative items-center sm:px-4 px-2.5 py-1.5 sm:py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 inline-flex',
            {
              'bg-indigo-500 text-white': currentPage === pageNumber,
              'bg-gray-200 text-gray-800': currentPage !== pageNumber && pageNumber !== -1,
            }
          )}
        >
          {pageNumber === -1 ? '...' : pageNumber}
        </button>
      </li>
    ));
  };

  // Change the current page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Go to the next page
  const nextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));

  // Go to the previous page
  const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  // Guard clause for no notes
  if (totalPages === 0) {
    return <p>No notes available.</p>;
  }

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
                className="relative inline-flex items-center rounded-l-md  sm:px-4 px-2.5 py-1.5 sm:py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </li>
            {renderPagination()}
            <li className="inline-block">
              <button
                onClick={nextPage}
                className="relative inline-flex items-center rounded-r-md  sm:px-4 px-2.5 py-1.5 sm:py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
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