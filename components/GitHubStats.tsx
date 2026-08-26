"use client";
import { useState, useEffect } from "react";
import { Github, Star, GitFork, Users, Activity } from "lucide-react";
import { motion } from "framer-motion";

interface GitHubData {
  public_repos: number;
  followers: number;
  following: number;
  login: string;
}

export default function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [stars, setStars] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://api.github.com/users/MohdArshad-cell");
        if (!res.ok) throw new Error("Failed to fetch GitHub data");
        const userData = await res.json();
        setData(userData);

        // Fetch repos to calculate total stars
        const reposRes = await fetch("https://api.github.com/users/MohdArshad-cell/repos?per_page=100");
        if (reposRes.ok) {
          const repos = await reposRes.json();
          const totalStars = repos.reduce((acc: number, curr: { stargazers_count: number }) => acc + curr.stargazers_count, 0);
          setStars(totalStars);
        }
      } catch (err) {
        console.error("GitHub API error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading || !data) {
    return (
      <div className="w-full h-32 flex items-center justify-center border border-white/5 bg-black/40 mb-12">
        <div className="flex items-center gap-3 text-[10px] text-gray-500 font-mono uppercase tracking-[0.3em]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f3ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f3ff]"></span>
          </span>
          FETCHING_GITHUB_TELEMETRY...
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 border-b border-white/5 pb-12"
    >
      <div className="flex flex-col gap-2 p-5 border border-white/10 bg-white/5 relative overflow-hidden group hover:border-[#00f3ff]/50 transition-colors">
        <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-20 transition-opacity">
          <Github size={48} />
        </div>
        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center gap-2">
          <Activity size={12} className="text-[#00f3ff]" />
          Repositories
        </span>
        <span className="text-3xl font-black text-white font-mono tracking-tighter">{data.public_repos}</span>
      </div>

      <div className="flex flex-col gap-2 p-5 border border-white/10 bg-white/5 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
        <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-20 transition-opacity">
          <Star size={48} />
        </div>
        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center gap-2">
          <Star size={12} className="text-emerald-400" />
          Total Stars
        </span>
        <span className="text-3xl font-black text-white font-mono tracking-tighter">{stars}</span>
      </div>

      <div className="flex flex-col gap-2 p-5 border border-white/10 bg-white/5 relative overflow-hidden group hover:border-[#7000ff]/50 transition-colors">
        <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-20 transition-opacity">
          <Users size={48} />
        </div>
        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center gap-2">
          <Users size={12} className="text-[#7000ff]" />
          Followers
        </span>
        <span className="text-3xl font-black text-white font-mono tracking-tighter">{data.followers}</span>
      </div>

      <div className="flex flex-col gap-2 p-5 border border-white/10 bg-white/5 relative overflow-hidden group hover:border-pink-500/50 transition-colors">
        <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-20 transition-opacity">
          <GitFork size={48} />
        </div>
        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center gap-2">
          <GitFork size={12} className="text-pink-400" />
          Network_Status
        </span>
        <span className="text-3xl font-black text-white font-mono tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
          ACTIVE
        </span>
      </div>
    </motion.div>
  );
}
