interface PriceDisplayProps {
  total?: boolean,
  price: string,
  description: string,
}

export const PriceDisplay = ({ price, description, total = false }: PriceDisplayProps) => (
  <div className="text-center">
    <div className="text-sm text-[#6069A2] mb-1">
      {total ? 'Total price' : 'Estimated price'}
    </div>
    <div className="text-3xl font-bold text-[#454C6A]">{price}</div>
    <div className="text-base font-bold text-[#6069A2]">{description}</div>
  </div>
);
