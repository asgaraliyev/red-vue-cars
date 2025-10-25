import { useState } from "react";
import { Header } from "@/components/Header";
import { EditCarDialog } from "@/components/EditCarDialog";
import { Car } from "@/types/car";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gauge, Fuel, Settings, Edit } from "lucide-react";

const Index = () => {
  const [car, setCar] = useState<Car>({
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
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditCar = () => {
    setIsDialogOpen(true);
  };

  const handleSaveCar = (updatedCar: Car) => {
    setCar(updatedCar);
    toast.success("Car updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="relative rounded-2xl overflow-hidden shadow-elevated bg-card">
          <div className="relative h-[60vh] min-h-[500px]">
            <img 
              src={car.image} 
              alt={`${car.year} ${car.model}`}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
            
            <div className="absolute top-6 right-6 z-10">
              <Badge className="bg-primary text-primary-foreground font-bold text-lg px-6 py-2 shadow-lg">
                {car.auctionDate}
              </Badge>
            </div>
            
            <div className="absolute top-6 left-6 z-10">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-1" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                {car.year} {car.model}
              </h1>
              {car.variant && (
                <p className="text-xl md:text-2xl text-white/95 font-semibold" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.8)' }}>
                  {car.variant}
                </p>
              )}
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {car.features.abs && (
                <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                  <Settings className="h-8 w-8 mb-2 text-primary" />
                  <span className="font-medium text-lg">ABS</span>
                </div>
              )}
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <Gauge className="h-8 w-8 mb-2 text-primary" />
                <span className="font-medium text-lg">{car.mileage}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <Settings className="h-8 w-8 mb-2 text-primary" />
                <span className="font-medium text-lg">{car.engine}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <Fuel className="h-8 w-8 mb-2 text-primary" />
                <span className="font-medium text-lg">{car.fuelType}</span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="text-6xl md:text-7xl font-bold text-primary">
                {car.price}$
              </div>
              <Button 
                onClick={handleEditCar} 
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white font-bold text-lg px-8 py-6 shadow-lg"
              >
                <Edit className="h-5 w-5 mr-2" />
                Edit Details
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <EditCarDialog
        car={car}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveCar}
      />
    </div>
  );
};

export default Index;
