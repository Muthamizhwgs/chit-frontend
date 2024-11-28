export const CashGiven = ({ datas }) => {
    let auctionTotal = 0;
    let amountTotal = 0;
    let cashGiven = 0;
  
    datas.forEach((data) => {
      auctionTotal += data.auctionAmount;
      amountTotal += data.amount;
      cashGiven += data.amountToBePaid;
    });
  
    if (cashGiven > 0) {
      let amount = auctionTotal + amountTotal;
      let total = amount - cashGiven;
      let datas = { total, auctionTotal, amountTotal };
      console.log(datas);
      return total;
    } else {
      return 0;
    }
  };
  
  export const AuctionAmount = ({ datas }) => {
    let auctionTotal = 0;
    let amountTotal = 0;
    let cashGiven = 0;
  
    datas.forEach((data) => {
      auctionTotal += data.auctionAmount;
      amountTotal += data.amount;
      cashGiven += data.amountToBePaid;
    });
  
    if (auctionTotal > 0) {
      let amount = auctionTotal;
  
      return amount;
    } else {
      return 0;
    }
  };
  
  export const Amount = ({ datas }) => {
    let auctionTotal = 0;
    let amountTotal = 0;
    let cashGiven = 0;
  
    datas.forEach((data) => {
      auctionTotal += data.auctionAmount;
      amountTotal += data.amount;
      cashGiven += data.amountToBePaid;
    });
  
    if (amountTotal > 0) {
      let amount = amountTotal;
      return amount;
    } else {
      return 0;
    }
  };

  
  