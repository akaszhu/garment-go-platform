import { ShellLogo } from "@/components/site/BrandLogo";

export function SiteLoader() {
  return (
    <div className="flex min-h-[55vh] items-center justify-center bg-background" role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-4">
        <ShellLogo className="shell-loader h-16 w-16" />
        <span className="sr-only">Loading Shoge</span>
      </div>
    </div>
  );
}