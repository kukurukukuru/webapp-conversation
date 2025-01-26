import type { AppInfo } from "@/types/app";
export const APP_ID = `${process.env.NEXT_PUBLIC_APP_ID}`;
export const API_KEY = `${process.env.APP_KEY}`;
export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
export const APP_INFO: AppInfo = {
  title: "Kontos Agent",
  description: "",
  copyright: "",
  privacy_policy: "",
  default_language: "zh-Hans",
};

export const isShowPrompt = false;
export const promptTemplate = "I want you to act as a javascript console.";

export const API_PREFIX = "/api";

export const LOCALE_COOKIE_NAME = "locale";

export const DEFAULT_VALUE_MAX_LEN = 48;

export const WALLET_CONNECT_PROJECT_ID = process.env
  .NEXT_PUBLIC_WC_PROJECT_ID as string;
export const WALLET_CONNECT_METADATA = {
  name: "Kontos Agent",
  description: "Kontos Agent",
  url: "https://agent.kontos.io",
  icons: [
    "https://imagedelivery.net/_aTEfDRm7z3tKgu9JhfeKA/756f6bc9-0958-42dc-1b0d-fc7dc010bc00/lg",
  ],
};

export const BASIC_MODAL_INDEX = 50;

export const DEFAULT_DISPLAY_PRECESION = 6;
