import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export function NavBar() {
  const navigate = useNavigate();
  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList className="flex-wrap justify-right gap-1 md:gap-2">
        <NavigationMenuItem>
          <Button
            onClick={() => navigate("/apod")}
            className={cn(
              "p-2",
              NavigationMenuLink,
              "min-w-0 bg-transparent shadow-none"
            )}
            variant="ghost"
          >
            Astronomy Picture of the Day (APOD)
          </Button>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Button
            onClick={() => navigate("/neo")}
            className={cn(
              "p-2",
              NavigationMenuLink,
              "min-w-0 bg-transparent shadow-none"
            )}
            variant="ghost"
          >
            Near Earth Objects (NEO)
          </Button>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Button
            onClick={() => navigate("/cme")}
            className={cn(
              "p-2",
              NavigationMenuLink,
              "min-w-0 bg-transparent shadow-none"
            )}
            variant="ghost"
          >
            Coronal Mass Ejection (CME)
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
