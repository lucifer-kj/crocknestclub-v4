"use client"

import { useState, useEffect } from "react"

export function DropsCountdown() {
    // Target date: 3 days from now for demo
    const [targetDate] = useState(() => {
        const d = new Date()
        d.setDate(d.getDate() + 3)
        d.setHours(20, 0, 0, 0) // 8 PM
        return d
    })

    const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null)

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime()
            const distance = targetDate.getTime() - now

            if (distance < 0) {
                clearInterval(timer)
                setTimeLeft(null)
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                })
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [targetDate])

    if (!timeLeft) return null

    return (
        <div className="flex gap-4 sm:gap-8 justify-center mt-12">
            {[
                { label: 'DAYS', value: timeLeft.days },
                { label: 'HOURS', value: timeLeft.hours },
                { label: 'MINS', value: timeLeft.minutes },
                { label: 'SECS', value: timeLeft.seconds }
            ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                    <div className="bg-black/80 backdrop-blur border border-white/20 w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center rounded-2xl shadow-2xl">
                        <span className="text-2xl sm:text-4xl font-black text-white tabular-nums">
                            {item.value.toString().padStart(2, '0')}
                        </span>
                    </div>
                    <span className="mt-4 text-xs font-bold tracking-widest text-primary glow-text">
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    )
}
