type Props = {
  title: string;
  meta?: string;
  children?: React.ReactNode;
};

export default function PageIntro({ title, meta, children }: Props) {
  return (
    <div className="mb-12 max-w-xl">
      <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">{title}</h1>
      {meta && <p className="mt-2 text-sm opacity-50">{meta}</p>}
      {children && <div className="mt-6 leading-relaxed">{children}</div>}
    </div>
  );
}
