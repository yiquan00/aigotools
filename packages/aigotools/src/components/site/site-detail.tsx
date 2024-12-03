import dayjs from "dayjs";
import { Button, Divider } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { ExternalLink, Navigation } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

import VoteButton from "./vote-button";
import ListItem from "./list-item";
import SiteTags from "./site-tags";

import { Site } from "@/models/site";

export default function SiteDetail({ site }: { site: Site }) {
  const t = useTranslations("site");

  return (
    <div className="py-9 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* 顶部区域：左侧内容 + 右侧图片 */}
      <div className="flex flex-wrap lg:flex-nowrap gap-8">
        {/* 左侧内容区域 */}
        <div className="flex-1 basis-full lg:basis-[30%]">
          <Link
            className="inline-flex items-center gap-2 hover:opacity-80"
            href={site.url}
            target="_blank"
          >
            <h1 className="text-3xl font-bold text-primary-800">{site.name}</h1>
            <ExternalLink size={22} strokeWidth={3} className="text-primary-800" />
          </Link>
          
          <div className="mt-4 text-primary-600">{site.desceription}</div>
          
          <div className="mt-4 text-sm text-primary-500">
            {dayjs(site.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        </div>

        {/* 右侧图片区域 */}
        <div className="flex-1 basis-full lg:basis-[70%]">
          <div className="relative shadow-black/5 shadow-none rounded-xl w-full overflow-hidden">
            <img
              alt={site.name}
              className="w-full aspect-video object-cover transform hover:scale-105 transition-transform duration-300 rounded-xl"
              src={site.snapshot}
            />
          </div>
        </div>
      </div>

      {/* 下方内容区域 */}
      <div className="mt-12">
        {/* 操作按钮组 */}
        <div className="flex gap-6 items-center mb-8">
          <Link href={site.url} target="_blank">
            <Button
              className="w-56 font-semibold"
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

        <div className="space-y-6">
          {/* Users of this tool */}
          <div className="p-6 border-b border-primary-200">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
              <h2 className="text-xl font-bold text-primary-800">Users of this tool</h2>
              <div className="lg:col-span-3 flex flex-wrap gap-2">
                {site.users?.map((user, index) => (
                  <span
                    key={index}
                    className="text-[12px] font-light py-[2px] px-2 rounded-[3px] bg-primary-700 text-primary-200"
                  >
                    {user}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Usecases */}
          <div className="p-6 border-b border-primary-200">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
              <h2 className="text-xl font-bold text-primary-800">Usecases</h2>
              <div className="lg:col-span-3">
                <ol className="space-y-2">
                  {site.usecases.map((item, i) => (
                    <ListItem key={i}>{item}</ListItem>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-6 border-b border-primary-200">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
              <h2 className="text-xl font-bold text-primary-800">Pricing</h2>
              <div className="lg:col-span-3 flex flex-wrap gap-2">
                {site.pricing?.map((price, index) => (
                  <span
                    key={index}
                    className="text-[12px] font-light py-[2px] px-2 rounded-[3px] bg-primary-700 text-primary-200"
                  >
                    {price}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="p-6 border-b border-primary-200">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
              <h2 className="text-xl font-bold text-primary-800">Links</h2>
              <div className="lg:col-span-3">
                <ol className="space-y-2">
                  {site.links?.login && (
                    <ListItem>
                      <Link className="hover:underline" href={site.links.login} target="_blank">
                        Login: {site.links.login}
                      </Link>
                    </ListItem>
                  )}
                  {site.links?.register && (
                    <ListItem>
                      <Link className="hover:underline" href={site.links.register} target="_blank">
                        Register: {site.links.register}
                      </Link>
                    </ListItem>
                  )}
                  {site.links?.documentation && (
                    <ListItem>
                      <Link className="hover:underline" href={site.links.documentation} target="_blank">
                        Documentation: {site.links.documentation}
                      </Link>
                    </ListItem>
                  )}
                  {site.links?.pricing && (
                    <ListItem>
                      <Link className="hover:underline" href={site.links.pricing} target="_blank">
                        Pricing: {site.links.pricing}
                      </Link>
                    </ListItem>
                  )}
                </ol>
              </div>
            </div>
          </div>

          {/* Related Searches */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
              <h2 className="text-xl font-bold text-primary-800">Related Searches</h2>
              <div className="lg:col-span-3 flex flex-wrap gap-2">
                {site.related?.map((item, index) => (
                  <Link
                    key={index}
                    href={`/search?q=${encodeURIComponent(item)}`}
                    className="text-[12px] font-light py-[2px] px-2 rounded-[3px] bg-primary-700 text-primary-200 hover:bg-primary-600"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
