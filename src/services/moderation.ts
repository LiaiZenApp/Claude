// AI Moderation Service
export const moderateMessage = async (text: string): Promise<string[]> => {
  try {
    // This is a placeholder implementation
    // In production, this would call your AI moderation API
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simple demo logic - flag messages with certain keywords
    const flaggedWords = ['stupid', 'hate', 'terrible', 'awful'];
    const containsFlaggedWord = flaggedWords.some(word => 
      text.toLowerCase().includes(word.toLowerCase())
    );
    
    if (containsFlaggedWord) {
      // Return two AI-generated alternatives
      return [
        generatePositiveAlternative(text),
        generateNeutralAlternative(text)
      ];
    }
    
    // Return empty array if message is acceptable
    return [];
  } catch (error) {
    console.error('Moderation service error:', error);
    // In case of error, allow the message through
    return [];
  }
};

const generatePositiveAlternative = (originalText: string): string => {
  // Simple text transformation for demo purposes
  // In production, this would use AI to generate better alternatives
  const positiveReplacements: { [key: string]: string } = {
    'stupid': 'challenging',
    'hate': 'am concerned about',
    'terrible': 'difficult',
    'awful': 'concerning'
  };
  
  let alternative = originalText;
  Object.entries(positiveReplacements).forEach(([negative, positive]) => {
    alternative = alternative.replace(new RegExp(negative, 'gi'), positive);
  });
  
  return `I think ${alternative}. Let's work together on this.`;
};

const generateNeutralAlternative = (originalText: string): string => {
  // Another simple transformation for demo
  const neutralReplacements: { [key: string]: string } = {
    'stupid': 'not ideal',
    'hate': 'disagree with',
    'terrible': 'problematic',
    'awful': 'not working well'
  };
  
  let alternative = originalText;
  Object.entries(neutralReplacements).forEach(([negative, neutral]) => {
    alternative = alternative.replace(new RegExp(negative, 'gi'), neutral);
  });
  
  return `I feel that ${alternative}. Can we discuss this?`;
};