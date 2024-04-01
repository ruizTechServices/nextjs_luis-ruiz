import React from "react";

const Logo = () => {
  return (
    <>
      <div className="relative w-full h-0 pt-[100%] pb-0 shadow-md mt-6 mb-3 overflow-hidden rounded-lg will-change-transform">
        <iframe
          loading="lazy"
          className="absolute w-full h-full top-0 left-0 border-none p-0 m-0"
          src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAGBKhJRXiE&#x2F;1PKtRPKH6SI4k0uR5IZ4Dw&#x2F;view?embed"
        ></iframe>
      </div>
      <a
        href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAGBKhJRXiE&#x2F;1PKtRPKH6SI4k0uR5IZ4Dw&#x2F;view?utm_content=DAGBKhJRXiE&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        Luis Ruiz
      </a>
    </>
  );
};

export default Logo;
