//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\cards\Intro.js
import React from "react";
import Card from "../../ui/card"; // Ensure this path is correct

const MainCard = () => {
  const cardData = {
    imgUrl:
 "/images/background_1.jpg", //replace with an image from Supabase database assigned to a specific user.
    title: "Explore the World of Technology",//replace with title in conjunction to supabase database and its user
    bodyText:
      "Stay updated with the latest tech trends and innovations happening around the globe.", //replace with bodyText in conjunction to supabase database and its user
    avatarUrl:
  "/images/IMG_3287.jpg", //replace with avatar image from Supabase database assigned to a specific user.
    authorName: "Jane Doe",
    timeAgo: "just now", // Placeholder for demonstration; consider a dynamic approach
  };

  return (
    <MainCard
      imgUrl={cardData.imgUrl}
      title={cardData.title}
      bodyText={cardData.bodyText}
      avatarUrl={cardData.avatarUrl}
      authorName={cardData.authorName}
      timeAgo={cardData.timeAgo}
    />
  );
};

export default MainCard;
