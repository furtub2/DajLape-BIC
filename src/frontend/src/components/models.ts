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
