"use client";
import type { FC } from "react";
import React from "react";

import type { IMainProps } from "@/app/components";
import Main from "@/app/components";
import { Wallet } from "./Wallet";
// import { Wallet } from './Wallet'

const App: FC<IMainProps> = ({ params }: any) => {
  return (
    <Wallet>
      <Main params={params} />
    </Wallet>

    // <Main params={params} />
  );
};

export default React.memo(App);
