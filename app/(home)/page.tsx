import { ptBR } from "date-fns/locale/pt-BR";
import Header from "../_components/ui/header";
import { format } from "date-fns";

export default function Home() {
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
    </div>
  );
}
