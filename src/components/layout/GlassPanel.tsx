import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  accentColor?: string;
  glowColor?: string;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, accentColor, glowColor, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("glass rounded-2xl p-6 md:p-8", className)}
        style={{
          ...(accentColor && {
            borderColor: accentColor,
            borderWidth: "1px",
            borderStyle: "solid",
          }),
          ...(glowColor && {
            boxShadow: `0 0 30px ${glowColor}, inset 0 0 30px ${glowColor}`,
          }),
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

GlassPanel.displayName = "GlassPanel";
