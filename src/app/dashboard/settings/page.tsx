"use client";

import { useState } from "react";

import { AlertTriangle, CreditCard, KeyRound, Smartphone } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  const [notifs, setNotifs] = useState({
    emailForwarded: true,
    spamBlocked: true,
    domainVerified: true,
    weeklyDigest: false,
  });

  const save = (section: string) => {
    toast("Saved", { description: `${section} updated successfully.` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">
          Manage your account, billing, and preferences.
        </p>
      </div>

      <Tabs defaultValue="account">
        <TabsList className="mb-4 w-full justify-start sm:w-auto">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Account tab */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="John Adeyemi" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue="john@yourdomain.com" type="email" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="forwardAddr">Default Forward Address</Label>
                <Input id="forwardAddr" defaultValue="personal@gmail.com" type="email" />
                <p className="text-muted-foreground text-xs">
                  New aliases will forward here by default.
                </p>
              </div>
              <div className="flex justify-end">
                <Button size="sm" onClick={() => save("Profile")}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing tab */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Current Plan</CardTitle>
              <CardDescription>You are on the Custom Domain plan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/5 border-primary/20 flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Custom Domain</p>
                    <Badge>Active</Badge>
                  </div>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    ₦1,000 / alias / month · 24 aliases
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Change Plan
                </Button>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next billing date</span>
                <span className="font-medium">April 1, 2026</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monthly total</span>
                <span className="font-medium">₦24,000</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-border flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="text-muted-foreground size-5" />
                  <div>
                    <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                    <p className="text-muted-foreground text-xs">Expires 08/28</p>
                  </div>
                </div>
                <Badge variant="secondary">Default</Badge>
              </div>
              <Button variant="outline" size="sm">
                + Add Payment Method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Email Notifications</CardTitle>
              <CardDescription>
                Choose which events trigger an email to you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {(
                [
                  { key: "emailForwarded", label: "Email Forwarded", desc: "When an email is received and forwarded" },
                  { key: "spamBlocked", label: "Spam Blocked", desc: "When a spam message is detected and blocked" },
                  { key: "domainVerified", label: "Domain Verified", desc: "When DNS verification completes" },
                  { key: "weeklyDigest", label: "Weekly Digest", desc: "A weekly summary of your alias activity" },
                ] as const
              ).map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-muted-foreground text-xs">{desc}</p>
                  </div>
                  <Switch
                    checked={notifs[key]}
                    onCheckedChange={(v) => {
                      setNotifs((n) => ({ ...n, [key]: v }));
                      toast(v ? "Enabled" : "Disabled", { description: label });
                    }}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <KeyRound className="size-4" /> Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" placeholder="••••••••" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="new">New Password</Label>
                  <Input id="new" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirm">Confirm New Password</Label>
                  <Input id="confirm" type="password" placeholder="••••••••" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button size="sm" onClick={() => save("Password")}>
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Smartphone className="size-4" /> Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                Add an extra layer of security to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Authenticator App</p>
                <p className="text-muted-foreground text-xs">
                  Not configured
                </p>
              </div>
              <Button size="sm" variant="outline">
                Enable 2FA
              </Button>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-red-600 dark:text-red-400">
                <AlertTriangle className="size-4" /> Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4 bg-red-100 dark:bg-red-900/30" />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">Delete Account</p>
                  <p className="text-muted-foreground text-xs">
                    Permanently delete your account and all associated data.
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  asChild
                >
                  <a href="/account-deletion">Delete Account</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
