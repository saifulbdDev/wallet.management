import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Note } from "@/types/note.type";


interface transactionState {
  currency:string,
  notes: Note[];
 
}





const initialState: transactionState = {
  currency:'usd',
  notes: [],
 
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
   
    setCurrency(state, action: PayloadAction<string>) {
      console.log(action.payload, 'action.payload')
      state.currency = action.payload;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      console.log(action.payload, 'action.payload')
      state.notes.push(action.payload);
    },
    addNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = [...state.notes, ...action.payload];
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  
  }
});

export const {
  setCurrency,
  addNote, removeNote, addNotes
 
} = transactionSlice.actions;
export default transactionSlice.reducer;
