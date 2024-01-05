// src/components/AddNote.tsx
import React from "react";
import { Dialog } from "@headlessui/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Buttons/Button";
import { noteSchema } from "@/utils/validations/note";
import { Formik, Form, FieldArray } from "formik";
import { Note } from "@/types/note.type";
import { formatDate, uuidv4 } from "@/utils";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/20/solid";

interface AddNoteProps {
  currency: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addNote: (note: Note) => void;
}

const denominations = [1, 5, 10, 20];

const AddNote: React.FC<AddNoteProps> = ({
  isOpen,
  setIsOpen,
  addNote,
  currency
}) => {
  const initialValues: Note = {
    id: "",
    currency: "",
    total_amount: 0,
    counts: [
      {
        currency_note: 1,
        count: 0
      }
    ],
    type: "Income",
    text: "",
    created_date: ""
  };

  const submitHandler = async (values: Note) => {
    let newDate = formatDate();
    const counts = values.counts.map(countItem => ({
      ...countItem,
      currency_note: Number(countItem.currency_note)
    }));
    const totalAmount = counts.reduce(
      (total, countItem) => total + countItem.count * countItem.currency_note,
      0
    );

    addNote({
      ...values,
      counts, // Use the updated counts array
      created_date: newDate,
      id: uuidv4(),
      total_amount: totalAmount
    });
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-[200]">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg w-[600px]  rounded bg-white">
          <div className="border-b px-6 py-6">
            <Dialog.Title>Add a New Note</Dialog.Title>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={noteSchema}
            onSubmit={(values) => submitHandler(values)}>
            {({
              errors,
              isValidating,
              isSubmitting,
              resetForm,
              values,
              handleBlur,
              touched,
              setValues
            }) => (
              <Form className={` `}>
                <div
                  className={`px-4 pt-3 ${
                    values?.counts?.length > 3
                      ? "min-h-full h-[420px] overflow-auto overscroll-auto"
                      : ""
                  }`}>
                  <div className="mb-4 w-full">
                    <label className="block mb-[5px] text-sm font-medium capitalize text-gray-700 dark:text-white">
                      Total Amount
                    </label>
                    <p className="border-[#4FAFA8] w-full  rounded-md border py-2 px-3 dark:border-white dark:ring-white focus:ring-[#4FAFA8] hover:border-[#4FAFA8] border-solid bg-white">
                      {values.counts.reduce(
                        (totalAmount, countItem) =>
                          totalAmount +
                          countItem.count * countItem.currency_note,
                        0
                      )}
                    </p>
                  </div>
                  <FieldArray
                    name="counts"
                    render={(arrayHelpers) => (
                      <>
                        {values.counts && values.counts.length > 0
                          ? values.counts.map((item, index) => (
                              <div key={index} className="flex space-x-2 ">
                                <Input
                                  label="Count"
                                  id={`counts.${index}.count`}
                                  name={`counts.${index}.count`}
                                  type="number"
                                  min={0}
                                  //@ts-ignore
                                  errorText={errors.counts?.[index]?.count}
                                  error={touched.counts?.[index]?.count}
                                  onBlur={handleBlur}
                                  inputClass="py-2 px-3 w-full"
                                  placeholder="Count"
                                  containerClass="mb-4  w-2/5"
                                />
                                <Input
                                  label="Select currency notes"
                                  id={`counts.${index}.currency_note`}
                                  name={`counts.${index}.currency_note`}
                                  component="select"
                                  errorText={
                                    //@ts-ignore
                                    errors.counts?.[index]?.currency_note
                                  }
                                  error={touched.counts?.[index]?.currency_note}
                                  onBlur={handleBlur}
                                  inputClass="py-2 px-3 w-full"
                                  placeholder="denomination"
                                  containerClass="mb-4 w-2/5">
                                  {denominations.map((denomination) => (
                                    <option
                                      key={denomination}
                                      value={denomination}>
                                      {currency} {denomination}
                                    </option>
                                  ))}
                                </Input>
                                <div className="w-1/5 text-center ">
                                  <label className="block h-6 mb-[5px] text-sm font-medium capitalize text-gray-700 dark:text-white "></label>
                                  {index === values.counts.length - 1 ? (
                                    <button
                                      className="rounded-md bg-indigo-300 mx-auto px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                                      type="button"
                                      onClick={() =>
                                        arrayHelpers.push({
                                          currency_note: 1,
                                          count: 0
                                        })
                                      }>
                                      <PlusCircleIcon className="w-5 h-5" />
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                      className="rounded-md mx-auto bg-red-300 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block">
                                      <TrashIcon className="w-5 h-5 text-red-700" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))
                          : ""}
                      </>
                    )}
                  />

                  <Input
                    label="Type"
                    id="type"
                    name="type"
                    component="select"
                    value={values.type}
                    errorText={errors.type}
                    error={touched.type}
                    onBlur={handleBlur}
                    inputClass="py-2 px-3 w-full"
                    placeholder="Type"
                    containerClass="mb-4">
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                  </Input>
                  <Input
                    label="Note Text"
                    component="textarea"
                    id="text"
                    name="text"
                    type="text"
                    errorText={errors.text}
                    error={touched.text}
                    onBlur={handleBlur}
                    inputClass="py-2 px-3 w-full"
                    placeholder="Enter your note text"
                    containerClass="mb-4"
                  />
                </div>
                <div className="w-1/2 px-2 py-2 flex ml-auto space-x-3">
                  <Button
                    onClick={() => {
                      resetForm();
                      setIsOpen(false);
                    }}
                    type="button"
                    variant="secondary"
                    className="w-full rounded-lg text-base lg:py-2.5 py-1.5">
                    Cancel
                  </Button>
                  <Button
                    isSubmitting={isSubmitting}
                    type="submit"
                    disabled={isValidating || !noteSchema.isValidSync(values)}
                    className="w-full rounded-lg text-base lg:py-2.5 py-1.5">
                    Add Note
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddNote;
