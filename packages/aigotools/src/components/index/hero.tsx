import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Istok_Web } from "next/font/google";
import { cn } from "@/lib/utils";
import AnimatedShinyText from "@/components/common/animated-shiny-text";
import { Sparkles, ArrowRight } from "lucide-react";

const istokWeb = Istok_Web({
  subsets: ["latin"],
  weight: "700",
});

export default function Hero() {
  const t = useTranslations("index");

  return (
    <div className="relative min-h-[40vh] sm:min-h-[45vh] flex flex-col items-center justify-center px-4 pt-8 sm:pt-0 gap-6">
      <div className="group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800">
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1.5 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <Sparkles className="mr-2 size-4 text-yellow-400" strokeWidth={2} />
          <span>
            {t("badges")}
          </span>
          <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
      <h1
        className={clsx(
          istokWeb.className,
          "relative text-4xl sm:text-5xl lg:text-6xl max-w-[1000px] !leading-[1.3] mx-auto font-bold text-center",
          "bg-clip-text text-transparent bg-gradient-to-r from-primary-800 via-primary-600 to-primary-400 dark:from-primary-400 dark:via-primary-300 dark:to-primary-200",
          "drop-shadow-sm",
        )}
      >
        {t("slogan")}
      </h1>
    </div>
  );
}
