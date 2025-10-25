import { useState } from "react";
import { Header } from "@/components/Header";
import { CarCard } from "@/components/CarCard";
import { EditCarDialog } from "@/components/EditCarDialog";
import { Car } from "@/types/car";
import { toast } from "sonner";

const Index = () => {
  const [cars, setCars] = useState<Car[]>([
    {
      id: "1",
      year: 2025,
      model: "HONDA CIVIC",
      variant: "SPORT",
      auctionDate: "25 OKTYABR AUKSION",
      image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=1200",
      mileage: "5,914 Mil",
      engine: "2L-VB",
      fuelType: "Benzin",
      features: {
        abs: true,
      },
      price: 9500,
    },
    {
      id: "2",
      year: 2024,
      model: "TOYOTA CAMRY",
      variant: "XLE",
      auctionDate: "26 OKTYABR AUKSION",
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=1200",
      mileage: "12,450 Mil",
      engine: "2.5L",
      fuelType: "Benzin",
      features: {
        abs: true,
      },
      price: 12300,
    },
    {
      id: "3",
      year: 2023,
      model: "BMW 3 SERIES",
      variant: "M340i",
      auctionDate: "27 OKTYABR AUKSION",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200",
      mileage: "8,200 Mil",
      engine: "3.0L",
      fuelType: "Benzin",
      features: {
        abs: true,
      },
      price: 18900,
    },
  ]);

  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditCar = (car: Car) => {
    setEditingCar(car);
    setIsDialogOpen(true);
  };

  const handleSaveCar = (updatedCar: Car) => {
    setCars(cars.map((car) => (car.id === updatedCar.id ? updatedCar : car)));
    toast.success("Car updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Premium <span className="text-primary">Auto Import</span> & Rent
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our exclusive collection of high-quality imported vehicles available for auction
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard 
              key={car.id} 
              car={car} 
              onEdit={() => handleEditCar(car)}
            />
          ))}
        </div>
      </main>
      
      {editingCar && (
        <EditCarDialog
          car={editingCar}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSave={handleSaveCar}
        />
      )}
    </div>
  );
};

export default Index;
