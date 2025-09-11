import { cn } from "@/shared/lib/utils";

interface OptionType {
  value: number;
  label: string;
  sublabel: string;
}

interface GuestOptionProps {
  option: OptionType;
  isSelected: boolean;
  onClick: () => void;
}

export const GuestOption = ({ option, isSelected, onClick }: GuestOptionProps) => (
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
        "text-5xl font-bold mb-1 text-[#454C6A]",
        isSelected
          && "text-white"
      )}
    >{option.label}</div>
    <div
      className={cn(
        "text-[20px] opacity-90 text-[#282C3E]",
        isSelected
          && "text-white"
      )}
    >{option.sublabel}</div>
  </button>
);
