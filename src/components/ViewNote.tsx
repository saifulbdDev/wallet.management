// src/components/ViewNote.tsx
import React from "react";
import { Dialog } from "@headlessui/react";
import classnames from "classnames";
import Button from "@/components/ui/Buttons/Button";
import { getCurrencySymbols } from "@/utils";
import { Note } from "@/types/note.type";

const statuses: Record<string, string> = {
  Income: 'text-green-700 bg-green-50 ring-green-600/20',
  'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Expense: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
};
interface ViewNoteProps {
  isOpen: boolean;
  note: Note;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewNote: React.FC<ViewNoteProps> = ({ isOpen, setIsOpen, note }) => {
  const {
    id,
    currency,
    total_amount,
    type,
    text,
    created_date,
    currency_note,
    count
  } = note;
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-[200]">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg w-[600px] rounded bg-white">
          <div className="border-b px-6 py-6">
            <Dialog.Title>View Note</Dialog.Title>
          </div>

          <div className="px-5 py-5  gap-x-6">
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <b>Amount :</b> {getCurrencySymbols(currency)} {total_amount}
                </p>
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <b>Currency Note :</b> {currency_note}
                </p>
                <p
                  className={classnames(`rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium', ${statuses[type] as string}`)}>
                  {type}
                </p>
              </div>
              <div>
                <p className="whitespace-nowrap">{text}</p>
              </div>
              <div className="mt-1 flex items-center gap-x-4 text-xs leading-5 text-gray-500">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <b>Count :</b> {count}
                </p>
                <p className="whitespace-nowrap text-gray-900">
                  <b>Created Date :</b> {created_date}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full py-4 px-5 flex justify-end border-t border-solid space-x-3">
            <Button
              onClick={(e) => {
                setIsOpen(false);
              }}
              type="button"
              variant="secondary"
              className="w-20 rounded-lg text-base lg:py-2.5 py-1.5">
              Close
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ViewNote;
