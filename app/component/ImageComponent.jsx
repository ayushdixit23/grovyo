import React from "react";

const ImageComponent = ({
  src,
  width = "w-[50px]",
  height = "h-[50px]",
  borderRadius = "rounded-[18px]",
  type = "object-cover",
}) => {
  return (
    <div className={`${width} ${height} overflow-hidden ${borderRadius}`}>
      <img src={src} className={`w-full h-full ${type}`} />
    </div>
  );
};

export default ImageComponent;
