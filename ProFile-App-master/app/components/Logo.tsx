import React from 'react'
import Image from 'next/image'
const Logo = () => {
  return (
    <div className='flex justify-center items-center px-auto bg-teal-500/70'>
        <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4 ">
                    <div className="flex flex-col justify-center items-center rounded-lg  p-2 ">
                        <Image
                            src="/eigLogo.png"
                            width={140}
                            height={140}
                            alt='Photo Logo'
                        />
                    </div>

                    <div className="flex flex-col justify-center items-center rounded-lg  p-2">
                        <Image
                            src="/emLogo.png"
                            width={140}
                            height={140}
                            alt='Photo Logo'
                        />
                    </div>

                    <div className="flex flex-col justify-center items-center rounded-lg  p-2">
                        <Image
                            src="/emvLogo.png"
                            width={140}
                            height={140}
                            alt='Photo Logo'
                        />
                    </div>

                    <div className="flex flex-col justify-center items-center rounded-lg  p-2">
                        <Image
                            src="/esdamLogo.png"
                            width={140}
                            height={140}
                            alt='Photo Logo'
                        />
                    </div>
                </dl>
    </div>
  )
}

export default Logo