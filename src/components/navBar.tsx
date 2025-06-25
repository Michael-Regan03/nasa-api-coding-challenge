import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function NavBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <a href="/apod" className={cn("p-2", NavigationMenuLink)}>
            Astronomy Picture of the Day (APOD)
          </a>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <a href="/neo" className={cn("p-2", NavigationMenuLink)}>
            Near Earth Objects (NEO)
          </a>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <a href="/cme" className={cn("p-2", NavigationMenuLink)}>
            Coronal Mass Ejection (CME)
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
