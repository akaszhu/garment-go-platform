import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const msg = encodeURIComponent("Hi Aanchal! I have a question about an order.");
  return (
    <a
      href={`https://wa.me/919876543210?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full bg-[oklch(0.62_0.16_150)] px-4 py-3 text-sm font-medium text-white shadow-[var(--shadow-lift)] transition-transform hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}
