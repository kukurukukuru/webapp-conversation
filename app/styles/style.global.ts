import { css } from "styled-components";
import {
  mFontDescription,
  mFontH1,
  mFontH2,
  mFontH3,
  mFontH4,
  mFontH5,
  mFontH6,
  mFontH7,
  mFontH8,
  mFontMainText,
  mFontSmaller,
  mFontSubtitle,
} from "./style.global.mobile";
import {
  dFontDescription,
  dFontH1,
  dFontH2,
  dFontH3,
  dFontH4,
  dFontH5,
  dFontH6,
  dFontH7,
  dFontH8,
  dFontMainText,
  dFontSmaller,
  dFontSubtitle,
} from "./style.global.desktop";

export const fontH1 = css<{ $isMobile?: boolean }>`
  ${(props) => (props.$isMobile ? mFontH1 : dFontH1)}
`;
export const fontH2 = css<{ $isMobile?: boolean }>`
  ${(props) => (props.$isMobile ? mFontH2 : dFontH2)}
`;
export const fontH3 = css<{ $isMobile?: boolean }>`
  ${(props) => (props.$isMobile ? mFontH3 : dFontH3)}
`;
export const fontH4 = css<{ $isMobile?: boolean }>`
  ${(props) => (props.$isMobile ? mFontH4 : dFontH4)}
`;
export const fontH5 = css<{ $isMobile?: boolean }>`
  ${(props) => (props.$isMobile ? mFontH5 : dFontH5)}
`;
export const fontH6 = css<{ $isMobile?: boolean }>`
  ${(props) => (props.$isMobile ? mFontH6 : dFontH6)}
`;
export const fontH7 = css<{ $isMobile?: boolean }>`
  ${(props) => (props.$isMobile ? mFontH7 : dFontH7)}
`;
export const fontH8 = css<{ $isMobile?: boolean }>`
  ${(props) => (props.$isMobile ? mFontH8 : dFontH8)}
`;
export const fontSubtitle = css<{ $isMobile?: boolean }>`
  ${(props) => (props.$isMobile ? mFontSubtitle : dFontSubtitle)}
`;
export const fontMainText = css<{ $isMobile?: boolean }>`
  ${(props) => (props.$isMobile ? mFontMainText : dFontMainText)}
`;
export const fontDescription = css<{ $isMobile?: boolean }>`
  ${(props) => (props.$isMobile ? mFontDescription : dFontDescription)}
`;
export const fontSmaller = css<{ $isMobile?: boolean }>`
  ${(props) => (props.$isMobile ? mFontSmaller : dFontSmaller)}
`;

export const colors = {
  kontos: "var(--Kontos-Blue)",
  white: "var(--White)",
  deep25: "var(--Deep-25)",
  deep50: "var(--Deep-50)",
  deep100: "var(--Deep-100)",
  deep200: "var(--Deep-200)",
  deep400: "var(--Deep-400)",
  deep800: "var(--Deep-800)",
  success: "var(--Success)",
  error: "var(--Error)",
  warning: "var(--Warning)",
};
