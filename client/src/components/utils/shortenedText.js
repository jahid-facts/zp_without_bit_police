export const shortenedText = (content, maxLength) => {
  if (content.length <= maxLength) {
    return content;
  } else {
    return content.substring(0, maxLength - 3) + "...";
  }
};
