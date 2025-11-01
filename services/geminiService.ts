
import { GoogleGenAI } from "@google/genai";

const getSolutionsForError = async (errorCode: string): Promise<string> => {
  // API Key is read from environment variables
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are an expert software engineer and debugger with decades of experience across multiple programming languages, frameworks, and platforms.
    Analyze the following error message and provide a clear, concise, and actionable list of potential causes and solutions.

    Follow these instructions for your response:
    1.  Start with a brief, one-sentence summary of what the error likely means.
    2.  Create a "Potential Causes" section with a bulleted list of the most common reasons for this error.
    3.  Create a "Suggested Solutions" section. For each cause, provide a corresponding step-by-step solution.
    4.  Include well-formatted code snippets using Markdown's triple backticks (\`\`\`) where applicable to illustrate fixes.
    5.  Keep the language clear and easy to understand for a developer who might be stressed out from debugging.
    6.  If the error is ambiguous, suggest ways the user can get more information (e.g., adding log statements, checking specific configuration files).
    7.  Format the entire response in Markdown.

    Error Message:
    ---
    ${errorCode}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate content from Gemini API.");
  }
};

export { getSolutionsForError };
