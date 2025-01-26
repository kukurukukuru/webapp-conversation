'use client'
import Button from '@/app/components/base/button'
import { getTx, parseSwapParams } from '@/utils/helper';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
// import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, { useCallback, useMemo } from 'react';
import Toast from '../base/toast';

interface SwapBtnProps {
  quote: any;
  content: string;
  loading?: boolean
}

const SwapBtn: React.FC<SwapBtnProps> = ({ quote, content, loading }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  const obj = useMemo(() => { return parseSwapParams(content) }, [content])

  const onClick = useCallback(async () => {
    try {
      if (typeof obj === 'string') throw new Error("Illegal data")
      if (!publicKey) throw new WalletNotConnectedError();

      // 890880 lamports as of 2022-09-01
      // const lamports = await connection.getMinimumBalanceForRentExemption(0);

      const transaction = await getTx(publicKey.toString(), obj.address, obj.amount, quote);

      // const transaction = new Transaction().add(
      //   SystemProgram.transfer({
      //     fromPubkey: publicKey,
      //     toPubkey: Keypair.generate().publicKey,
      //     lamports,
      //   })
      // );

      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight }
      } = await connection.getLatestBlockhashAndContext();

      const signature = await sendTransaction(transaction, connection, { minContextSlot });

      await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });

      Toast.notify({ type: 'success', message: 'Transaction Successful!', duration: 3000 })
    } catch (e) {
      Toast.notify({ type: 'error', message: e instanceof Error ? e.message : 'Unknow error', duration: 3000 })
    }
  }, [obj, publicKey, quote, connection, sendTransaction]);

  if (!connected) return <WalletMultiButton style={{ backgroundColor: 'var(--Kontos-Blue, #413dec)', borderRadius: '99px' }} />

  return <Button onClick={onClick} loading={loading} disabled={!publicKey}>Click to buy</Button>
}

export default SwapBtn