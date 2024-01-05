export interface Count{
  currency_note:number;
 count: number;
}
export interface Note {
  id: string;
 
  currency: string;
  counts: Count[];
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

