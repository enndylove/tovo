import { cn } from "@/shared/lib/utils";

interface DateOptionType {
  date: string;
  day: string;
  isToday: boolean;
  value: string;
}

interface DateOptionProps {
  date: DateOptionType,
  isSelected: boolean,
  onClick: () => void,
}

export const DateOption = ({ date, isSelected, onClick }: DateOptionProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "w-full h-[139px] p-6 rounded-lg text-center transition-all",
      isSelected
        ? "shadow-lg bg-[linear-gradient(180deg,#454C6A_0%,#4C567F_25%,#546094_50%,#FF8282_100%)]"
        : "bg-white border border-[#E8EFF7]"
    )}
  >
    <div
      className={cn(
        "text-base mb-2.5",
        isSelected
          ? "text-[#D6E0EF]"
          : "text-[#8A99CA]"
      )}
    >
      {date.day}
    </div>
    <div
      className={cn(
        "text-5xl font-bold",
        isSelected
          ? "text-[#F3F6FA]"
          : "text-[#454C6A]"
      )}
    >
      {date.date}
    </div>
    {date.isToday && (
      <span className={cn("text-[10px] py-0.5 px-0.5 font-light rounded-full",
        isSelected
          ? 'bg-white/20 text-white'
          : 'bg-[#6A76B6] text-white'
      )}>
        today
      </span>
    )}
  </button>
);
