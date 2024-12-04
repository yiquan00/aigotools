import clsx from "clsx";
import React from "react";
import { Istok_Web } from "next/font/google";
import { Sparkles } from "lucide-react";

import { AppConfig } from "@/lib/config";
import { Link } from "@/navigation";

const istokWeb = Istok_Web({
  subsets: ["latin"],
  weight: "700",
});

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href={"/"}>
      <div
        className={clsx(
          "text-primary-800 font-bold text-2xl sm:text-4xl leading-none flex items-center gap-2",
          className,
          istokWeb.className,
        )}
      >
        <Sparkles className="size-6 sm:size-8 text-yellow-400" strokeWidth={2} />
        {AppConfig.siteName}
      </div>
    </Link>
  );
}
