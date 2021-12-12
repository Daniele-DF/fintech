export interface Movement {
  _id: string;
  type: 'in' | 'out';
  amount: number;
  title: string;
  description: string;
  cardId: string;
  timestamp: number;
}




export interface ListMovement{
  data: Movement[];
  total: number;
}
