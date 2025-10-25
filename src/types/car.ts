export interface CarFeature {
  label: string;
  icon: string;
}

export interface Car {
  id: string;
  year: number;
  model: string;
  variant?: string;
  auctionDate: string;
  image: string;
  mileage: string;
  mileageIcon: string;
  engine: string;
  engineIcon: string;
  fuelType: string;
  fuelIcon: string;
  features: CarFeature[];
  price: number;
}
