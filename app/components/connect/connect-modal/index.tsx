// "use client";

// import styled from "styled-components";
// import { useMemo, useRef } from "react";
// import React from "react";
// import Image from "next/image";
// import Modal from "../../base/modal/Modal";
// import { fontBold } from "@/app/styles/style.font";
// import { fontH8 } from "@/app/styles/style.global";
// import PrimaryButton from "../../base/button/PrimaryButton";
// import { useWallet } from "@/lib/useWallet";

// const THROTTLING_MS = 1000;

// const StyledModal = styled(Modal)`
//   width: 343px;
//   padding: 16px 16px 24px 16px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;

//   border-radius: 16px;
//   background: var(--Deep-800, #1a2535);
//   box-shadow: 6px 6px 10px 0px rgba(0, 13, 31, 0.03);

//   position: relative;
// `;

// const Title = styled.span`
//   color: var(--White, #fff);
//   text-align: center;
//   ${fontBold};
//   font-size: 18px;
//   line-height: 22px;

//   margin-bottom: 24px;
// `;

// const BackButton = styled.button`
//   border: none;
//   outline: none;
//   background-color: transparent;
//   position: absolute;
//   left: 16px;
//   top: 16px;
//   width: 24px;
//   height: 24px;
//   cursor: pointer;
// `;

// const ConnectingIcon = styled(Image)`
//   margin: 32px auto 44px auto;
//   @keyframes rotation {
//     0% {
//       transform: rotate(0deg);
//     }

//     100% {
//       transform: rotate(360deg);
//     }
//   }
//   animation: rotation 1s linear infinite;
// `;

// const ButtonWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 8px;
// `;

// const ArrowIcon = styled.img`
//   width: 24px;
//   height: 24px;
//   opacity: 0;

//   position: absolute;
//   top: 50%;
//   right: 16px;
//   transform: translateY(-50%);
// `;

// const ConnectButton = styled.button`
//   position: relative;
//   user-select: none;
//   padding: 0 16px;
//   height: 56px;
//   border-radius: 8px;
//   border: 1px solid var(--Deep-700, #333d4c);
//   background: var(--Deep-800, #1a2535);
//   color: var(--White, #fff);

//   display: flex;
//   align-items: center;
//   gap: 8px;

//   cursor: pointer;

//   @media (hover: hover) {
//     &:hover {
//       border-color: var(--Kontos-Blue, #413dec);
//       ${ArrowIcon} {
//         opacity: 1;
//       }
//     }
//   }
//   &:active {
//     border-color: var(--Kontos-Blue, #413dec);
//     ${ArrowIcon} {
//       opacity: 1;
//     }
//   }
// `;

// const ConnectIcon = styled.img`
//   width: 28px;
//   height: 28px;
//   border-radius: 8px;
// `;

// const ConnectText = styled.span`
//   color: var(--White, #fff);
//   /* H6 */
//   font-family: "HarmonyOS Sans";
//   font-size: 16px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 20px; /* 125% */
// `;

// const RecommendMark = styled.div`
//   position: absolute;
//   top: -1px;
//   right: -1px;

//   border-radius: 0px 8px;
//   background: linear-gradient(94deg, #ff1e2b 1.91%, #ffa979 101.43%);

//   display: flex;
//   padding: 2px 16px;
//   justify-content: center;
//   align-items: center;
//   gap: 4px;
// `;

// const RecommendIcon = styled.img`
//   width: 12px;
//   height: 12px;
// `;

// const RecommendText = styled.span<{ $isMobile?: boolean }>`
//   color: #fff;
//   text-align: center;
//   ${fontH8}
// `;

// const GotItButton = styled(PrimaryButton)`
//   background: rgba(65, 61, 236, 0.1);
//   color: var(--Kontos-Blue, #413dec);
//   font-size: 16px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 48px;
// `;

// interface IProps {
//   isMobile: boolean;
//   onClose: () => void;
// }

// export const ConnectModal: React.FC<IProps> = ({ isMobile, onClose }) => {
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const {
//     connectToInjectedWallet,
//     connectToKontosWallet,
//     connectViaWalletConnect,
//     isConnecting,
//   } = useWallet();

//   const connectItems = useMemo(() => {
//     return [
//       {
//         id: "injected",
//         icon: "images/connect/injected.svg",
//         label: "Injected",
//         callback: connectToInjectedWallet,
//         isRecommend: false,
//         forMobile: false,
//       },
//       {
//         id: "kontos",
//         icon: "images/connect/kontos.svg",
//         label: "Kontos Wallet",
//         callback: connectToKontosWallet,
//         isRecommend: true,
//         forMobile: true,
//       },
//       {
//         id: "wallet_connect",
//         icon: "images/connect/wallet-connect.png",
//         label: "Wallet Connect",
//         callback: connectViaWalletConnect,
//         isRecommend: false,
//         forMobile: true,
//       },
//     ].filter((item) => (isMobile ? item.forMobile : true));
//   }, [
//     connectToInjectedWallet,
//     connectToKontosWallet,
//     connectViaWalletConnect,
//     isMobile,
//   ]);

//   return (
//     <StyledModal
//       ref={wrapperRef}
//       onClose={() => {
//         !isConnecting && onClose();
//       }}
//     >
//       <Title>
//         {isConnecting ? "Waiting for Connection" : "Connect Your Wallet"}
//       </Title>

//       {isConnecting ? (
//         <ConnectingIcon
//           src={"/images/airdrop-panel/loading.png"}
//           width={108}
//           height={108}
//           alt="Connecting"
//         />
//       ) : (
//         <ButtonWrapper>
//           {connectItems.map((item) => (
//             <ConnectButton key={item.id} onClick={item.callback}>
//               <ConnectIcon src={item.icon} width={28} height={28} />
//               <ConnectText>{item.label}</ConnectText>
//               <ArrowIcon src={"images/connect/arrow.svg"} alt="" />
//               {item.isRecommend && (
//                 <RecommendMark>
//                   <RecommendIcon src={"images/connect/recommend.svg"} alt="" />
//                   <RecommendText>{"Recommend"}</RecommendText>
//                 </RecommendMark>
//               )}
//             </ConnectButton>
//           ))}
//         </ButtonWrapper>
//       )}
//     </StyledModal>
//   );
// };
