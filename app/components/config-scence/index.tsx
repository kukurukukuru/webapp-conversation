import type { FC } from 'react'
import React from 'react'
import type { IWelcomeProps } from '../welcome'
import Welcome from '../welcome'

const ConfigSence: FC<IWelcomeProps> = (props) => {
  return (
    <div className='
      sticky top-0 flex items-center px-8 h-16 bg-white/80 text-base font-medium
      text-gray-900 border-b-[0.5px] border-b-gray-100 backdrop-blur-md z-10
      false
      '>
      <Welcome {...props} />
    </div>
  )
}
export default React.memo(ConfigSence)
