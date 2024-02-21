function DateFormat({ date }) {
    const parsedDate = new Date(date);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };
    const formatted = parsedDate.toLocaleDateString('en-IN', options);
    
    return (
        <div>{formatted}</div>
    )
}

export default DateFormat;