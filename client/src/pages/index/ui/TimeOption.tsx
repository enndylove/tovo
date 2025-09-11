import { cn } from "@/shared/lib/utils";

interface TimeOptionProps {
  time: string,
  isSelected: boolean,
  onClick: () => void,
}

export const TimeOption = ({ time, isSelected, onClick }: TimeOptionProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "w-full h-[120px] p-3 rounded-lg text-center transition-all",
      isSelected
        ? "shadow-lg bg-[linear-gradient(180deg,#454C6A_0%,#4C567F_25%,#546094_50%,#FF8282_100%)]"
        : "bg-white border border-[#E8EFF7]"
    )}
  >
    <div
      className={cn(
        "text-2xl",
        isSelected
          ? "font-bold text-[#F3F6FA]"
          : "font-medium text-[#454C6A]"
      )}
    >
      {time}
    </div>
  </button>
);
