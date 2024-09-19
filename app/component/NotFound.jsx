import React from "react";

const NotFound = React.memo(() => {
  return (
    <section className="relative z-10 flex select-none flex-col justify-center w-full items-center bg-black h-screen py-[120px]">
      <div className="container w-full">
        <div className="w-full flex">
          <div className="w-full px-4">
            <div className="w-full text-center">
              <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                404
              </h2>
              <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
                Oops! That page can't be found
              </h4>
              <p className="mb-8 text-lg text-white">
                The page you are looking for it maybe deleted
              </p>
              <a
                href="/"
                className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-blue-400 hover:text-primary"
              >
                Go To Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default NotFound;
