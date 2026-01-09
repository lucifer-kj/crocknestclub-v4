"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

interface AnalyticsChartProps {
    data: {
        date: string
        total: number
        day: string
    }[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-black/80 backdrop-blur border border-white/20 p-3 rounded-lg shadow-xl">
                <p className="text-white font-bold">{payload[0].payload.day}</p>
                <p className="text-primary font-mono font-bold">
                    ${payload[0].value.toFixed(2)}
                </p>
            </div>
        )
    }
    return null
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis
                    dataKey="day"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Bar
                    dataKey="total"
                    fill="#currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                    barSize={40}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}
