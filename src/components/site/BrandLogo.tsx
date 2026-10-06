import logoAsset from "@/assets/shoge-logo.png.asset.json";
import shellAsset from "@/assets/shoge-shell.png.asset.json";
import { cn } from "@/lib/utils";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Shoge"
      width={566}
      height={283}
      className={cn("block h-auto w-32 object-contain", className)}
    />
  );
}

export function ShellLogo({ className }: { className?: string }) {
  return (
    <img
      src={shellAsset.url}
      alt=""
      width={64}
      height={64}
      aria-hidden="true"
      className={cn("block object-contain", className)}
    />
  );
}