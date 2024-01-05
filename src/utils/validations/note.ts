import * as Yup from 'yup';

const phoneRegExp = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

export const noteSchema = Yup.object().shape({
 
  counts: Yup.array().of(
    Yup.object().shape({
      count: Yup.number().min(0, 'Count must be 0 or greater').required('Please enter a count'),
      currency_note: Yup.number().min(0, 'Currency note must be 0 or greater').required('Please enter a currency note'),
    })
  ),
  type: Yup.string().oneOf(['Income', 'Expense'], 'Invalid type').required('Please select a type'),
  text: Yup.string().required('Please enter a note text'),
});