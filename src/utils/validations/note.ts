import * as Yup from 'yup';

const phoneRegExp = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

export const noteSchema = Yup.object().shape({
 
  currency_note: Yup.number().min(0, 'Currency note count must be 0 or greater').required('Please enter a currency note count'),
  count: Yup.number().min(0, 'Count must be 0 or greater').required('Please enter a count'),
  type: Yup.string().oneOf(['Income', 'Expense'], 'Invalid type').required('Please select a type'),
  text: Yup.string().required('Please enter a note text'),
});

