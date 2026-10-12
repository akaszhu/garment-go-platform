import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";

export const Route = createFileRoute("/_site/privacy")({
  head: () => ({ meta: [
    { title: "Privacy Policy — Shoge" },
    { name: "description", content: "Privacy information for people browsing or shopping with Shoge." },
    { property: "og:title", content: "Privacy Policy — Shoge" },
    { property: "og:description", content: "Learn how Shoge should explain the handling of customer information." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <InfoPage title="Privacy policy" lede="How a finished Shoge store should explain its use of personal information." notice="Draft for review: the owner must confirm the legal business name, contact, processors, retention periods, and applicable privacy requirements before launch." sections={[
    { title: "Information collected", body: "A final policy should list the information collected during browsing, account creation, checkout, customer support, and marketing signup." },
    { title: "How information is used", body: "Explain the purposes for using information, including order handling, customer support, fraud prevention, and optional marketing where applicable." },
    { title: "Sharing and service providers", body: "Identify the payment, delivery, hosting, analytics, and communication providers actually used by the live store." },
    { title: "Your choices and requests", body: "Provide a verified way to ask about, correct, or request deletion of personal information, subject to applicable record-keeping obligations." },
    { title: "Contact and effective date", body: "Add the verified privacy contact and effective date before publishing a binding policy." },
  ]} />;
}