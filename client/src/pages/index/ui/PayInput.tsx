interface PayInputProps {
  type: string,
  children: React.ReactNode,
}

export function PayInput({ type, children }: PayInputProps) {
  return (
    <p className="text-[#6A76B6] text-base">
      {type}
      <span className="font-bold">: {children}</span>
    </p>
  )
}
