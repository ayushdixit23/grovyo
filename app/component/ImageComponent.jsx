import Image from "next/image";
import React from "react";

const ImageComponent = ({
  src,
  width = "w-[50px]",
  height = "h-[50px]",
  alt = "image",
  borderRadius = "rounded-[18px]",
  type = "object-cover",
}) => {
  return (
    <div className={`${width} ${height} overflow-hidden ${borderRadius}`}>
      <Image
        src={src}
        width={50}
        height={50}
        alt={alt}
        className={`w-full h-full ${type}`}
      />
    </div>
  );
};

export default ImageComponent;
