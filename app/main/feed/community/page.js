import React, { Suspense } from 'react'
import Component from './component';
import PostLoading from '@/app/component/PostLoading';
import EmptyCommunity from '@/app/component/EmptyCommunity';
import styles from "../../../CustomScrollbarComponent.module.css";

const page = () => {
  return (
    <Suspense fallback={

      <div className="w-[100%] h-screen bg-white dark:bg-graydark flex flex-col sm:flex-row pn:max-md:justify-center ">
        <div
          className={`
        select-none lg:w-[27%] md:w-[32%] sm:w-[37%] flex flex-col items-center md:border-r-2 border-[#f7f7f7] dark:border-[#131619] self-end
           `}
        >
          {/* <div className="h-[100vh] pn:max-sm:h-[16vh]"></div> */}
          <div className="h-[10vh] pn:max-sm:h-[16vh]"></div>

          <div
            className={`h-[92vh] pn:max-sm:h-[87vh] ${styles.customScrollbar} w-full overflow-auto `}
          >
            {/* mt-[125px] */}

            {/* post 1*/}
            <div className=" w-full mt-[25px] rounded-xl mb-[4px] px-2">
              <div className="bg-[#151315] bg-com-image bg-cover bg-center w-full rounded-2xl p-2 text-white text-center h-[160px] flex flex-col justify-evenly items-center">
                <div className="font-semibold">Don't have a community ?</div>
                <div className="text-[12px] w-[85%]">
                  Create your own community and invite your friends and people
                </div>
                <div
                  className="bg-white text-[12px] text-black mt-2 p-2 rounded-xl"
                >
                  Create now
                </div>
              </div>
            </div>

            <PostLoading />


          </div>

          {/* POst */}
        </div>
        <div className="lg:w-[73%] md:w-[68%] sm:w-[63%] pn:max-sm:hidden">

          <EmptyCommunity />
        </div>
      </div >

    }>
      <Component />
    </Suspense >
  )
}

export default page