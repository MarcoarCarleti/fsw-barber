import { ptBR } from "date-fns/locale/pt-BR";
import Header from "../_components/header";
import { format, isFuture } from "date-fns";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, confirmedBookings] = await Promise.all([
    await db.barbershop.findMany(),
    session?.user
      ? await db.booking.findMany({
          where: {
            userId: (session?.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ]);

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl">
          Olá, <span className="font-bold">Usuario</span>
        </h2>

        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      {confirmedBookings.length > 0 && (
        <div className="mt-6">
          <h2 className="pl-5 uppercase text-xs text-gray-400 font-bold mb-3 ">
            agendamentos
          </h2>

          <div className=" px-5 flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden">
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="px-5 uppercase text-xs text-gray-400 font-bold mb-3">
          recomendados
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 uppercase text-xs text-gray-400 font-bold mb-3">
          populares
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
