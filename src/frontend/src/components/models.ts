export interface BaseOffer{
  image: string;
  petName: string;
  age: string;
  description: string;
  petType: 'dog' | 'cat';
  localization: string;
  breeds: string;
  shelterId?: string;
}
export interface Offer extends BaseOffer {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface User {
  email: string;
  password: string;
  role?: string;
}

export interface Shelter extends User {
  phoneNumber?: string;
  shelterName?: string;
  shelterDescription?: string;
  address?: string;
  openingHours?: string;
  shelterImage?: string;
}