import { apiSlice } from '@/features/apiSlice';
// import {  setCurrency } from './transactionSlice';
export const currencyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrency: builder.query({
      query: () => {
        return {
          url: `/latest?apikey=${process.env.NEXT_PUBLIC_CURRENCY_API_KEY}`,
          method: 'GET',
        };
      },
    }),
    
   
  }),
});

export const { useGetCurrencyQuery, } = currencyApi;
