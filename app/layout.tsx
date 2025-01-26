import { getLocaleOnServer } from '@/i18n/server'
import { getWagmiConfig } from '@/lib/wagmiConfig'
import { cookieToInitialState } from 'wagmi'
import { headers } from "next/headers";

import './styles/globals.css'
import './styles/markdown.scss'
import { WagmiProviders } from '@/lib/providers/WagmiProviders';
import StyledComponentsRegistry from '@/lib/providers/StyledComponentsRegistry';

const LocaleLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const locale = getLocaleOnServer()
  const initialState = cookieToInitialState(
    getWagmiConfig(),
    headers().get("cookie")
  );

  return (
    <html lang={locale ?? 'en'} className="h-full">
      <body className="h-full select-auto color-scheme">
        <div className="min-w-[300px] w-full h-full pb-[env(safe-area-inset-bottom)]">
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </div>
      </body>
    </html>
  )
}

export default LocaleLayout
