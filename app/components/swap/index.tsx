'use client'

import { getQuote, getTokenSymbol, parseSwapParams } from "@/utils/helper";
import { useEffect, useMemo, useState } from "react";
import SwapBtn from "../swap-btn";

interface SwapProps {
  content: string;
}

const Swap: React.FC<SwapProps> = ({ content }) => {
  const obj = useMemo(() => { return parseSwapParams(content) }, [content])
  const [toSymbol, setToSymbol] = useState('...');
  const [toAmount, setToAmount] = useState('...');
  const [quote, setQuote] = useState<any>();
  const [fetchingQuote, setFetchingQuote] = useState<boolean>(true);
  const fromSymbol = "SOL";
  const fromAmount = typeof obj !== 'string' ? obj.amount : '-'

  useEffect(() => {
    if (typeof obj === 'string') return
    getTokenSymbol(obj.address).then((symbol) => setToSymbol(symbol || 'unknown'))
    setFetchingQuote(true)
    getQuote(obj.address, obj.amount).then((quote) => {
      setQuote(quote)

      let outAmount = quote?.outAmount;
      if (typeof outAmount === 'string' || typeof outAmount === 'number') {
        outAmount = typeof outAmount === 'number' ? (outAmount / 1000000000).toString() : typeof outAmount === 'string' ? Number(outAmount) / 1000000000 : '-'
        setToAmount(outAmount)
      } else {
        setToAmount('not tradable')
      }
    }).finally(() => {
      setFetchingQuote(false)
    })
  }, [obj])



  if (typeof obj === 'string') return <>Invalid data</>
  return (
    <div className="flex flex-col items-center justify-center gap-2">

      <div
        className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-4 flex flex-col lg:flex-row"
        style={{ border: "2px solid var(--Kontos-Blue, #413dec)" }}
      >
        {/* Left Section */}
        <div className="flex-1 flex flex-col items-start justify-between lg:pr-4 mb-6 lg:mb-0 space-y-6">
          <div
            className="text-xl font-semibold whitespace-nowrap"
            style={{ color: "var(--Kontos-Blue, #413dec)" }}
          >
            {fromSymbol}
          </div>
          <div
            className="text-xl font-semibold whitespace-nowrap"
            style={{ color: "var(--Kontos-Blue, #413dec)" }}
          >
            {toSymbol}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col items-end justify-between lg:pl-4 space-y-6">
          <div className="text-xl font-semibold text-gray-700 whitespace-nowrap">
            {fromAmount}
          </div>
          <div className="text-xl font-semibold text-gray-700 whitespace-nowrap">
            {toAmount}
          </div>
        </div>
      </div>

      <SwapBtn content={content} quote={quote} loading={fetchingQuote} />
    </div>
  );
}

export default Swap