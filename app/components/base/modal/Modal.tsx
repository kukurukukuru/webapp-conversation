"use client"

import { BASIC_MODAL_INDEX } from "@/config";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, ReactNode } from "react";
import styled from "styled-components";

export const Backdrop = styled(motion.div) <{
  $zIndex?: number;
  $outerOpacity?: number;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${(props) => props.$zIndex || BASIC_MODAL_INDEX};
  background-color: ${(props) =>
    `rgba(0, 0, 0, ${props.$outerOpacity || 0.7})`};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ModalContainer = styled(motion.div)`
  border-radius: 16px;
  background: var(--White, #fff);
  box-shadow: 0px -12px 40px 0px rgba(0, 13, 31, 0.1);
`;

interface IProps {
  onClose?: () => void;
  children?: ReactNode;
  zExtraIndex?: number;
  outerOpacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

const Modal = forwardRef<HTMLDivElement, IProps>(
  (
    {
      onClose = () => { },
      children = null,
      zExtraIndex = 0,
      outerOpacity,
      className = "",
      style = {},
    }: IProps,
    ref
  ) => {
    return (
      <Backdrop
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        $zIndex={BASIC_MODAL_INDEX + zExtraIndex}
        $outerOpacity={outerOpacity}
      >
        <AnimatePresence>
          <ModalContainer
            className={className}
            style={style}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            {children}
          </ModalContainer>
        </AnimatePresence>
      </Backdrop>
    );
  }
);
Modal.displayName = "Modal";
export default Modal;
