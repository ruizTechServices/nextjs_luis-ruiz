import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <>
      <Image src={"/images/logo_lr.png"} width={200} height={200} />
    </>
  );
};

export default Logo;
