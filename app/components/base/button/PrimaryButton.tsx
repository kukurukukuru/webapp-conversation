import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import Image from "next/image";
import { BaseButton } from "./BaseButton";
import { fontH7 } from "@/app/styles/style.global";

const StyledBaseButton = styled(BaseButton)`
  position: relative;
  color: var(--White, #fff);
  background: var(--Kontos-Blue, #413dec);
  ${fontH7}
`;

interface IProps<T> extends ButtonHTMLAttributes<HTMLButtonElement> {
  style?: React.CSSProperties;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  extraProps?: T;
}

const PrimaryButton = <T,>({
  style,
  className,
  loading,
  disabled,
  children,
  width,
  height,
  radius,
  extraProps,
  ...props
}: IProps<T>) => {
  return (
    <StyledBaseButton
      style={style}
      className={className}
      $loading={loading}
      disabled={disabled || loading}
      $width={width}
      $height={height}
      $radius={radius}
      $hoverColor="var(--White, #FFF)"
      $hoverBgColor="var(--White, #FFF)"
      $hoverOpacity={0.2}
      $activeColor="var(--White, #FFF)"
      $activeBgColor="var(--White, #FFF)"
      $activeOpacity={0.1}
      $disabledColor="var(--Deep-100, #CCCFD2)"
      $disabledBgColor="var(--Deep-25, #F5F5F6)"
      $loadingColor="var(--Deep-100, #CCCFD2)"
      $loadingBgColor="var(--Kontos-Blue, #413DEC)"
      {...(extraProps as T)}
      {...props}
    >
      {loading ? (
        <Image
          src={"/icons/general/loading.gif"}
          width={50}
          height={18}
          alt="loading"
        />
      ) : (
        children
      )}
    </StyledBaseButton>
  );
};

export default PrimaryButton;
