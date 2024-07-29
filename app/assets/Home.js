import React from "react";

function Home({ color }) {
  return (
    <>
      <svg
        className="h-5 w-5 stroke-[1.5px] "
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.9931 3.19968L13.9934 3.19986L19.7533 7.2298C19.7533 7.22982 19.7533 7.22984 19.7534 7.22986C20.2226 7.55833 20.6668 8.09689 20.9943 8.72408C21.3217 9.35129 21.51 10.0244 21.51 10.6002V17.3802C21.51 19.654 19.6638 21.5002 17.39 21.5002H6.60999C4.33754 21.5002 2.48999 19.6454 2.48999 17.3702V10.4702C2.48999 9.93574 2.66038 9.29667 2.95857 8.69105C3.25662 8.0857 3.66106 7.55706 4.08751 7.22443L4.08761 7.22435L9.09624 3.31542C9.09646 3.31525 9.09669 3.31507 9.09691 3.3149C10.4338 2.27962 12.6028 2.2256 13.9931 3.19968Z"
          className={`${color === 1
            ? " fill-[#569FF5]"
            : " stroke-black dark:stroke-white"
            }`}
        />
        <path
          d="M11.9998 18.75C11.5898 18.75 11.2498 18.41 11.2498 18V15C11.2498 14.59 11.5898 14.25 11.9998 14.25C12.4098 14.25 12.7498 14.59 12.7498 15V18C12.7498 18.41 12.4098 18.75 11.9998 18.75Z"
          className={`${color === 1 ? " fill-[#fff]" : "fill-[#3e3e3e] dark:fill-white"
            }`}
        />
      </svg>
    </>
  );
}

export default Home;
