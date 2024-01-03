import {Note} from "@/types/note.type"
export const getCurrencySymbols = (value: string): string => {
  switch (value) {
    case "cad":
      return "CA$";
    case "eur":
      return "€";
    case "myr":
      return "RM"; // Malaysian Ringgit
    default:
      return "$";
  }
};

export const formatDate = () => {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return formattedDate;
};


export const currencyOptions = [
    { value: 'usd', label: 'USD' },
    { value: 'cad', label: 'CAD' },
    { value: 'myr', label: 'MYR' },
    { value: 'eur', label: 'EUR' },
    // Add more currencies as needed
  ];


  export const navigation = [
    { name: "Home", href: "#" },
    { name: "Invoices", href: "#" },
    { name: "Income", href: "#" },
    { name: "Expenses", href: "#" }
  ];
  export const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

  const getRandomText = () => {
    const words = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'];
    const randomLength = Math.floor(Math.random() * 5) + 1; // Adjust the range as needed
    const randomWords = [];

    for (let i = 0; i < randomLength; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        randomWords.push(words[randomIndex]);
    }

    return randomWords.join(' ');
};

const denominations = [1, 5, 10, 20];

export const generateRandomNote = (): Promise<Note> => {
  const currencies: string[] = ['usd', 'cad', 'myr', 'eur'];
  const randomCurrency: string = currencies[Math.floor(Math.random() * currencies.length)];
  const randomDenomination: number = denominations[Math.floor(Math.random() * denominations.length)];
  const count: number = Math.floor(Math.random() * 50) + 1;

  return Promise.resolve({
    id: uuidv4(),
    currency: randomCurrency,
    currency_note: randomDenomination,
    total_amount: count * randomDenomination,
    count: count,
    type: Math.random() > 0.5 ? 'Income' : 'Expense',
    text: getRandomText(),
    created_date: formatDate(),
  });
}

