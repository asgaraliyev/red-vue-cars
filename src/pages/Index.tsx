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
        <div className="relative rounded-2xl overflow-hidden shadow-elevated">
          <div className="relative h-[70vh] min-h-[600px]">
            <img 
              src={car.image} 
              alt={`${car.year} ${car.model}`}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute top-6 right-6 z-10">
              <Badge className="bg-primary text-primary-foreground font-bold text-lg px-6 py-2 shadow-lg">
                {car.auctionDate}
              </Badge>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="max-w-4xl">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-2" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                  {car.year} {car.model}
                </h1>
                {car.variant && (
                  <p className="text-2xl md:text-3xl text-white/95 font-semibold mb-6" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.8)' }}>
                    {car.variant}
                  </p>
                )}
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {car.features.abs && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <Settings className="h-8 w-8 mb-2 text-white" />
                      <span className="text-white font-medium text-lg" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>ABS</span>
                    </div>
                  )}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <Gauge className="h-8 w-8 mb-2 text-white" />
                    <span className="text-white font-medium text-lg" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>{car.mileage}</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <Settings className="h-8 w-8 mb-2 text-white" />
                    <span className="text-white font-medium text-lg" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>{car.engine}</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <Fuel className="h-8 w-8 mb-2 text-white" />
                    <span className="text-white font-medium text-lg" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>{car.fuelType}</span>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="text-6xl md:text-7xl font-bold text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
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
