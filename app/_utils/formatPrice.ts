const FormatPrice = (number: any) => {
    return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(number)
}

export default FormatPrice;