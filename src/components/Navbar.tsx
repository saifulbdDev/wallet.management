/* eslint-disable react-hooks/exhaustive-deps */
"use client"; // This is a client component

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { TransactioState } from "@/types/note.type";
import { setCurrency } from "@/features/transaction/transactionSlice";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {currencyOptions, navigation} from '@/utils'
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const selectedCurrency = useSelector(
    (state: TransactioState) => state.transaction.currency
  );

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCurrency = event.target.value;
    dispatch(setCurrency(newCurrency));
    // Additional actions if needed
  };

  return (
    <header className="fixed inset-0 z-50 flex h-16 border-b bg-white border-gray-900/10">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-x-6">
          <button
            type="button"
            className="-m-3 p-3 md:hidden"
            onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-5 w-5 text-gray-900" aria-hidden="true" />
          </button>
          <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-3">
            <span className="sr-only">Your Company</span>

            <Image
              src="/icon-wallet.svg"
              alt="Vercel Logo"
              className=" mx-auto"
              width={50}
              height={30}
              priority
            />
            <h2 className="text-3xl font-bold mb-0">Wallet</h2>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-4 sm:gap-x-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 hidden sm:block text-gray-400 hover:text-gray-500">
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className=" flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>

            <select
              id="currency"
              name="currency"
              value={selectedCurrency}
              onChange={handleCurrencyChange}
              className="h-full rounded-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              {currencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <a href="#" className="-m-1.5 p-1.5">
            <Image
              width={32}
              height={32}
              className="h-8 w-8 rounded-full bg-gray-800"
              src="/user.png"
              alt=""
            />
          </a>
        </div>
      </div>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
          <div className="-ml-0.5 flex h-16 items-center gap-x-6">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="-ml-0.5">
              <a href="#" className="-m-1.5 block p-1.5">
                <span className="sr-only">Your Company</span>
                <Image
                  className="h-8 w-auto"
                  width={32}
                  height={32}
                  src="/icon-wallet.svg"
                  alt=""
                />
              </a>
            </div>
          </div>
          <div className="mt-2 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                {item.name}
              </a>
            ))}
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
