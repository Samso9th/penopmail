"use client";

import { useState } from "react";

import { Check, Copy, Plus, ToggleLeft, Trash2 } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const initialAliases = [
  { id: 1, alias: "shop@yourdomain.com", forwardTo: "personal@gmail.com", emails: 142, active: true },
  { id: 2, alias: "newsletter@yourdomain.com", forwardTo: "personal@gmail.com", emails: 38, active: true },
  { id: 3, alias: "contact@yourdomain.com", forwardTo: "work@outlook.com", emails: 91, active: false },
  { id: 4, alias: "support@yourdomain.com", forwardTo: "work@outlook.com", emails: 57, active: true },
  { id: 5, alias: "noreply@peponmail.com", forwardTo: "personal@gmail.com", emails: 204, active: true },
];

export default function AliasesPage() {
  const [aliases, setAliases] = useState(initialAliases);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ alias: "", forwardTo: "" });

  const filtered = aliases.filter(
    (a) =>
      a.alias.toLowerCase().includes(search.toLowerCase()) ||
      a.forwardTo.toLowerCase().includes(search.toLowerCase()),
  );

  const toggle = (id: number) => {
    setAliases((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)),
    );
    const alias = aliases.find((a) => a.id === id)!;
    toast(alias.active ? "Alias disabled" : "Alias enabled", {
      description: alias.alias,
    });
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard", { description: text });
  };

  const deleteAlias = (id: number) => {
    const alias = aliases.find((a) => a.id === id)!;
    setAliases((prev) => prev.filter((a) => a.id !== id));
    toast("Alias deleted", { description: alias.alias });
  };

  const create = () => {
    if (!form.alias || !form.forwardTo) return;
    const newAlias = {
      id: Date.now(),
      alias: form.alias,
      forwardTo: form.forwardTo,
      emails: 0,
      active: true,
    };
    setAliases((prev) => [newAlias, ...prev]);
    toast("Alias created", { description: form.alias });
    setForm({ alias: "", forwardTo: "" });
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Aliases</h1>
          <p className="text-muted-foreground text-sm">
            Manage your email aliases and forwarding rules.
          </p>
        </div>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="mr-2 size-4" /> New Alias
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">
                {aliases.length} Aliases
              </CardTitle>
              <CardDescription>
                {aliases.filter((a) => a.active).length} active
              </CardDescription>
            </div>
            <Input
              placeholder="Search aliases..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 w-48 text-sm"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alias</TableHead>
                <TableHead className="hidden sm:table-cell">Forward To</TableHead>
                <TableHead className="hidden md:table-cell text-right">Emails</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((alias) => (
                <TableRow key={alias.id}>
                  <TableCell className="font-mono text-sm">{alias.alias}</TableCell>
                  <TableCell className="text-muted-foreground hidden text-sm sm:table-cell">
                    {alias.forwardTo}
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden text-right text-sm md:table-cell">
                    {alias.emails}
                  </TableCell>
                  <TableCell>
                    <Badge variant={alias.active ? "default" : "secondary"}>
                      {alias.active ? (
                        <><Check className="mr-1 size-3" /> Active</>
                      ) : (
                        "Inactive"
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={() => copy(alias.alias)}
                        title="Copy alias"
                      >
                        <Copy className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={() => toggle(alias.id)}
                        title={alias.active ? "Disable" : "Enable"}
                      >
                        <ToggleLeft className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 text-red-500 hover:text-red-600"
                        onClick={() => deleteAlias(alias.id)}
                        title="Delete alias"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Alias</DialogTitle>
            <DialogDescription>
              Create an email alias and set a forwarding address.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="alias">Alias Email</Label>
              <Input
                id="alias"
                placeholder="shop@yourdomain.com"
                value={form.alias}
                onChange={(e) => setForm((f) => ({ ...f, alias: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="forwardTo">Forward To</Label>
              <Input
                id="forwardTo"
                placeholder="your@gmail.com"
                value={form.forwardTo}
                onChange={(e) => setForm((f) => ({ ...f, forwardTo: e.target.value }))}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={create}>Create Alias</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
