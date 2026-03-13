"use client";

import { useState } from "react";

import { CheckCircle2, Clock, Copy, ExternalLink, Globe, Plus, RefreshCw } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const domains = [
  {
    id: 1,
    domain: "yourdomain.com",
    status: "verified",
    aliases: 12,
    type: "custom",
    addedOn: "Jan 15, 2026",
    dnsRecords: [],
  },
  {
    id: 2,
    domain: "mycompany.io",
    status: "pending",
    aliases: 3,
    type: "custom",
    addedOn: "Mar 8, 2026",
    dnsRecords: [
      { type: "MX", host: "@", value: "mx1.peponmail.com", priority: "10" },
      { type: "MX", host: "@", value: "mx2.peponmail.com", priority: "20" },
      { type: "TXT", host: "@", value: "v=spf1 include:peponmail.com ~all", priority: "" },
      { type: "TXT", host: "_dmarc", value: "v=DMARC1; p=quarantine; rua=mailto:dmarc@peponmail.com", priority: "" },
    ],
  },
  {
    id: 3,
    domain: "pepon.email",
    status: "shared",
    aliases: 9,
    type: "shared",
    addedOn: "Dec 1, 2025",
    dnsRecords: [],
  },
];

export default function DomainsPage() {
  const [open, setOpen] = useState(false);
  const [newDomain, setNewDomain] = useState("");
  const [domainList, setDomainList] = useState(domains);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard", { description: text });
  };

  const addDomain = () => {
    if (!newDomain) return;
    setDomainList((prev) => [
      ...prev,
      {
        id: Date.now(),
        domain: newDomain,
        status: "pending",
        aliases: 0,
        type: "custom",
        addedOn: "Today",
        dnsRecords: [
          { type: "MX", host: "@", value: "mx1.peponmail.com", priority: "10" },
          { type: "MX", host: "@", value: "mx2.peponmail.com", priority: "20" },
          { type: "TXT", host: "@", value: "v=spf1 include:peponmail.com ~all", priority: "" },
        ],
      },
    ]);
    toast("Domain added", { description: `Configure DNS for ${newDomain}` });
    setNewDomain("");
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Domains</h1>
          <p className="text-muted-foreground text-sm">
            Manage your custom and shared email domains.
          </p>
        </div>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="mr-2 size-4" /> Add Domain
        </Button>
      </div>

      <div className="space-y-4">
        {domainList.map((d) => (
          <Card key={d.id}>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
                    <Globe className="text-primary size-5" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2 text-base">
                      {d.domain}
                      <Badge
                        variant={
                          d.status === "verified"
                            ? "default"
                            : d.status === "shared"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {d.status === "verified" && (
                          <CheckCircle2 className="mr-1 size-3" />
                        )}
                        {d.status === "pending" && (
                          <Clock className="mr-1 size-3" />
                        )}
                        {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {d.type === "shared" ? "Shared domain" : "Custom domain"} ·{" "}
                      {d.aliases} {d.aliases === 1 ? "alias" : "aliases"} · Added{" "}
                      {d.addedOn}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {d.status === "pending" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast("Verification triggered", { description: "Checking DNS…" })}
                    >
                      <RefreshCw className="mr-2 size-3.5" /> Verify DNS
                    </Button>
                  )}
                  {d.status !== "shared" && (
                    <Button variant="ghost" size="icon" className="size-8">
                      <ExternalLink className="size-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            {d.dnsRecords.length > 0 && (
              <>
                <Separator />
                <CardContent className="pt-4">
                  <p className="text-muted-foreground mb-3 text-sm font-medium">
                    Add these DNS records to verify your domain:
                  </p>
                  <div className="overflow-auto rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-16">Type</TableHead>
                          <TableHead className="w-20">Host</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead className="w-16">Priority</TableHead>
                          <TableHead className="w-10" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {d.dnsRecords.map((rec, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              <Badge variant="secondary" className="font-mono text-xs">
                                {rec.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-xs">{rec.host}</TableCell>
                            <TableCell className="max-w-xs truncate font-mono text-xs">
                              {rec.value}
                            </TableCell>
                            <TableCell className="font-mono text-xs text-center">
                              {rec.priority || "—"}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-6"
                                onClick={() => copy(rec.value)}
                              >
                                <Copy className="size-3" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Custom Domain</DialogTitle>
            <DialogDescription>
              Enter your domain name. You&apos;ll need to configure DNS records to
              verify it.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="domain">Domain Name</Label>
              <Input
                id="domain"
                placeholder="yourdomain.com"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addDomain}>Add Domain</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
