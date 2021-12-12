export interface Card {
  _id: string,
  number: string,
  ownerId: string,
  owner: string,
  type: 'visa' | 'mastercard',
  amount: number

  }


  export interface CardId {
    selectedCardId: Card;
  }


  export interface TypeCard {
      label: 'visa' | 'mastercard';
      value: 'visa' | 'mastercard';
  }

