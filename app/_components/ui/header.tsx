import Image from "next/image";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <Card>
      <CardContent className="p-5 items-center justify-between flex flex-row">
        <Image src="/logo.png" alt="FSW Baber" width={120} height={18} />
        <Button variant="outline" size="icon" className="h-8 w-8">
          <MenuIcon size={18} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header;
