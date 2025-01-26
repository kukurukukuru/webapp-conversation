import styled, { css } from "styled-components";

const defaultStyles = {
  radius: "8px",
  hoverOpacity: 1,
  activeOpacity: 1,
};

const afterStyle = css`
  z-index: 0;
  position: absolute;
  content: "";
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const buttonHover = css<{
  disabled?: boolean;
  $loading?: boolean;
  $color?: string;
  $bgColor?: string;
  $hoverColor?: string;
  $hoverBgColor?: string;
  $hoverOpacity?: number;
  $radius?: string | number;
}>`
  @media (hover: hover) {
    position: relative;
    &:hover::after {
      ${afterStyle}

      // Set background & opacity changes only if the button is not loading or disabled
      ${(props) =>
    !props.disabled &&
    !props.$loading &&
    css`
          color: ${props.$hoverColor || props.$color};
          background: ${props.$hoverBgColor || props.$bgColor || "transparent"};
          opacity: ${props.$hoverOpacity || defaultStyles.hoverOpacity};
        `}

      ${({ $radius }) =>
    typeof $radius !== "undefined"
      ? css`
              border-radius: ${typeof $radius === "number"
          ? `${$radius}px`
          : $radius};
            `
      : css`
              border-radius: ${defaultStyles.radius};
            `};
    }
  }
`;

const buttonClick = css<{
  disabled?: boolean;
  $loading?: boolean;
  $color?: string;
  $bgColor?: string;
  $activeColor?: string;
  $activeBgColor?: string;
  $activeOpacity?: number;
  $radius?: string | number;
}>`
  position: relative;
  &:active::after {
    ${afterStyle}

    // Set background & opacity changes only if the button is not loading or disabled
    ${(props) =>
    !props.disabled &&
    !props.$loading &&
    css`
        color: ${props.$activeColor || props.$color};
        background: ${props.$activeBgColor || props.$bgColor || "transparent"};
        opacity: ${props.$activeOpacity || defaultStyles.activeOpacity};
      `}

    ${({ $radius }) =>
    typeof $radius !== "undefined"
      ? css`
            border-radius: ${typeof $radius === "number"
          ? `${$radius}px`
          : $radius};
          `
      : css`
            border-radius: ${defaultStyles.radius};
          `};
  }
`;

const buttonDisabled = css<{
  disabled?: boolean;
  $color?: string;
  $bgColor?: string;
  $disabledColor?: string;
  $disabledBgColor?: string;
}>`
  ${(props) =>
    props.disabled === true &&
    css`
      color: ${props.$disabledColor || props.$color};
      background: ${props.$disabledBgColor || props.$bgColor};
    `}
`;

const buttonLoading = css<{
  $loading?: boolean;
  $color?: string;
  $bgColor?: string;
  $loadingColor?: string;
  $loadingBgColor?: string;
}>`
  ${(props) =>
    props.$loading === true &&
    css`
      color: ${props.$loadingColor || props.$color};
      background: ${props.$loadingBgColor || props.$bgColor};
    `}
`;

export const BaseButton = styled.button<{
  $isMobile?: boolean;
  $width?: string | number;
  $height?: string | number;
  $radius?: string | number;
  $loading?: boolean;
  $color?: string;
  $bgColor?: string;
  $hoverColor?: string;
  $hoverBgColor?: string;
  $hoverOpacity?: number;
  $activeColor?: string;
  $activeBgColor?: string;
  $activeOpacity?: number;
  $disabledColor?: string;
  $disabledBgColor?: string;
  $loadingColor?: string;
  $loadingBgColor?: string;
}>`
  /* Clear default style */
  border: none;
  outline: none;
  padding: 0;
  background: ${(props) => (props.$bgColor ? props.$bgColor : "transparent")};

  position: relative;

  /* Default to center */
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${(props) => props.$color};

  ${({ $height }) =>
    $height &&
    css`
      height: ${typeof $height === "number" ? `${$height}px` : $height};
    `};

  ${({ $width }) =>
    $width &&
    css`
      width: ${typeof $width === "number" ? `${$width}px` : $width};
    `};

  ${({ $radius }) =>
    $radius
      ? css`
          border-radius: ${typeof $radius === "number"
          ? `${$radius}px`
          : $radius};
        `
      : css`
          border-radius: ${defaultStyles.radius};
        `};

  cursor: ${(props) =>
    props.$loading ? "wait" : props.disabled ? "not-allowed" : "pointer"};
  ${buttonHover}
  ${buttonClick}
  ${(props) =>
    props.$loading ? buttonLoading : props.disabled ? buttonDisabled : ""}
`;
