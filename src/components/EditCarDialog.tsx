import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, CarFeature } from "@/types/car";
import { IconPicker } from "@/components/IconPicker";
import { Trash2, Plus } from "lucide-react";

interface EditCarDialogProps {
  car: Car;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedCar: Car) => void;
}

export const EditCarDialog = ({ car, open, onOpenChange, onSave }: EditCarDialogProps) => {
  const [editedCar, setEditedCar] = useState(car);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedCar({ ...editedCar, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const addFeature = () => {
    setEditedCar({
      ...editedCar,
      features: [...editedCar.features, { label: "", icon: "Circle" }],
    });
  };

  const updateFeature = (index: number, field: keyof CarFeature, value: string) => {
    const newFeatures = [...editedCar.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setEditedCar({ ...editedCar, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    setEditedCar({
      ...editedCar,
      features: editedCar.features.filter((_, i) => i !== index),
    });
  };

  const handleSave = () => {
    onSave(editedCar);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Car Details</DialogTitle>
          <DialogDescription>
            Update the car information below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={editedCar.year}
                onChange={(e) => setEditedCar({ ...editedCar, year: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={editedCar.model}
                onChange={(e) => setEditedCar({ ...editedCar, model: e.target.value })}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="variant">Variant (Optional)</Label>
            <Input
              id="variant"
              value={editedCar.variant || ""}
              onChange={(e) => setEditedCar({ ...editedCar, variant: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="auctionDate">Auction Date</Label>
            <Input
              id="auctionDate"
              value={editedCar.auctionDate}
              onChange={(e) => setEditedCar({ ...editedCar, auctionDate: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Car Photo</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="cursor-pointer"
            />
            {editedCar.image && (
              <div className="mt-2">
                <img 
                  src={editedCar.image} 
                  alt="Car preview" 
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mileage">Mileage</Label>
            <Input
              id="mileage"
              value={editedCar.mileage}
              onChange={(e) => setEditedCar({ ...editedCar, mileage: e.target.value })}
            />
          </div>

          <IconPicker
            value={editedCar.mileageIcon}
            onChange={(icon) => setEditedCar({ ...editedCar, mileageIcon: icon })}
            label="Mileage Icon"
          />

          <div className="space-y-2">
            <Label htmlFor="engine">Engine</Label>
            <Input
              id="engine"
              value={editedCar.engine}
              onChange={(e) => setEditedCar({ ...editedCar, engine: e.target.value })}
            />
          </div>

          <IconPicker
            value={editedCar.engineIcon}
            onChange={(icon) => setEditedCar({ ...editedCar, engineIcon: icon })}
            label="Engine Icon"
          />

          <div className="space-y-2">
            <Label htmlFor="fuelType">Fuel Type</Label>
            <Input
              id="fuelType"
              value={editedCar.fuelType}
              onChange={(e) => setEditedCar({ ...editedCar, fuelType: e.target.value })}
            />
          </div>

          <IconPicker
            value={editedCar.fuelIcon}
            onChange={(icon) => setEditedCar({ ...editedCar, fuelIcon: icon })}
            label="Fuel Icon"
          />
          
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              value={editedCar.price}
              onChange={(e) => setEditedCar({ ...editedCar, price: parseInt(e.target.value) })}
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Features</Label>
              <Button type="button" onClick={addFeature} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </div>

            {editedCar.features.map((feature, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1 space-y-2">
                  <Label>Feature Label</Label>
                  <Input
                    value={feature.label}
                    onChange={(e) => updateFeature(index, "label", e.target.value)}
                    placeholder="e.g., ABS, Airbags"
                  />
                </div>
                <div className="flex-1">
                  <IconPicker
                    value={feature.icon}
                    onChange={(icon) => updateFeature(index, "icon", icon)}
                    label="Icon"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeFeature(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary-dark">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
