import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gauge, Fuel, Settings, Edit } from "lucide-react";
import { Car } from "@/types/car";

interface CarCardProps {
  car: Car;
  onEdit: () => void;
}

export const CarCard = ({ car, onEdit }: CarCardProps) => {
  return (
    <Card className="overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 group">
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-secondary/80 to-transparent p-4 z-10">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-1">
                {car.year} {car.model}
              </h3>
              {car.variant && (
                <p className="text-primary-foreground/90 font-medium">{car.variant}</p>
              )}
            </div>
            <Badge className="bg-primary text-primary-foreground font-bold text-sm px-3 py-1">
              {car.auctionDate}
            </Badge>
          </div>
        </div>
        
        <img 
          src={car.image} 
          alt={`${car.year} ${car.model}`}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {car.features.abs && (
            <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
              <Settings className="h-6 w-6 mb-1 text-primary" />
              <span className="text-sm font-medium">ABS</span>
            </div>
          )}
          <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
            <Gauge className="h-6 w-6 mb-1 text-primary" />
            <span className="text-sm font-medium">{car.mileage}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
            <Settings className="h-6 w-6 mb-1 text-primary" />
            <span className="text-sm font-medium">{car.engine}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
            <Fuel className="h-6 w-6 mb-1 text-primary" />
            <span className="text-sm font-medium">{car.fuelType}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold text-primary">
            {car.price}$
          </div>
          <Button onClick={onEdit} variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
