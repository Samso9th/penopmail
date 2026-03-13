import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader({ title }: { title?: string }) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
      {title && (
        <span className="text-muted-foreground text-sm font-medium">{title}</span>
      )}
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  );
}

