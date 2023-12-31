import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  mode: 'cors',
  baseUrl:process.env.NEXT_PUBLIC_CURRENCY_API_URI,
  prepareHeaders: async (headers, { getState, endpoint }) => {
  
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
   
    return headers;
  },
 
});



export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);  
   
    return result;
  }, 
  endpoints: (builder) => ({}),
});
