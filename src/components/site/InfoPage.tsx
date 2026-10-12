import { PageHeader } from "@/components/site/Page";

export type InfoSection = { title: string; body: string };

export function InfoPage({
  title,
  lede,
  notice,
  sections,
}: {
  title: string;
  lede: string;
  notice?: string;
  sections: InfoSection[];
}) {
  return (
    <>
      <PageHeader title={title} lede={lede} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {notice && (
          <p className="border-l-2 border-primary bg-secondary px-4 py-3 text-sm text-muted-foreground">
            {notice}
          </p>
        )}
        <div className="divide-y divide-border">
          {sections.map((section) => (
            <section key={section.title} className="py-6 first:pt-0 last:pb-0">
              <h2 className="text-xl">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}