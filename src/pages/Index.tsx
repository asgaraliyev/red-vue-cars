import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { EditCarDialog } from "@/components/EditCarDialog";
import { Car } from "@/types/car";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Download } from "lucide-react";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import html2canvas from "html2canvas";

const Index = () => {
  const [car, setCar] = useState<Car>({
    id: "1",
    year: 2025,
    model: "HONDA CIVIC",
    variant: "SPORT",
    auctionDate: "25 OKTYABR AUKSION",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=1200",
    mileage: "5,914 Mil",
    mileageIcon: "Gauge",
    engine: "2L-VB",
    engineIcon: "Settings",
    fuelType: "Benzin",
    fuelIcon: "Fuel",
    features: [
      { label: "ABS", icon: "Shield" },
    ],
    price: 9500,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const carCardRef = useRef<HTMLDivElement>(null);

  const handleEditCar = () => {
    setIsDialogOpen(true);
  };

  const handleSaveCar = (updatedCar: Car) => {
    setCar(updatedCar);
    toast.success("Car updated successfully!");
  };

  const handleDownload = async () => {
    if (!carCardRef.current) return;
    
    setIsDownloading(true);
    
    try {
      const canvas = await html2canvas(carCardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: null,
        foreignObjectRendering: false,
      });
      
      const link = document.createElement("a");
      link.download = `${car.year}-${car.model.replace(/\s+/g, "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      toast.success("Image downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download image");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <div ref={carCardRef} className="bg-white rounded-2xl overflow-hidden shadow-elevated">
            <Header />
            
            <div className="relative rounded-none overflow-hidden bg-card">
              <div className="relative h-[75vh] min-h-[700px]">
                <img 
                  src={car.image} 
                  alt={`${car.year} ${car.model}`}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
                
                <div className="absolute top-6 right-6 z-10">
                  <Badge 
                    className="bg-primary text-primary-foreground font-bold text-base shadow-lg" 
                    style={{ padding: '6px 20px' }}
                  >
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
              
              <div className="p-6">
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-4">
                  {car.features.map((feature, index) => {
                    const FeatureIcon = Icons[feature.icon as keyof typeof Icons] as LucideIcon || Icons.Circle;
                    return (
                      <div key={index} className="flex flex-col items-center justify-center p-2 bg-muted rounded-lg">
                        <FeatureIcon className="h-5 w-5 mb-1 text-primary" />
                        <span className="font-medium text-xs text-center">{feature.label}</span>
                      </div>
                    );
                  })}
                  <div className="flex flex-col items-center justify-center p-2 bg-muted rounded-lg">
                    {(() => {
                      const MileageIcon = Icons[car.mileageIcon as keyof typeof Icons] as LucideIcon || Icons.Gauge;
                      return <MileageIcon className="h-5 w-5 mb-1 text-primary" />;
                    })()}
                    <span className="font-medium text-xs text-center">{car.mileage}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 bg-muted rounded-lg">
                    {(() => {
                      const EngineIcon = Icons[car.engineIcon as keyof typeof Icons] as LucideIcon || Icons.Settings;
                      return <EngineIcon className="h-5 w-5 mb-1 text-primary" />;
                    })()}
                    <span className="font-medium text-xs text-center">{car.engine}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 bg-muted rounded-lg">
                    {(() => {
                      const FuelIcon = Icons[car.fuelIcon as keyof typeof Icons] as LucideIcon || Icons.Fuel;
                      return <FuelIcon className="h-5 w-5 mb-1 text-primary" />;
                    })()}
                    <span className="font-medium text-xs text-center">{car.fuelType}</span>
                  </div>
                </div>
                
                <div className="text-5xl md:text-6xl font-bold text-primary">
                  {car.price}$
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button 
              onClick={handleDownload} 
              size="lg"
              variant="outline"
              className="font-bold text-base px-6 py-5"
              disabled={isDownloading}
            >
              <Download className="h-4 w-4 mr-2" />
              {isDownloading ? "Downloading..." : "Download"}
            </Button>
            <Button 
              onClick={handleEditCar} 
              size="lg"
              className="bg-primary hover:bg-primary-dark text-white font-bold text-base px-6 py-5 shadow-lg"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Details
            </Button>
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
