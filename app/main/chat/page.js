

"use client"
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Toaster } from 'react-hot-toast'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import ShimmerChat from '@/app/component/ShimmerChat'
import EmptyInbox from '@/app/component/EmptyInbox'
const Component = dynamic(() => import('./component'))

const page = () => {
  return (
    <>
  
      <Suspense fallback={
        <div
          className={`h-[100vh] w-full bg-white dark:bg-bluedark pn:max-sm:pb-20 flex flex-col sm:flex-row`}
        >
          <div className="h-full select-none bg-white dark:bg-[#0D0D0D] relative sm:min-w-[390px] flex flex-col">
            <div className="w-full h-[10%] border-b dark:border-[#131619] flex justify-between items-center p-2">

            </div>
            <div className="w-full h-full overflow-auto px-2">

              <ShimmerChat />
            </div>

          </div>

          <div className="w-full h-full">
            <EmptyInbox />
          </div>
        </div>

      }>
        <Component />
      </Suspense>
    </>
  )
}

export default page
