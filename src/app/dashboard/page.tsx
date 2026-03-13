import { ArrowUpRight, Globe, Mail, Shield } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  {
    title: "Total Aliases",
    value: "24",
    change: "+3",
    trend: "up",
    icon: Mail,
  },
  {
    title: "Active Domains",
    value: "3",
    change: "+1",
    trend: "up",
    icon: Globe,
  },
  {
    title: "Emails Forwarded",
    value: "1,284",
    change: "+12%",
    trend: "up",
    icon: ArrowUpRight,
  },
  {
    title: "Blocked Spam",
    value: "156",
    change: "-8%",
    trend: "down",
    icon: Shield,
  },
];

const activity = [
  { action: "Email forwarded", alias: "shop@yourdomain.com", time: "2 min ago" },
  { action: "New alias created", alias: "newsletter@yourdomain.com", time: "1 hour ago" },
  { action: "Spam blocked", alias: "contact@yourdomain.com", time: "3 hours ago" },
  { action: "Email forwarded", alias: "support@yourdomain.com", time: "5 hours ago" },
  { action: "Domain verified", alias: "yourdomain.com", time: "1 day ago" },
];

const quickActions = [
  { label: "Create New Alias", description: "Generate a new email alias", icon: Mail, href: "/dashboard/aliases" },
  { label: "Add Domain", description: "Connect a custom domain", icon: Globe, href: "/dashboard/domains" },
  { label: "View Spam Report", description: "See blocked messages", icon: Shield, href: "/dashboard/mail" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Welcome back! Here&apos;s an overview of your account.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">{stat.title}</p>
                  <Icon className="text-muted-foreground size-4" />
                </div>
                <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                <p
                  className={`mt-1 text-xs font-medium ${
                    stat.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-500"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <CardDescription>Your latest email activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activity.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-muted-foreground text-xs">{item.alias}</p>
                  </div>
                  <span className="text-muted-foreground text-xs shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
            <CardDescription>Common tasks you can do</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.label}
                    href={action.href}
                    className="hover:bg-muted flex items-center gap-3 rounded-lg p-2 transition-colors"
                  >
                    <div className="bg-primary/10 flex size-9 items-center justify-center rounded-lg">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{action.label}</p>
                      <p className="text-muted-foreground text-xs">{action.description}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
