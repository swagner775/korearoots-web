import Link from "next/link";
import Image from "next/image";
import { posts, formatDate } from "@/lib/blog";
import { BlogCategory } from "@/types/blog";

export const metadata = {
  title: "Blog — KoreaRoots",
  description: "Guides, explainers, and investment insights for Western buyers navigating Korean rural property, the D-8 visa, and STR management.",
};

const categoryColors: Record<BlogCategory, string> = {
  "Visa & Legal":    "text-teal border-teal/30 bg-teal/10",
  "Property":        "text-gold border-gold/30 bg-gold/10",
  "Investment":      "text-gold border-gold/30 bg-gold/10",
  "STR & Management":"text-teal border-teal/30 bg-teal/10",
  "Renovation":      "text-white/60 border-white/20 bg-white/5",
  "Residency":       "text-teal border-teal/30 bg-teal/10",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <main className="flex-1 bg-navy min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-14 pt-8">

        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 w-fit">
            <span className="text-teal text-xs font-semibold uppercase tracking-widest">The KoreaRoots Blog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Guides & insights
          </h1>
          <p className="text-white/50 max-w-xl leading-relaxed text-sm">
            Plain-English guides on{" "}
            <span className="text-white/70 font-medium">빈집 (bin-jip) — literally &ldquo;empty house,&rdquo; Korea&apos;s officially registered abandoned rural properties</span>{" "}
            — Korean property investment, the D-8 visa, short-term rental management, and everything in between.
          </p>
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid lg:grid-cols-2 gap-0 rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-teal/30 transition-all"
        >
          <div className="relative aspect-[16/9] bg-white/5">
            {featured.coverImage && (
              <Image src={featured.coverImage} alt={featured.title} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 50vw" />
            )}
            <div className="absolute top-4 left-4">
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${categoryColors[featured.category]}`}>
                {featured.category}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4 p-8">
            <span className="text-xs text-white/30">{formatDate(featured.date)} · {featured.readTime} min read</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-gold transition-colors">
              {featured.title}
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">{featured.excerpt}</p>
            <span className="text-teal text-sm font-semibold">Read article →</span>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-teal/30 hover:bg-white/[0.07] transition-all"
            >
              <div className="relative aspect-[16/9] bg-white/5">
                {post.coverImage && (
                  <Image src={post.coverImage} alt={post.title} fill className="object-contain" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                )}
                <div className="absolute top-3 left-3">
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 p-5 flex-1">
                <span className="text-xs text-white/30">{formatDate(post.date)} · {post.readTime} min read</span>
                <h2 className="text-sm font-semibold text-white leading-snug group-hover:text-gold transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-xs text-white/40 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                <span className="text-teal text-xs font-semibold mt-auto">Read article →</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
