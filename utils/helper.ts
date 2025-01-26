import { VersionedTransaction } from "@solana/web3.js";
import { TokenListProvider, TokenInfo } from "@solana/spl-token-registry";

type ParsedSwapParams = {
  action: number;
  address: string;
  amount: number;
};

const isParsedSwapParams = (obj: any): obj is ParsedSwapParams => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.action !== null &&
    typeof obj.address !== null &&
    typeof obj.amount !== null
  );
};

export const parseSwapParams = (input: string): ParsedSwapParams | string => {
  if (typeof input === "object" && input !== null) {
    if (isParsedSwapParams(input)) {
      return input;
    }
    return input;
  }

  if (typeof input === "string") {
    const jsonMatch = input.match(/\{[\s\S]*?\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        if (isParsedSwapParams(parsed)) {
          return parsed;
        }
      } catch (error) {}
    }
  }

  return input;
};

export const getTx = async (
  publicKey: string,
  outputMint: string,
  amount: number,
  quote: any
) => {
  try {
    const { swapTransaction } = await (
      await fetch("https://quote-api.jup.ag/v6/swap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // quoteResponse from /quote api
          quoteResponse: quote,
          // user public key to be used for the swap
          userPublicKey: publicKey,
          // auto wrap and unwrap SOL. default is true
          wrapAndUnwrapSol: true,
          // Optional, use if you want to charge a fee.  feeBps must have been passed in /quote API.
          // feeAccount: "fee_account_public_key"
        }),
      })
    ).json();
    const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
    var transaction = VersionedTransaction.deserialize(swapTransactionBuf);
    return transaction;
  } catch (e) {
    throw e;
  }
};

export const getTokenSymbol = async (
  mintAddress: string
): Promise<string | null> => {
  const tokenList = await new TokenListProvider().resolve();
  const tokens = tokenList.getList();

  const tokenInfo = tokens.find(
    (token: TokenInfo) => token.address === mintAddress
  );

  return tokenInfo ? tokenInfo.symbol : null;
};

export const getQuote = async (outputMint: string, amount: number) => {
  try {
    const quoteResponse = await (
      await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112\
&outputMint=${outputMint}\
&amount=${(amount * 1000000000).toString()}\
&slippageBps=50`
      )
    ).json();
    return quoteResponse;
  } catch (e) {
    throw e;
  }
};
