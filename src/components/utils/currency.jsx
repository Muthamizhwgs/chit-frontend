
const CurrencyComponent = (currency) => {
    const formattedAmount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(currency.amount);

    return <span>{formattedAmount}</span>;
};


export default CurrencyComponent