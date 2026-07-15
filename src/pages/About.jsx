import { Sparkles, ShieldCheck, Leaf, Users } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Curated, not endless",
    text: "Every category is trimmed to what's actually worth your time — no infinite scroll of near-duplicates.",
  },
  {
    icon: ShieldCheck,
    title: "Straight answers",
    text: "Real ratings, real stock counts, real prices. No dark patterns, no fake urgency banners.",
  },
  {
    icon: Leaf,
    title: "Built to last",
    text: "We'd rather you buy one thing you keep than five things you return.",
  },
  {
    icon: Users,
    title: "For the community",
    text: "Wishlists and reviews exist so you can shop with other people's honesty, not just algorithms.",
  },
];

const stats = [
  { value: "100+", label: "Products catalogued" },
  { value: "20+", label: "Categories" },
  { value: "4.6", label: "Average rating" },
  { value: "24/7", label: "Browsing, no pressure" },
];

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <section className="text-center mb-16">
        <span className="font-mono-data text-xs uppercase tracking-[0.2em] text-coral">
          Our Story
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold mt-3 text-ink dark:text-paper leading-tight">
          A catalog built around
          <br />
          <span className="italic text-coral">actually finding things.</span>
        </h1>
        <p className="text-slate mt-5 max-w-xl mx-auto leading-relaxed">
          ShopSphere started as a simple idea: most shopping sites bury good
          products under noise. We built a catalog that's fast, honest about
          what's in stock, and organized the way a person actually
          browses — by category, by price, by what's rated well.
        </p>
      </section>

      <section className="grid sm:grid-cols-2 gap-6 mb-16">
        {values.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="border border-ink/10 dark:border-paper/10 rounded-2xl p-6 bg-white dark:bg-ink-soft"
          >
            <span className="orbit-ring inline-flex w-10 h-10 items-center justify-center text-coral mb-4">
              <Icon size={18} />
            </span>
            <h3 className="font-display text-lg font-semibold text-ink dark:text-paper mb-1.5">
              {title}
            </h3>
            <p className="text-slate text-sm leading-relaxed">{text}</p>
          </div>
        ))}
      </section>

      <section className="border-t border-ink/10 dark:border-paper/10 pt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-3xl font-semibold text-coral">{stat.value}</p>
            <p className="text-slate text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
