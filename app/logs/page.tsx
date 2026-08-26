import Link from "next/link";
import { getSortedLogsData } from "@/lib/markdown";
import { ArrowLeft, Terminal } from "lucide-react";

export default function LogsIndex() {
  const allLogsData = getSortedLogsData();

  return (
    <div className="min-h-screen font-sans selection:bg-[#00f3ff] selection:text-black pt-24 px-6 pb-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#00f3ff] hover:underline mb-12 font-mono bg-white/5 px-4 py-2 rounded backdrop-blur border border-white/10">
          <ArrowLeft size={16} /> ../RETURN_ROOT
        </Link>
        
        <div className="mb-16 border-b border-white/10 pb-8">
          <div className="flex items-center gap-3 text-[#00f3ff] font-mono mb-4">
            <Terminal size={24} />
            <h1 className="text-4xl font-black uppercase tracking-widest text-white">SYS_LOGS</h1>
          </div>
          <p className="text-gray-400 font-mono text-sm">ARCHIVES // ENGINEERING // DEEP_DIVES</p>
        </div>

        <div className="space-y-8">
          {allLogsData.map(({ slug, date, title, description, tags }) => (
            <Link href={`/logs/${slug}`} key={slug} className="block group">
              <article className="p-6 md:p-8 bg-black/40 border border-white/5 rounded-xl hover:border-[#00f3ff]/50 transition-colors relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#00f3ff] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />
                
                <div className="text-[10px] text-gray-500 font-mono tracking-[0.2em] mb-4">{date}</div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00f3ff] transition-colors">{title}</h2>
                <p className="text-gray-400 leading-relaxed text-sm mb-6">{description}</p>
                
                <div className="flex gap-3 flex-wrap">
                  {tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/10 text-gray-400 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
