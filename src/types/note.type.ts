export interface Note {
  id: string;
  currency_note: number;
  count: number;
  total_amount: number;
  text?: string;
  type:string;
  created_date: Date; 
}




export interface  TransactioState {
  transaction: {
    notes:Note[]
    currency: string;
  };
}
export interface Transaction {
  id: number;
  name: string;
  price: number;
  quantity: number;
  images: string;
}

