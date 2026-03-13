"use client";

import { useState } from "react";

import { Paperclip, Reply, Send, Star, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const folders = [
  { label: "Inbox", count: 2 },
  { label: "Starred", count: 2 },
  { label: "Sent", count: 0 },
  { label: "Drafts", count: 1 },
  { label: "Trash", count: 0 },
];

const emails = [
  {
    id: 1, folder: "inbox", read: false, starred: true,
    from: "Alice Johnson", fromEmail: "alice@example.com",
    subject: "Project Update - Q1 Review",
    preview: "Hi, I wanted to share the latest project metrics from our Q1 review...",
    date: "10:32 AM", label: "work",
    body: "Hi,\n\nI wanted to share the latest project metrics from our Q1 review.\n\n• Engagement rate: +23%\n• Avg. session duration: 4m 12s\n• Customer satisfaction score: 4.7/5\n\nLet me know if you'd like to discuss further.\n\nBest,\nAlice",
  },
  {
    id: 2, folder: "inbox", read: false, starred: false,
    from: "GitHub", fromEmail: "notifications@github.com",
    subject: "[peponmail/core] PR #234: Fix forwarding logic",
    preview: "mergify bot merged pull request #234. The forwarding pipeline...",
    date: "9:15 AM", label: "github",
    body: "mergify bot merged pull request #234 into main.\n\nThe forwarding pipeline has been updated to handle edge cases in domain verification. All tests pass.\n\nView on GitHub →",
  },
  {
    id: 3, folder: "inbox", read: true, starred: false,
    from: "Stripe", fromEmail: "receipts@stripe.com",
    subject: "Your receipt from PeponMail Pro",
    preview: "Payment of ₦1,000 was successfully processed...",
    date: "Yesterday", label: "billing",
    body: "Payment receipt\n\nInvoice #INV-2026-0312\nAmount: ₦1,000\nPlan: Custom Domain (1 alias)\nDate: March 12, 2026\n\nThank you for your payment.",
  },
  {
    id: 4, folder: "inbox", read: true, starred: true,
    from: "David Park", fromEmail: "david@startup.io",
    subject: "Re: Partnership Opportunity",
    preview: "Thanks for getting back to me! I'd love to set up a call...",
    date: "Yesterday", label: "partnerships",
    body: "Thanks for getting back to me!\n\nI'd love to set up a call to discuss a potential integration between our platforms. How does Tuesday at 2pm work for you?\n\nBest,\nDavid",
  },
  {
    id: 5, folder: "sent", read: true, starred: false,
    from: "Me", fromEmail: "me@peponmail.com",
    subject: "API Rate Limiting Question",
    preview: "Hi, I'm integrating your API and had a question about rate limits...",
    date: "Mar 7", label: "",
    body: "Hi,\n\nI'm integrating your API and had a question about rate limits. Specifically:\n\n1. What are the limits for the free tier?\n2. Is there a batch endpoint?\n3. What does the enterprise tier offer?\n\nThanks!",
  },
  {
    id: 6, folder: "drafts", read: true, starred: false,
    from: "Me", fromEmail: "me@peponmail.com",
    subject: "Draft: March Newsletter",
    preview: "Welcome to the March edition of the PeponMail newsletter...",
    date: "Mar 5", label: "draft",
    body: "Welcome to the March edition of the PeponMail newsletter!\n\nTODO:\n- Feature announcement (new shared domains)\n- Customer testimonial\n- Updated pricing section",
  },
];

const labelColors: Record<string, string> = {
  work: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  github: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  billing: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  partnerships: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  draft: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
};

export default function MailPage() {
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [search, setSearch] = useState("");
  const [compose, setCompose] = useState(false);

  const filtered = emails.filter(
    (e) =>
      e.folder === activeFolder &&
      (e.subject.toLowerCase().includes(search.toLowerCase()) ||
        e.from.toLowerCase().includes(search.toLowerCase())),
  );

  const selected = emails.find((e) => e.id === selectedId);

  return (
    <div className="border-border -m-6 flex h-[calc(100svh-3rem)] overflow-hidden">
      {/* Folder sidebar */}
      <div className="border-border hidden w-44 shrink-0 flex-col border-r p-3 md:flex">
        <Button size="sm" className="mb-3 w-full" onClick={() => setCompose(true)}>
          + Compose
        </Button>
        <nav className="space-y-0.5">
          {folders.map((f) => (
            <button
              key={f.label}
              onClick={() => { setActiveFolder(f.label.toLowerCase()); setSelectedId(null); }}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                activeFolder === f.label.toLowerCase()
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {f.label}
              {f.count > 0 && (
                <span className="bg-primary/20 text-primary rounded-full px-1.5 text-xs">
                  {f.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Email list */}
      <div className={cn("border-border flex w-full flex-col border-r md:w-72 lg:w-80", selected ? "hidden md:flex" : "flex")}>
        <div className="border-border border-b p-3">
          <Input
            placeholder="Search emails..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 text-sm"
          />
        </div>
        <div className="flex-1 overflow-auto">
          {filtered.length === 0 ? (
            <p className="text-muted-foreground p-4 text-center text-sm">No emails found</p>
          ) : (
            filtered.map((email) => (
              <button
                key={email.id}
                onClick={() => setSelectedId(email.id)}
                className={cn(
                  "border-border w-full border-b p-3 text-left transition-colors",
                  selectedId === email.id ? "bg-primary/5" : "hover:bg-muted/50",
                  !email.read && "bg-muted/30",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Avatar className="size-7 shrink-0">
                      <AvatarFallback className="text-xs">
                        {email.from[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className={cn("truncate text-sm", !email.read && "font-semibold")}>
                      {email.from}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    {email.starred && <Star className="size-3 fill-yellow-400 text-yellow-400" />}
                    <span className="text-muted-foreground text-xs">{email.date}</span>
                  </div>
                </div>
                <p className={cn("mt-1 truncate text-sm", !email.read && "font-medium")}>
                  {email.subject}
                </p>
                <p className="text-muted-foreground mt-0.5 truncate text-xs">{email.preview}</p>
                {email.label && (
                  <Badge className={cn("mt-1.5 text-xs", labelColors[email.label])} variant="secondary">
                    {email.label}
                  </Badge>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Email detail */}
      <div className={cn("flex min-w-0 flex-1 flex-col", !selected ? "hidden md:flex" : "flex")}>
        {selected ? (
          <>
            <div className="border-border flex items-center gap-2 border-b p-3">
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSelectedId(null)}>
                ← Back
              </Button>
              <Button variant="ghost" size="icon" className="size-8">
                <Reply className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="size-8">
                <Trash2 className="size-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-5">
              <h2 className="text-lg font-semibold">{selected.subject}</h2>
              <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                <Avatar className="size-6">
                  <AvatarFallback className="text-xs">{selected.from[0]}</AvatarFallback>
                </Avatar>
                <span>
                  <span className="text-foreground font-medium">{selected.from}</span>{" "}
                  &lt;{selected.fromEmail}&gt;
                </span>
                <span className="ml-auto">{selected.date}</span>
              </div>
              <Separator className="my-4" />
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{selected.body}</p>
            </div>
            <div className="border-border border-t p-3">
              <Button size="sm" variant="outline">
                <Reply className="mr-2 size-4" /> Reply
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-muted-foreground text-sm">Select an email to read</p>
          </div>
        )}
      </div>

      {/* Compose dialog */}
      <Dialog open={compose} onOpenChange={setCompose}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="recipient@example.com" />
            <Input placeholder="Email subject" />
            <Textarea placeholder="Write your message..." className="min-h-48 resize-none" />
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon">
                <Paperclip className="size-4" />
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setCompose(false)}>Discard</Button>
                <Button size="sm">
                  <Send className="mr-2 size-4" /> Send
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
