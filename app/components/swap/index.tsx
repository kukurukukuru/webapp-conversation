"use client";

import { getQuote, getTokenSymbol, parseSwapParams } from "@/utils/helper";
import { useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import SwapBtn from "../swap-btn";

const Panel = styled.div`
  max-width: min(300px, 70vw);
  min-width: min(280px, 70vw);
  display: flex;
  flex-wrap: wrap;
  padding: 20px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  border-radius: 8px;
  background: var(--White, #fff);

  /* Shadow */
  box-shadow: 6px 6px 10px 0px rgba(0, 13, 31, 0.03);
`;

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  gap: 10px;
`;

const Left = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const FromTo = styled.span`
  width: 36px;

  overflow: hidden;
  color: var(--Deep-400, #80868f);
  text-align: right;
  text-overflow: ellipsis;

  /* Description */
  font-family: "HarmonyOS Sans SC";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Symbol = styled.span`
  margin-left: 14px;
  text-align: left;

  overflow: hidden;
  color: var(--Deep-800, #1a2535);
  text-overflow: ellipsis;

  /* H7 */
  font-family: "HarmonyOS Sans SC";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Amount = styled.span`
  overflow: hidden;
  color: var(--Deep-800, #1a2535);
  text-align: right;
  text-overflow: ellipsis;

  /* H7 */
  font-family: "HarmonyOS Sans SC";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

interface SwapProps {
  content: string;
}

const Swap: React.FC<SwapProps> = ({ content }) => {
  const obj = useMemo(() => {
    return parseSwapParams(content);
  }, [content]);
  const [toSymbol, setToSymbol] = useState("...");
  const [toAmount, setToAmount] = useState("...");
  const [quote, setQuote] = useState<any>();
  const [fetchingQuote, setFetchingQuote] = useState<boolean>(true);
  const fromSymbol = "SOL";
  const fromAmount = typeof obj !== "string" ? obj.amount : "-";

  useEffect(() => {
    if (typeof obj === "string") return;
    getTokenSymbol(obj.address).then((symbol) =>
      setToSymbol(symbol || "Unknown")
    );
    setFetchingQuote(true);
    getQuote(obj.address, obj.amount)
      .then((quote) => {
        setQuote(quote);

        let outAmount = quote?.outAmount;
        if (typeof outAmount === "string" || typeof outAmount === "number") {
          outAmount =
            typeof outAmount === "number"
              ? (outAmount / 1000000000).toString()
              : typeof outAmount === "string"
              ? Number(outAmount) / 1000000000
              : "-";
          setToAmount(outAmount);
        } else {
          setToAmount("not tradable");
        }
      })
      .finally(() => {
        setFetchingQuote(false);
      });
  }, [obj]);

  if (typeof obj === "string") return <>Invalid data</>;
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Panel>
        <Line>
          <Left>
            <FromTo>From</FromTo>
            <Symbol>{fromSymbol}</Symbol>
          </Left>
          <Amount>{fromAmount}</Amount>
        </Line>

        <Line>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="122"
            height="16"
            viewBox="0 0 122 16"
            fill="none"
          >
            <path
              d="M61.5 3C61.5 2.72386 61.2761 2.5 61 2.5C60.7239 2.5 60.5 2.72386 60.5 3L61.5 3ZM60.6464 13.3536C60.8417 13.5488 61.1583 13.5488 61.3535 13.3536L64.5355 10.1716C64.7308 9.97631 64.7308 9.65973 64.5355 9.46447C64.3403 9.2692 64.0237 9.2692 63.8284 9.46447L61 12.2929L58.1716 9.46447C57.9763 9.2692 57.6597 9.2692 57.4645 9.46447C57.2692 9.65973 57.2692 9.97631 57.4645 10.1716L60.6464 13.3536ZM60.5 3L60.5 13L61.5 13L61.5 3L60.5 3Z"
              fill="#80868F"
            />
          </svg>
        </Line>

        <Line>
          <Left>
            <FromTo>To</FromTo>
            <Symbol>{toSymbol}</Symbol>
          </Left>
          <Amount>{toAmount}</Amount>
        </Line>
      </Panel>

      <SwapBtn content={content} quote={quote} loading={fetchingQuote} />
    </div>
  );
};

export default Swap;
