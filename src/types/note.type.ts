export interface Note {
  id: string;
  currency_note: number;
  currency: string;
  count: number;
  total_amount: number;
  text?: string;
  type:string;
  created_date: string; 
}

export interface CurrencyTotals {
  [currency: string]: number;
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

