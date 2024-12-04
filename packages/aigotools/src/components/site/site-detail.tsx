import dayjs from "dayjs";
import { Button, Divider } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { ExternalLink, Navigation } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

import VoteButton from "./vote-button";
import SiteTags from "./site-tags";

import { Site } from "@/models/site";

export default function SiteDetail({ site }: { site: Site }) {
  const t = useTranslations("site");

  return (
    <div className="py-9 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* 顶部区域：左侧内容 + 右侧图片 */}
      <div className="flex flex-wrap lg:flex-nowrap gap-8 mb-16">
        {/* 左侧内容区域 */}
        <div className="flex-1 basis-full lg:basis-2/5">
          <Link
            className="group inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
            href={site.url}
            target="_blank"
          >
            <h1 className="text-3xl font-bold text-primary-800 group-hover:text-primary-700 transition-colors">
              {site.name}
            </h1>
            <ExternalLink size={22} strokeWidth={3} className="text-primary-800 group-hover:text-primary-700 transition-colors" />
          </Link>
          
          <div className="mt-6 text-lg text-primary-600 leading-relaxed">
            {site.desceription}
          </div>
          
          <div className="mt-4 text-sm text-primary-500">
            {dayjs(site.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        </div>

        {/* 右侧图片区域 */}
        <div className="flex-1 basis-full lg:basis-3/5">
          <div className="relative shadow-lg shadow-black/5 rounded-xl w-full max-w-2xl mx-auto overflow-hidden bg-primary-100/50">
            <img
              alt={site.name}
              className="w-full aspect-[16/10] object-cover transform hover:scale-105 transition-all duration-300 rounded-xl"
              src={site.snapshot}
            />
          </div>
        </div>
      </div>

      {/* 下方内容区域 */}
      <div className="space-y-8">
        {/* 操作按钮组 */}
        <div className="flex gap-6 items-center mb-12">
          <Link href={site.url} target="_blank">
            <Button
              className="w-56 font-semibold shadow-sm hover:shadow-md transition-shadow"
              color="primary"
              radius="sm"
              variant="bordered"
              endContent={<Navigation size={14} strokeWidth={3} />}
            >
              {t("visitSite")}
            </Button>
          </Link>
          <VoteButton site={site} />
        </div>

        {/* Users of this tool */}
        <div className="p-8 border border-primary-200 rounded-xl bg-primary-50/30">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-4">
            <h2 className="text-xl font-bold text-primary-800">Users of this tool</h2>
            <div className="lg:col-span-3 flex flex-wrap gap-2">
              {site.users?.map((user, index) => (
                <span
                  key={index}
                  className="text-sm font-medium py-1 px-3 rounded-full bg-primary-700 text-primary-100 hover:bg-primary-600 transition-colors"
                >
                  {user}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Usecases */}
        <div className="p-8 border border-primary-200 rounded-xl bg-primary-50/30">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-4">
            <h2 className="text-xl font-bold text-primary-800">Usecases</h2>
            <div className="lg:col-span-3">
              <ol className="space-y-3">
                {site.usecases.map((item, i) => (
                  <li key={i} className="text-primary-700 list-disc ml-4">
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="p-8 border border-primary-200 rounded-xl bg-primary-50/30">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-4">
            <h2 className="text-xl font-bold text-primary-800">Pricing</h2>
            <div className="lg:col-span-3 flex flex-wrap gap-2">
              {site.pricings?.map((price, index) => (
                <span
                  key={index}
                  className="text-sm font-medium py-1 px-3 rounded-full bg-primary-700 text-primary-100 hover:bg-primary-600 transition-colors"
                >
                  {price}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="p-8 border border-primary-200 rounded-xl bg-primary-50/30">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-4">
            <h2 className="text-xl font-bold text-primary-800">Links</h2>
            <div className="lg:col-span-3">
              <ol className="space-y-3">
                {site.links?.login && (
                  <li className="list-disc ml-4">
                    <Link 
                      className="text-primary-700 hover:text-primary-600 hover:underline transition-colors" 
                      href={site.links.login} 
                      target="_blank"
                    >
                      Login: {site.links.login}
                    </Link>
                  </li>
                )}
                {site.links?.register && (
                  <li className="list-disc ml-4">
                    <Link 
                      className="text-primary-700 hover:text-primary-600 hover:underline transition-colors" 
                      href={site.links.register} 
                      target="_blank"
                    >
                      Register: {site.links.register}
                    </Link>
                  </li>
                )}
                {site.links?.documentation && (
                  <li className="list-disc ml-4">
                    <Link 
                      className="text-primary-700 hover:text-primary-600 hover:underline transition-colors" 
                      href={site.links.documentation} 
                      target="_blank"
                    >
                      Documentation: {site.links.documentation}
                    </Link>
                  </li>
                )}
                {site.links?.pricing && (
                  <li className="list-disc ml-4">
                    <Link 
                      className="text-primary-700 hover:text-primary-600 hover:underline transition-colors" 
                      href={site.links.pricing} 
                      target="_blank"
                    >
                      Pricing: {site.links.pricing}
                    </Link>
                  </li>
                )}
              </ol>
            </div>
          </div>
        </div>

        {/* Related Searches */}
        <div className="p-8 border border-primary-200 rounded-xl bg-primary-50/30">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-4">
            <h2 className="text-xl font-bold text-primary-800">Related Searches</h2>
            <div className="lg:col-span-3 flex flex-wrap gap-2">
              {site.relatedSearchs?.map((item, index) => (
                <Link
                  key={index}
                  href={`/search?q=${encodeURIComponent(item)}`}
                  className="text-sm font-medium py-1 px-3 rounded-full bg-primary-700 text-primary-100 hover:bg-primary-600 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
