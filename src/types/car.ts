export interface Car {
  id: string;
  year: number;
  model: string;
  variant?: string;
  auctionDate: string;
  image: string;
  mileage: string;
  engine: string;
  fuelType: string;
  features: {
    abs: boolean;
  };
  price: number;
}
