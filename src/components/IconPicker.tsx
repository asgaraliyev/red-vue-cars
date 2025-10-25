import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  label: string;
}

export const IconPicker = ({ value, onChange, label }: IconPickerProps) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const iconNames = useMemo(() => {
    return Object.keys(Icons).filter(
      (key) =>
        key !== "createLucideIcon" &&
        key !== "default" &&
        typeof Icons[key as keyof typeof Icons] === "function"
    );
  }, []);

  const filteredIcons = useMemo(() => {
    if (!search) return iconNames.slice(0, 50);
    return iconNames
      .filter((name) => name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 50);
  }, [search, iconNames]);

  const CurrentIcon = value && Icons[value as keyof typeof Icons] 
    ? (Icons[value as keyof typeof Icons] as LucideIcon)
    : Icons.Circle;

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          className="w-full justify-start"
          onClick={() => setIsOpen(!isOpen)}
        >
          <CurrentIcon className="h-4 w-4 mr-2" />
          {value || "Select icon"}
        </Button>
      </div>

      {isOpen && (
        <div className="border rounded-lg p-4 bg-card">
          <Input
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />
          <ScrollArea className="h-64">
            <div className="grid grid-cols-5 gap-2">
              {filteredIcons.map((iconName) => {
                const IconComponent = Icons[iconName as keyof typeof Icons] as LucideIcon;
                return (
                  <Button
                    key={iconName}
                    type="button"
                    variant={value === iconName ? "default" : "ghost"}
                    size="sm"
                    className="h-12 w-12 p-0"
                    onClick={() => {
                      onChange(iconName);
                      setIsOpen(false);
                    }}
                    title={iconName}
                  >
                    <IconComponent className="h-5 w-5" />
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};
