import { css } from "styled-components";
import { fontBold, fontRegular } from "./style.font";

const MOBILE_BASE_HEIGHT = 667;
const MOBILE_BASE_WIDTH = 375;

export const mFontH1 = css`
  ${fontBold}
  font-size: min(${36 / MOBILE_BASE_HEIGHT} * 100vh, ${36 /
  MOBILE_BASE_WIDTH} * 100vw);
`;

export const mFontH2 = css`
  ${fontBold}
  font-size: min(${36 / MOBILE_BASE_HEIGHT} * 100vh, ${36 /
  MOBILE_BASE_WIDTH} * 100vw);
  line-height: min(
    1 * ${34 / MOBILE_BASE_HEIGHT} * 100vh,
    1 * ${34 / MOBILE_BASE_WIDTH} * 100vw
  );
`;

export const mFontH3 = css`
  ${fontBold}
  font-size: min(${24 / MOBILE_BASE_HEIGHT} * 100vh, ${24 /
  MOBILE_BASE_WIDTH} * 100vw);
`;

export const mFontH4 = css`
  ${fontBold}
  font-size: min(${20 / MOBILE_BASE_HEIGHT} * 100vh, ${20 /
  MOBILE_BASE_WIDTH} * 100vw);
  line-height: min(
    1 * ${24 / MOBILE_BASE_HEIGHT} * 100vh,
    1 * ${24 / MOBILE_BASE_WIDTH} * 100vw
  );
`;

export const mFontH5 = css`
  ${fontBold}
  font-size: min(${18 / MOBILE_BASE_HEIGHT} * 100vh, ${18 /
  MOBILE_BASE_WIDTH} * 100vw);
  line-height: min(
    1 * ${22 / MOBILE_BASE_HEIGHT} * 100vh,
    1 * ${22 / MOBILE_BASE_WIDTH} * 100vw
  );
`;

export const mFontH6 = css`
  ${fontBold}
  font-size: min(${16 / MOBILE_BASE_HEIGHT} * 100vh, ${16 /
  MOBILE_BASE_WIDTH} * 100vw);
  line-height: min(
    1 * ${20 / MOBILE_BASE_HEIGHT} * 100vh,
    1 * ${20 / MOBILE_BASE_WIDTH} * 100vw
  );
`;

export const mFontH7 = css`
  ${fontBold}
  font-size: min(${14 / MOBILE_BASE_HEIGHT} * 100vh, ${14 /
  MOBILE_BASE_WIDTH} * 100vw);
`;

export const mFontH8 = css`
  ${fontBold}
  font-size: min(${12 / MOBILE_BASE_HEIGHT} * 100vh, ${12 /
  MOBILE_BASE_WIDTH} * 100vw);
`;

export const mFontSubtitle = css`
  ${fontRegular}
  font-size: min(${18 / MOBILE_BASE_HEIGHT} * 100vh, ${18 /
  MOBILE_BASE_WIDTH} * 100vw);
  line-height: min(
    1 * ${22 / MOBILE_BASE_HEIGHT} * 100vh,
    1 * ${22 / MOBILE_BASE_WIDTH} * 100vw
  );
`;

export const mFontMainText = css`
  ${fontRegular}
  font-size: min(${16 / MOBILE_BASE_HEIGHT} * 100vh, ${16 /
  MOBILE_BASE_WIDTH} * 100vw);
  line-height: min(
    130% / ${MOBILE_BASE_HEIGHT} * 100vh,
    130% / ${MOBILE_BASE_WIDTH} * 100vw
  );
`;

export const mFontDescription = css`
  ${fontRegular}
  font-size: min(${14 / MOBILE_BASE_HEIGHT} * 100vh, ${14 /
  MOBILE_BASE_WIDTH} * 100vw);
`;

export const mFontSmaller = css`
  ${fontRegular}
  font-size: min(${12 / MOBILE_BASE_HEIGHT} * 100vh, ${12 /
  MOBILE_BASE_WIDTH} * 100vw);
`;
