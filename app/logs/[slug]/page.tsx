import { getLogData, getSortedLogsData } from "@/lib/markdown";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

export async function generateStaticParams() {
  const logs = getSortedLogsData();
  return logs.map((log) => ({
    slug: log.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const logData = await getLogData(slug);
  return {
    title: `${logData.title} | Logs | Mohd Arshad`,
    description: `Technical log: ${logData.title}`,
  };
}
export default async function LogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const logData = await getLogData(slug);

  return (
    <div className="min-h-screen font-sans selection:bg-[#00f3ff] selection:text-black pt-24 px-6 pb-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/logs" className="inline-flex items-center gap-2 text-[#00f3ff] hover:underline mb-12 font-mono bg-white/5 px-4 py-2 rounded backdrop-blur border border-white/10">
          <ArrowLeft size={16} /> ../BACK_TO_LOGS
        </Link>
        
        <article>
          <header className="mb-12 border-b border-white/10 pb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
              {logData.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-gray-400">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#00f3ff]" />
                <time>{logData.date}</time>
              </div>
              <div className="flex gap-2">
                {logData.tags.map(tag => (
                  <span key={tag} className="text-[#7000ff] bg-[#7000ff]/10 px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          <div 
            className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-headings:font-bold prose-a:text-[#00f3ff] hover:prose-a:text-white prose-code:text-[#00f3ff] prose-code:bg-[#05060a] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#05060a] prose-pre:border prose-pre:border-white/10 prose-img:rounded-xl prose-hr:border-white/10"
            dangerouslySetInnerHTML={{ __html: logData.contentHtml || '' }} 
          />
        </article>
      </div>
    </div>
  );
}
