// src/components/AddNote.tsx
import React from "react";
import { Dialog } from "@headlessui/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Buttons/Button";
import { noteSchema } from "@/utils/validations/note";
import { Formik, Form } from "formik";
import { Note } from "@/types/note.type";


interface AddNoteProps {
  isOpen: boolean;
  currency: string;
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
    currency:'',
    currency_note: 0,
    total_amount: 0,
    count: 0,
    type: "Income",
    text: "",   
    created_date:new Date(),
  };

  const submitHandler = async (values: Note) => {
    addNote({
      ...values,
      id: Date.now().toString() // ID generation
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
        <Dialog.Panel className="mx-auto max-w-lg w-[600px] rounded bg-white">
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
              touched
            }) => (
              <Form className="px-6 py-6">
                <div className="flex space-x-2">
                  <Input
                    label="Count"
                    id="count"
                    name="count"
                    type="number"
                    min={0}
                    errorText={errors.count}
                    error={touched.count}
                    onBlur={handleBlur}
                    inputClass="py-2 px-3 w-full"
                    placeholder="Count"
                    containerClass="mb-4 w-1/2"
                  />

                  <div className="mb-4 w-1/2">
                    <label className="block mb-[5px] text-sm font-medium capitalize text-gray-700 dark:text-white ">
                      Total Amount
                    </label>
                    <p className="border-[#4FAFA8] w-full  rounded-md border py-2 px-3 dark:border-white dark:ring-white focus:ring-[#4FAFA8] hover:border-[#4FAFA8] border-solid bg-white">
                      {values?.currency_note > 0
                        ? values?.count * values?.currency_note
                        : values?.count || 0}
                    </p>
                  </div>
                </div>
                <Input
                  label="Select currency notes"
                  id="currency_note"
                  name="currency_note"
                 
                  component="select"
                  errorText={errors.currency_note}
                  error={touched.currency_note}
                  onBlur={handleBlur}
                  inputClass="py-2 px-3 w-full"
                  placeholder="denomination"
                  containerClass="mb-4 ">
                  {denominations.map((denomination) => (
                    <option key={denomination} value={denomination}>
                      {currency} {denomination}
                    </option>
                  ))}
                </Input>
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

                <div className="w-1/2 flex ml-auto space-x-3">
                  <Button
                   onClick={(e) => {
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
