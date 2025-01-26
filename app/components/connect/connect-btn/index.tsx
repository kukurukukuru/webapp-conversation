// "use client";

// import { useWallet } from "@/lib/useWallet";
// import { useCallback } from "react";
// import { useTranslation } from "react-i18next";
// import PrimaryButton from "../../base/button/PrimaryButton";

// export const MobileSignInPanel: React.FC = () => {
//   const { t } = useTranslation()
//   const {
//     isConnecting,
//     setShowConnectModal,
//   } = useWallet();

//   const handleConnect = useCallback(async () => {
//     setShowConnectModal(true);
//   }, [setShowConnectModal]);

//   return (
//     <PrimaryButton
//       width={78}
//       height={32}
//       radius={99}
//       onClick={handleConnect}
//       loading={isConnecting}
//     >
//       {t("Connect")}
//     </PrimaryButton>
//   );
// };
