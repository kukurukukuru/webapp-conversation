import React from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftEllipsisIcon as ChatBubbleOvalLeftEllipsisSolidIcon } from "@heroicons/react/24/solid";
import Button from "@/app/components/base/button";
// import Card from './card'
import type { ConversationItem } from "@/types/app";
import Image from "next/image";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const MAX_CONVERSATION_LENTH = 20;

export type ISidebarProps = {
  copyRight: string;
  currentId: string;
  onCurrentIdChange: (id: string) => void;
  list: ConversationItem[];
  isMobile: boolean;
};

const Sidebar: FC<ISidebarProps> = ({
  copyRight,
  currentId,
  onCurrentIdChange,
  list,
  isMobile,
}) => {
  const { t } = useTranslation();
  const { connected } = useWallet();

  return (
    <div className="shrink-0 flex flex-col overflow-y-auto bg-white pc:w-[244px] tablet:w-[192px] mobile:w-[240px]  border-r border-gray-200 tablet:h-full mobile:h-screen">
      <div className="flex items-center justify-start gap-3 p-4 pb-2">
        <Image src={"/images/kontos.svg"} width={32} height={32} alt="" />
        <span className="py-1 text-base font-semibold text-gray-800">
          Kontos
        </span>
      </div>

      {isMobile && (
        <div className="flex flex-col items-center gap-2 p-2">
          <div>
            <WalletMultiButton
              style={{
                backgroundColor: "var(--Kontos-Blue, #413dec)",
                borderRadius: "8px",
              }}
            />
          </div>
          {connected && (
            <div>
              <WalletDisconnectButton
                style={{
                  backgroundColor: "var(--Deep-800, #1a2535)",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}
        </div>
      )}

      {list.length < MAX_CONVERSATION_LENTH && (
        <div className="flex flex-shrink-0 p-4 !pb-0">
          <Button
            onClick={() => {
              onCurrentIdChange("-1");
            }}
            className="group block w-full flex-shrink-0 !justify-start !h-9 text-primary-600 items-center text-sm"
          >
            <PencilSquareIcon className="mr-2 h-4 w-4" />{" "}
            {t("app.chat.newChat")}
          </Button>
        </div>
      )}

      <nav className="mt-4 flex-1 space-y-1 bg-white p-4 !pt-0">
        {list.map((item) => {
          const isCurrent = item.id === currentId;
          const ItemIcon = isCurrent
            ? ChatBubbleOvalLeftEllipsisSolidIcon
            : ChatBubbleOvalLeftEllipsisIcon;
          return (
            <div
              onClick={() => onCurrentIdChange(item.id)}
              key={item.id}
              className={classNames(
                isCurrent
                  ? "bg-primary-50 text-primary-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-700",
                "group flex items-center rounded-md px-2 py-2 text-sm font-medium cursor-pointer"
              )}
            >
              <ItemIcon
                className={classNames(
                  isCurrent
                    ? "text-primary-600"
                    : "text-gray-400 group-hover:text-gray-500",
                  "mr-3 h-5 w-5 flex-shrink-0"
                )}
                aria-hidden="true"
              />
              {item.name}
            </div>
          );
        })}
      </nav>
      {/* <a className="flex flex-shrink-0 p-4" href="https://langgenius.ai/" target="_blank">
        <Card><div className="flex flex-row items-center"><ChatBubbleOvalLeftEllipsisSolidIcon className="text-primary-600 h-6 w-6 mr-2" /><span>LangGenius</span></div></Card>
      </a> */}
      <div className="flex flex-shrink-0 pr-4 pb-4 pl-4">
        <div className="text-gray-400 font-normal text-xs">
          © {copyRight} {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
