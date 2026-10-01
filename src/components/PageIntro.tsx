type Props = {
  title: string;
  meta?: string;
  children?: React.ReactNode;
};

export default function PageIntro({ title, meta, children }: Props) {
  return (
    <div className="mb-12 max-w-xl">
      <h1 className="font-display text-5xl tracking-tight sm:text-6xl">{title}</h1>
      {meta && <p className="mt-2 font-mono text-xs text-ink/50">{meta}</p>}
      {children && <div className="mt-6 leading-relaxed">{children}</div>}
    </div>
  );
}
