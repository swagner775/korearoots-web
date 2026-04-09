import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { posts, getPost, formatDate } from "@/lib/blog";
import { BlogCategory } from "@/types/blog";

const categoryColors: Record<BlogCategory, string> = {
  "Visa & Legal":     "text-teal border-teal/30 bg-teal/10",
  "Property":         "text-gold border-gold/30 bg-gold/10",
  "Investment":       "text-gold border-gold/30 bg-gold/10",
  "STR & Management": "text-teal border-teal/30 bg-teal/10",
  "Renovation":       "text-white/60 border-white/20 bg-white/5",
  "Residency":        "text-teal border-teal/30 bg-teal/10",
};

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} — KoreaRoots`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);

  return (
    <main className="flex-1 bg-navy min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 pt-8 flex flex-col gap-10">

        {/* Back */}
        <Link href="/blog" className="text-white/30 hover:text-white text-sm transition-colors w-fit">
          ← Back to Blog
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${categoryColors[post.category]}`}>
              {post.category}
            </span>
            <span className="text-white/30 text-xs">{formatDate(post.date)} · {post.readTime} min read</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight tracking-tight">
            {post.title}
          </h1>
          <p className="text-white/50 leading-relaxed">{post.excerpt}</p>
        </div>

        {/* Cover image */}
        <div className="relative aspect-[16/9] rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          {post.coverImage && (
            <Image src={post.coverImage} alt={post.title} fill className="object-contain" sizes="(max-width: 768px) 100vw, 768px" priority />
          )}
        </div>

        {/* Content */}
        <article className="flex flex-col gap-6">
          {post.sections.map((section, i) => {
            if (section.type === "heading") {
              return (
                <h2 key={i} className="text-lg sm:text-xl font-bold text-white mt-4">
                  {section.content}
                </h2>
              );
            }
            if (section.type === "callout") {
              return (
                <div key={i} className="rounded-2xl border border-teal/20 bg-teal/5 px-6 py-5">
                  <p className="text-teal text-sm leading-relaxed font-medium">{section.content}</p>
                </div>
              );
            }
            if (section.type === "list") {
              return (
                <div key={i} className="flex flex-col gap-3">
                  {section.content && (
                    <p className="text-white/60 text-sm leading-relaxed">{section.content}</p>
                  )}
                  <ul className="flex flex-col gap-2 pl-1">
                    {section.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-white/60">
                        <svg className="w-4 h-4 text-teal shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
            return (
              <p key={i} className="text-white/60 leading-relaxed text-sm">
                {section.content}
              </p>
            );
          })}
        </article>

        {/* CTA */}
        <div className="rounded-2xl border border-teal/20 bg-teal/5 p-7 flex flex-col gap-4">
          <h3 className="text-white font-bold text-lg">Ready to take the first step?</h3>
          <p className="text-white/50 text-sm leading-relaxed">
            Book a free 30-minute consultation. We&apos;ll walk through your situation and recommend the right path — no pressure, no commitment.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/consultation"
              className="rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white hover:bg-teal/80 transition-colors shadow-lg shadow-teal/20"
            >
              Book a Free Consultation
            </Link>
            <Link
              href="/properties"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="flex flex-col gap-5">
            <h3 className="text-white font-bold">Related articles</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-teal/30 transition-all"
                >
                  <span className="text-xs text-white/30">{formatDate(p.date)} · {p.readTime} min read</span>
                  <p className="text-sm font-semibold text-white group-hover:text-gold transition-colors line-clamp-2">
                    {p.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
