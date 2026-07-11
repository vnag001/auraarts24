"use client";

import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DollarSign, ShoppingBag, Users, Palette } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const STATS = [
  { label: "Total Revenue", value: formatPrice(48250), icon: DollarSign, change: "+12.4%" },
  { label: "Orders", value: "162", icon: ShoppingBag, change: "+8.1%" },
  { label: "Customers", value: "94", icon: Users, change: "+4.2%" },
  { label: "Commission Requests", value: "23", icon: Palette, change: "+18.6%" },
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 3200 }, { month: "Feb", revenue: 4100 }, { month: "Mar", revenue: 3800 },
  { month: "Apr", revenue: 5200 }, { month: "May", revenue: 6100 }, { month: "Jun", revenue: 7400 },
  { month: "Jul", revenue: 8900 },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-primary mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-secondary p-6 shadow-card">
            <div className="flex items-center justify-between">
              <stat.icon className="h-5 w-5 text-accent" />
              <span className="text-xs text-green-700">{stat.change}</span>
            </div>
            <p className="mt-4 font-display text-2xl text-primary">{stat.value}</p>
            <p className="text-xs text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-secondary p-8 shadow-card">
        <h2 className="font-display text-xl text-primary mb-6">Revenue — Last 7 Months</h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={REVENUE_DATA}>
            <XAxis dataKey="month" stroke="#6B6B6B" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#6B6B6B" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip formatter={(v: number) => formatPrice(v)} />
            <Line type="monotone" dataKey="revenue" stroke="#C89B3C" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
