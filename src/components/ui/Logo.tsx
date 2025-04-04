import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className, width = 40, height = 40 }: LogoProps) {
  return (
    <div 
      className={cn(
        "relative",
        className
      )}
      style={{ width, height }}
    >
      {/* Light mode logo */}
      <img
        src="/lovable-uploads/4b2f004d-90b0-4a24-936a-cb86ea6675c5.png"
        alt="Break Boundaries Logo"
        width={width}
        height={height}
        className="absolute inset-0 transition-opacity duration-200 dark:opacity-0"
      />
      {/* Dark mode logo */}
      <img
        src="/lovable-uploads/4b2f004d-90b0-4a24-936a-cb86ea6675c5.png"
        alt="Break Boundaries Logo"
        width={width}
        height={height}
        className="absolute inset-0 transition-opacity duration-200 opacity-0 dark:opacity-100 [filter:invert(1)_brightness(1)_contrast(1.1)]"
      />
    </div>
  );
} 