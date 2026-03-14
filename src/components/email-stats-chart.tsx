"use client"

import * as React from "react"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartData = [
  { date: "2024-04-01", sent: 320, received: 210, spamBlocked: 80 },
  { date: "2024-04-02", sent: 280, received: 175, spamBlocked: 60 },
  { date: "2024-04-03", sent: 410, received: 290, spamBlocked: 120 },
  { date: "2024-04-04", sent: 375, received: 240, spamBlocked: 95 },
  { date: "2024-04-05", sent: 460, received: 310, spamBlocked: 140 },
  { date: "2024-04-06", sent: 390, received: 255, spamBlocked: 100 },
  { date: "2024-04-07", sent: 300, received: 190, spamBlocked: 70 },
  { date: "2024-04-08", sent: 510, received: 360, spamBlocked: 155 },
  { date: "2024-04-09", sent: 275, received: 165, spamBlocked: 55 },
  { date: "2024-04-10", sent: 430, received: 295, spamBlocked: 110 },
  { date: "2024-04-11", sent: 495, received: 340, spamBlocked: 145 },
  { date: "2024-04-12", sent: 360, received: 230, spamBlocked: 90 },
  { date: "2024-04-13", sent: 520, received: 375, spamBlocked: 160 },
  { date: "2024-04-14", sent: 285, received: 180, spamBlocked: 65 },
  { date: "2024-04-15", sent: 340, received: 215, spamBlocked: 85 },
  { date: "2024-04-16", sent: 405, received: 270, spamBlocked: 105 },
  { date: "2024-04-17", sent: 560, received: 400, spamBlocked: 175 },
  { date: "2024-04-18", sent: 480, received: 330, spamBlocked: 135 },
  { date: "2024-04-19", sent: 355, received: 225, spamBlocked: 88 },
  { date: "2024-04-20", sent: 265, received: 160, spamBlocked: 52 },
  { date: "2024-04-21", sent: 310, received: 200, spamBlocked: 72 },
  { date: "2024-04-22", sent: 390, received: 255, spamBlocked: 98 },
  { date: "2024-04-23", sent: 345, received: 220, spamBlocked: 84 },
  { date: "2024-04-24", sent: 500, received: 355, spamBlocked: 148 },
  { date: "2024-04-25", sent: 420, received: 280, spamBlocked: 112 },
  { date: "2024-04-26", sent: 260, received: 155, spamBlocked: 50 },
  { date: "2024-04-27", sent: 540, received: 385, spamBlocked: 165 },
  { date: "2024-04-28", sent: 295, received: 185, spamBlocked: 68 },
  { date: "2024-04-29", sent: 445, received: 305, spamBlocked: 125 },
  { date: "2024-04-30", sent: 580, received: 415, spamBlocked: 180 },
  { date: "2024-05-01", sent: 315, received: 200, spamBlocked: 75 },
  { date: "2024-05-02", sent: 465, received: 320, spamBlocked: 130 },
  { date: "2024-05-03", sent: 380, received: 245, spamBlocked: 95 },
  { date: "2024-05-04", sent: 530, received: 375, spamBlocked: 158 },
  { date: "2024-05-05", sent: 610, received: 440, spamBlocked: 190 },
  { date: "2024-05-06", sent: 575, received: 410, spamBlocked: 172 },
  { date: "2024-05-07", sent: 440, received: 300, spamBlocked: 118 },
  { date: "2024-05-08", sent: 290, received: 182, spamBlocked: 66 },
  { date: "2024-05-09", sent: 370, received: 238, spamBlocked: 92 },
  { date: "2024-05-10", sent: 455, received: 315, spamBlocked: 128 },
  { date: "2024-05-11", sent: 490, received: 345, spamBlocked: 142 },
  { date: "2024-05-12", sent: 360, received: 228, spamBlocked: 88 },
  { date: "2024-05-13", sent: 335, received: 210, spamBlocked: 78 },
  { date: "2024-05-14", sent: 560, received: 400, spamBlocked: 168 },
  { date: "2024-05-15", sent: 595, received: 425, spamBlocked: 178 },
  { date: "2024-05-16", sent: 480, received: 335, spamBlocked: 138 },
  { date: "2024-05-17", sent: 615, received: 445, spamBlocked: 188 },
  { date: "2024-05-18", sent: 455, received: 315, spamBlocked: 125 },
  { date: "2024-05-19", sent: 350, received: 222, spamBlocked: 85 },
  { date: "2024-05-20", sent: 320, received: 200, spamBlocked: 76 },
  { date: "2024-05-21", sent: 255, received: 158, spamBlocked: 55 },
  { date: "2024-05-22", sent: 248, received: 152, spamBlocked: 50 },
  { date: "2024-05-23", sent: 415, received: 280, spamBlocked: 108 },
  { date: "2024-05-24", sent: 460, received: 315, spamBlocked: 122 },
  { date: "2024-05-25", sent: 395, received: 260, spamBlocked: 100 },
  { date: "2024-05-26", sent: 375, received: 242, spamBlocked: 94 },
  { date: "2024-05-27", sent: 560, received: 398, spamBlocked: 165 },
  { date: "2024-05-28", sent: 385, received: 248, spamBlocked: 96 },
  { date: "2024-05-29", sent: 252, received: 155, spamBlocked: 52 },
  { date: "2024-05-30", sent: 490, received: 342, spamBlocked: 138 },
  { date: "2024-05-31", sent: 330, received: 208, spamBlocked: 80 },
  { date: "2024-06-01", sent: 328, received: 205, spamBlocked: 78 },
  { date: "2024-06-02", sent: 590, received: 422, spamBlocked: 172 },
  { date: "2024-06-03", sent: 278, received: 172, spamBlocked: 62 },
  { date: "2024-06-04", sent: 555, received: 395, spamBlocked: 162 },
  { date: "2024-06-05", sent: 262, received: 160, spamBlocked: 56 },
  { date: "2024-06-06", sent: 448, received: 308, spamBlocked: 120 },
  { date: "2024-06-07", sent: 475, received: 332, spamBlocked: 136 },
  { date: "2024-06-08", sent: 520, received: 368, spamBlocked: 150 },
  { date: "2024-06-09", sent: 575, received: 408, spamBlocked: 168 },
  { date: "2024-06-10", sent: 305, received: 192, spamBlocked: 72 },
  { date: "2024-06-11", sent: 268, received: 165, spamBlocked: 58 },
  { date: "2024-06-12", sent: 605, received: 435, spamBlocked: 178 },
  { date: "2024-06-13", sent: 252, received: 155, spamBlocked: 52 },
  { date: "2024-06-14", sent: 548, received: 390, spamBlocked: 160 },
  { date: "2024-06-15", sent: 462, received: 322, spamBlocked: 132 },
  { date: "2024-06-16", sent: 505, received: 358, spamBlocked: 146 },
  { date: "2024-06-17", sent: 598, received: 428, spamBlocked: 175 },
  { date: "2024-06-18", sent: 280, received: 174, spamBlocked: 62 },
  { date: "2024-06-19", sent: 492, received: 348, spamBlocked: 142 },
  { date: "2024-06-20", sent: 545, received: 388, spamBlocked: 158 },
  { date: "2024-06-21", sent: 322, received: 202, spamBlocked: 76 },
  { date: "2024-06-22", sent: 468, received: 328, spamBlocked: 134 },
  { date: "2024-06-23", sent: 612, received: 440, spamBlocked: 182 },
  { date: "2024-06-24", sent: 288, received: 178, spamBlocked: 65 },
  { date: "2024-06-25", sent: 298, received: 185, spamBlocked: 68 },
  { date: "2024-06-26", sent: 552, received: 392, spamBlocked: 162 },
  { date: "2024-06-27", sent: 578, received: 412, spamBlocked: 170 },
  { date: "2024-06-28", sent: 302, received: 190, spamBlocked: 72 },
  { date: "2024-06-29", sent: 275, received: 170, spamBlocked: 60 },
  { date: "2024-06-30", sent: 568, received: 405, spamBlocked: 168 },
]

const chartConfig = {
  emails: {
    label: "Emails",
  },
  sent: {
    label: "Sent",
    color: "var(--chart-1)",
  },
  received: {
    label: "Received",
    color: "var(--chart-2)",
  },
  spamBlocked: {
    label: "Spam Blocked",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export function EmailStatsChart() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Email Stats</CardTitle>
          <CardDescription>Sent, opened, and blocked over time</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillSent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-sent)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-sent)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillReceived" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-received)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-received)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillSpamBlocked" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-spamBlocked)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-spamBlocked)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="sent"
              type="natural"
              fill="url(#fillSent)"
              stroke="var(--color-sent)"
              stackId="a"
            />
            <Area
              dataKey="received"
              type="natural"
              fill="url(#fillReceived)"
              stroke="var(--color-received)"
              stackId="a"
            />
            <Area
              dataKey="spamBlocked"
              type="natural"
              fill="url(#fillSpamBlocked)"
              stroke="var(--color-spamBlocked)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
