import { Button } from "./Button";

export function ComingSoon({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <section className="container-vs flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="rule-rainbow mb-8 !h-1 !w-24" />
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-md text-ink-soft">{desc}</p>
      <div className="mt-8">
        <Button href="/">Voltar para a home</Button>
      </div>
    </section>
  );
}
