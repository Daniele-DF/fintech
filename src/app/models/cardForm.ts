import { TypeCard } from "./card";

export interface CardForm{
 type:  'visa' | 'mastercard';
 name : string;
 surname: string;
 numCard: string  | number;
 csv: number;
}
