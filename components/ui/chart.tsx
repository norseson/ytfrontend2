import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

const Chart = React.forwardRef<
  React.ElementRef<typeof RechartsPrimitive.ResponsiveContainer>,
  React.ComponentPropsWithoutRef<typeof RechartsPrimitive.ResponsiveContainer>
>(({ className, ...props }, ref) => (
  <RechartsPrimitive.ResponsiveContainer
    ref={ref}
    className={cn("h-[350px] w-full", className)}
    {...props}
  />
));
Chart.displayName = "Chart";

const ChartArea = React.forwardRef<
  React.ElementRef<typeof RechartsPrimitive.Area>,
  React.ComponentPropsWithoutRef<typeof RechartsPrimitive.Area>
>(({ className, ...props }, ref) => (
  <RechartsPrimitive.Area
    ref={ref}
    className={cn("fill-primary/10 stroke-primary", className)}
    {...props}
  />
));
ChartArea.displayName = "ChartArea";

const ChartBar = React.forwardRef<
  React.ElementRef<typeof RechartsPrimitive.Bar>,
  React.ComponentPropsWithoutRef<typeof RechartsPrimitive.Bar>
>(({ className, ...props }, ref) => (
  <RechartsPrimitive.Bar
    ref={ref}
    className={cn("fill-primary", className)}
    {...props}
  />
));
ChartBar.displayName = "ChartBar";

const ChartLine = React.forwardRef<
  React.ElementRef<typeof RechartsPrimitive.Line>,
  React.ComponentPropsWithoutRef<typeof RechartsPrimitive.Line>
>(({ className, ...props }, ref) => (
  <RechartsPrimitive.Line
    ref={ref}
    className={cn("stroke-primary", className)}
    {...props}
  />
));
ChartLine.displayName = "ChartLine";

export { Chart, ChartArea, ChartBar, ChartLine };