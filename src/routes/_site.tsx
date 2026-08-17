import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AnnouncementBar, Header } from "@/components/site/Header";
import { Footer, Newsletter } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
});

function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Newsletter />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
