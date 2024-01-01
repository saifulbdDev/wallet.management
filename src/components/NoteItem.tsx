import React from 'react';
import classnames from 'classnames';
import { TrashIcon } from '@heroicons/react/20/solid';
import { Note } from '@/types/note.type';
import { getCurrencySymbols } from '@/utils';

interface NoteItemProps {
  note: Note;
  removeNote: (noteId: string) => void;
  handleViewNote: (note: Note) => void;
}

const statuses = {
  Income: 'text-green-700 bg-green-50 ring-green-600/20',
  'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Expense: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
};

const NoteItem: React.FC<NoteItemProps> = ({ note, removeNote, handleViewNote }) => {
  const { id, currency, total_amount, type, text, created_date } = note;

  return (
    <li key={id} className="flex items-center justify-between gap-x-6 py-5">
      <div className="min-w-0">
        <div className="flex items-start gap-x-3">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            <b>Amount :</b> {getCurrencySymbols(currency)} {total_amount}
          </p>
          <p
            className={classnames(`
              rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium',
              ${statuses[type]}`)}
          >
            {type}
          </p>
        </div>
        <div>
          <p className="whitespace-nowrap">{text}</p>
        </div>
        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
          <p className="whitespace-nowrap">
            <b>Created Date :</b> {created_date}
          </p>
        </div>
      </div>

      <div className="flex flex-none items-center gap-x-4">
        <button
          onClick={() => handleViewNote(note)}
          type="button"
          className={`
            hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block
            ${statuses[type]}`}
        >
          View note
        </button>
        <button
          type="button"
          onClick={() => removeNote(id)}
          className={`
            hidden rounded-md bg-red-300 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block
            ${statuses[type]}`}
        >
          <TrashIcon className="w-5 h-5 text-red-700" />
        </button>
      </div>
    </li>
  );
};

export default NoteItem;