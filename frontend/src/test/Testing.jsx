import React, { useState } from "react";
import "unicode-emoji-picker";

const Testing = () => {
  const [userText, setUserText] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const handleEmojiPick = (event) => {
    const emoji = event.detail.emoji;
    setSelectedEmoji(emoji);
  };

  const handleInputChange = (event) => {
    setUserText(event.target.value);
  };

  const handleSubmit = () => {
    // Do something with the submitted content (userText + selectedEmoji)
    console.log(userText + selectedEmoji);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your text"
        value={userText}
        onChange={handleInputChange}
      />
      <unicode-emoji-picker onemoji-pick={handleEmojiPick}></unicode-emoji-picker>
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <p>Selected Emoji:</p>
        <div>{selectedEmoji}</div>
      </div>
    </div>
  );
};

export default Testing;
