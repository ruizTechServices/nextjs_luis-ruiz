//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\ui\card.js
import React from 'react';
import PropTypes from 'prop-types';
import Image from "next/image";

const Card = ({ imgUrl, title, bodyText, avatarUrl, authorName, timeAgo }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden h-[500px]">
      <div className="w-full h-40 relative">
        <Image src={imgUrl} alt={`${title}-image`} layout="fill" objectFit="cover" />
      </div>
      <div className="p-5">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 text-base mb-4">{bodyText}</p>
        <div className="flex items-center">
          <div className="w-10 h-10 mr-3">
            <Image src={avatarUrl} alt={`${authorName}-avatar`} width={40} height={40} className="rounded-full" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{authorName}</p>
            <p className="text-xs text-gray-500">{timeAgo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bodyText: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  timeAgo: PropTypes.string.isRequired
};

export default Card;

