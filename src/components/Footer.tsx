import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="container flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span className="font-display font-semibold text-foreground">SurakshaPay</span>
        </div>
        <p>AI-powered weekly income protection for delivery partners in India</p>
        <p className="text-xs">Hackathon Prototype · Not a licensed insurance product · For demo purposes only</p>
      </div>
    </footer>
  );
}
