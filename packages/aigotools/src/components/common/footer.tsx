import clsx from "clsx";
import React from "react";
import { useTranslations } from "next-intl";
import { Divider } from "@nextui-org/react";
import { Github } from "lucide-react";

import { AppConfig } from "@/lib/config";
import { Link } from "@/navigation";

import Container from "./container";
import Logo from "./logo";
import FriendLinks from "./friend-links";

export default function Footer({ className }: { className?: string }) {
  const t = useTranslations("footer");

  return (
    <Container className={clsx(className, "pb-12")}>
      <Divider className="mt-16 sm:mt-28 mb-6" />
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 flex flex-col">
          <Logo className="text-[28px] mb-4" />
          <div className="font-normal text-primary text-tiny sm:text-sm mb-2">
            {t("slogan")}.
          </div>

          <div className="font-normal flex items-center gap-2 text-primary text-tiny sm:text-sm">
            @2024 {AppConfig.siteName}.All rights reserved.
          </div>
          <div className="font-normal flex items-center gap-2 text-primary text-tiny sm:text-sm mt-1">
            Based on <Link className="hover:text-primary-400" href="https://github.com/someu/aigotools" target="_blank">AigoTools</Link>. Licensed under the <Link className="hover:text-primary-400" href="https://github.com/someu/aigotools/blob/main/LICENSE" target="_blank">Apache License 2.0</Link>
          </div>

        </div>
        <div className="flex-1 flex justify-start sm:justify-end mt-6 sm:mt-0 font-semibold text-primary text-sm sm:text-base">
          <div className="flex-grow-0 flex-shrink-0 basis-40 flex flex-col gap-2 text-left sm:text-right">
            <Link href={"/#featured"}>{t("featured")}</Link>
            <Link href={"/#latest"}>{t("latestSubmit")}</Link>
            <Link href={"/submit"}>{t("submitATool")}</Link>
          </div>
        </div>
      </div>
      <FriendLinks />
    </Container>
  );
}
