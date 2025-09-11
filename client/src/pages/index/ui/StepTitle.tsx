import { cn } from "@/shared/lib/utils";

interface StepTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const StepTitle = ({ children, className }: StepTitleProps) => (
  <h1 className={cn("text-3xl font-medium mb-8 bg-gradient-to-r from-[#454C6A] to-[#5F6994] bg-clip-text text-transparent", className)}>
    {children}
  </h1>
);
