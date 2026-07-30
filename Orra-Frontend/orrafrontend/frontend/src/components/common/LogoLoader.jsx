import React from 'react'
import logoloader  from '../../assets/logo/logoloader.svg'


const LogoLoader = () => {
  return (
 <div className="flex items-center justify-center py-24">
      <div className="relative w-[150px] h-[150px] flex items-center justify-center">
        <div className="ring-rotate">
          <div className="ring" />
        </div>
        <div className="ring-rotate">
          <div className="ring ring--delay" />
        </div>

        <div className="relative z-10 w-[70px] h-[70px]">
          <img
            src={logoloader}
            alt="Loading"
            className="w-full h-full animate-[float_3s_cubic-bezier(0.45,0,0.55,1)_infinite,glowShift_4s_ease-in-out_infinite]"
          />
        </div>

        <div className="absolute -bottom-4 left-1/2 -ml-[18px] w-9 h-2 rounded-full bg-[radial-gradient(ellipse,rgba(167,139,250,0.35)_0%,transparent_72%)] animate-[shadowPulse_3s_cubic-bezier(0.45,0,0.55,1)_infinite]" />
      </div>
    </div>
  )
}

export default LogoLoader