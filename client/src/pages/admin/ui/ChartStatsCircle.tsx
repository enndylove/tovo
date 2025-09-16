import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useBookingStatsQuery } from "@/hooks/booking-orders/useBookingStats"

export const description = "A radar chart with dots"

const chartConfig = {
  desktop: {
    label: "Booking",
    color: "var(--ring)",
  },
} satisfies ChartConfig

export function ChartRadarDots() {
  const { data } = useBookingStatsQuery()

  if (!data) return;

  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Booking Radar Chart - Dots</CardTitle>
        <CardDescription>
          Showing total visitors for the last 5 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={data.data.chartStats}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="booking"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 10.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          March - September 2025
        </div>
      </CardFooter>
    </Card>
  )
}
