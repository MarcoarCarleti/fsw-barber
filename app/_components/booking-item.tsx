"use client";

import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import formatPrice from "../_utils/formatPrice";
import { Button } from "./ui/button";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: { service: true; barbershop: true };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const router = useRouter();

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const isBookingConfirmed = isFuture(booking.date);

  const handleCancelBookingClick = async () => {
    try {
      setIsDeleteLoading(true);

      await cancelBooking(booking.id);

      toast.success("Reserva Cancelada");

      setIsSheetOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Card className="min-w-[75%]">
          <CardContent className=" px-0 flex-row flex  py-0">
            <div className="flex flex-[3] flex-col gap-2 py-5 pl-5">
              <Badge
                variant={isBookingConfirmed ? "default" : "secondary"}
                className=" w-fit"
              >
                {isBookingConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>

              <h2 className="font-bold">{booking.service.name}</h2>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.barbershop.imageUrl} />

                  <AvatarFallback>A</AvatarFallback>
                </Avatar>

                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>

            <div className="flex flex-col flex-1 items-center justify-center border-l border-solid border-secondary">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-sm">
                {format(booking.date, "hh:mm", {
                  locale: ptBR,
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="px-0">
        <SheetHeader className="text-left px-5 pb-6 border-b border-solid border-secondary">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <div className="relative h-[180px] w-full mt-6">
            <Image
              src="/barbershop-map.png"
              alt={booking.barbershop.address}
              fill
            />

            <div className="w-full px-5 absolute bottom-4 left-0 ">
              <Card>
                <CardContent className="p-3 flex gap-2">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />

                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>

                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">
                      {booking.barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            variant={isBookingConfirmed ? "default" : "secondary"}
            className="my-3 w-fit"
          >
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card>
            <CardContent className="p-3 gap-3 flex flex-col">
              <div className="flex justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <h3 className="font-bold text-sm">
                  {formatPrice(booking.service.price)}
                </h3>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Data</h3>
                <h4 className="text-sm">
                  {format(booking.date, "dd 'de' MMMM", {
                    locale: ptBR,
                  })}
                </h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Hora</h3>
                <h4 className="text-sm">{format(booking.date, "hh:mm")}</h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">Barbearia</h3>
                <h4 className="text-sm">{booking.barbershop.name}</h4>
              </div>
            </CardContent>
          </Card>

          <SheetFooter className="flex flex-row gap-3 mt-6">
            <SheetClose asChild>
              <Button className="w-full" variant="secondary">
                Voltar
              </Button>
            </SheetClose>
            <Button
              className="w-full"
              variant="destructive"
              disabled={!isBookingConfirmed || isDeleteLoading}
              onClick={handleCancelBookingClick}
            >
              {isDeleteLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Cancelar Reserva
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
