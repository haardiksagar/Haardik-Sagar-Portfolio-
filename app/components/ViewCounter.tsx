"use client";
import { useEffect, useState } from "react";

export default function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    // We only want to count a view once per session so we don't spam the API on reloads
    const countView = async () => {
      try {
        const hasVisited = sessionStorage.getItem("has_visited");
        
        // If they already visited this session, just GET the count. Otherwise, increment it.
        const url = hasVisited 
          ? "https://api.counterapi.dev/v1/haardik-portfolio/visits" 
          : "https://api.counterapi.dev/v1/haardik-portfolio/visits/up";
        
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.count) {
          setViews(data.count);
        }
        
        if (!hasVisited) {
          sessionStorage.setItem("has_visited", "true");
        }
      } catch (e) {
        console.error("Failed to fetch view count", e);
      }
    };
    
    countView();
  }, []);

  if (views === null) {
    return <span className="opacity-0">0 visits</span>; // Invisible placeholder to avoid layout shift
  }

  return (
    <span className="inline-flex items-center gap-2 animate-fadeUp">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      {views.toLocaleString()} visits
    </span>
  );
}
