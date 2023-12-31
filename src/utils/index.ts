export const getCurrencySymbols = (value: string): string => {
    switch (value) {
        case 'cad':
            return 'CA$';
        case 'eur':
            return '€';
        case 'myr':
            return 'RM'; // Malaysian Ringgit
        default:
            return '$';
    }
};