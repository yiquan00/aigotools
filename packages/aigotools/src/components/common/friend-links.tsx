"use client";
import React, { useEffect, useState } from "react";

interface FriendLink {
  name: string;
  url: string;
  description?: string;
}

interface FriendLinksData {
  links: FriendLink[];
}

export default function FriendLinks() {
  const [links, setLinks] = useState<FriendLink[]>([]);

  useEffect(() => {
    async function fetchLinks() {
      try {
        const response = await fetch('/api/friend-links');
        if (!response.ok) return;
        const data: FriendLinksData = await response.json();
        setLinks(data.links);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    }

    fetchLinks();
    const interval = setInterval(fetchLinks, 1000 * 60); // 每分钟刷新一次
    return () => clearInterval(interval);
  }, []);

  if (links.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
      <div className="text-sm font-semibold mb-3">Friend Links</div>
      <div className="flex flex-wrap gap-4">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400 transition-colors"
            title={link.description}
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}
