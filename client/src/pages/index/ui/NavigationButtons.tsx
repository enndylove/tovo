import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface NavigationButtonsProps {
  onNext: () => void,
  onBack?: () => void,
  showBack?: boolean,
  nextLabel?: string,
}

export const NavigationButtons = ({
  onBack,
  onNext,
  showBack = true,
  nextLabel = "Next",
}: NavigationButtonsProps) => (
  <div className="flex items-center justify-between">
    {showBack ? (
      <Button type="button" variant="ghost" className="text-primary text-base px-8 py-3.5" onClick={onBack}>
        Back
      </Button>
    ) : (
      <div />
    )}
    <Button
      type="button"
      className="bg-primary flex flex-row items-center text-white text-base px-8 py-3.5 h-fit w-fit gap-1"
      onClick={onNext}
    >
      {nextLabel} {nextLabel !== "Confirm" && <ChevronRight className="h-4.5 w-4.5" />}
    </Button>
  </div>
);
