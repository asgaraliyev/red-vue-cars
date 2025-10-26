import logo from "@/assets/logo.png";
import { Phone, MapPin } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-gradient-primary shadow-elevated">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="611 Auto Import & Rent a Car" className="h-24 md:h-32" />
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-primary-foreground">
            <a href="tel:051-922-55-5" className="flex items-center gap-4 hover:text-primary-light transition-colors">
              <Phone className="h-12 w-12" />
              <span className="text-3xl font-bold">051-922-55-55</span>
            </a>
            <div className="flex items-center gap-4">
              <MapPin className="h-12 w-12" />
              <span className="text-3xl font-bold">Akad Şəfayət Mehdiyev 109A</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
