//
import React from 'react';
import PropTypes from 'prop-types';

const ProfileCard = ({ title, content }) => {
  return (
    <div className="bg-yellow-300 w-full rounded-3xl shadow-2xl m-2 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-xl bg-white rounded-2xl h-fit w-full p-2">
        {content}
        {/*I want to create a code for a dropdown or something that hides a paragraph of one sentence or more. For example
        if the paragraph has more than one sentence, the rest of the paragraph is hidden behind a link called 'more'. When the
        user clicks on it, it reveals the rest of the paragraph so the user can read it. The link also changes to 'less' to indicate
        that onced pressed, the paragraph will go back to its default, one-sentence state that it was previously. */}
      </p>
    </div>
  );
};

ProfileCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default ProfileCard;
