export interface Offer {
  id: number;
  image: string;
  petName: string;
  age: number;
  description: string;
  petType: 'dog' | 'cat';
  localization: string;
  breeds: string;
  shelterId: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface User {
  email: string;
  password: string;
  role: string;
}

export interface Shelter extends User {
  phoneNumber?: string;
  shelterName?: string;
  shelterDescription?: string;
  address?: string;
  openingHours?: string;
  shelterImage?: string;
}
