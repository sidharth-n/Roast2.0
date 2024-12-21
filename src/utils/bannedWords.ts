// Banned words list for content moderation
export const bannedWords = {
  explicit: [
    "xxx", "porn", "nsfw",
    // Add more explicit words here
  ],
  drugs: [
    "cocaine", "heroin", "meth",
    // Add more drug-related words here
  ],
  harmful: [
    "kill", "murder", "suicide",
    // Add more harmful words here
  ]
};

export const checkForBannedWords = (text: string): string | null => {
  const lowercaseText = text.toLowerCase();
  
  for (const [category, words] of Object.entries(bannedWords)) {
    for (const word of words) {
      if (lowercaseText.includes(word.toLowerCase())) {
        return `Contains banned ${category} content. Please revise your input.`;
      }
    }
  }
  
  return null;
};