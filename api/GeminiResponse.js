import { GoogleGenerativeAI } from "@google/generative-ai";

const GeminiResponse = async (projectName, projectDescription, timeFrame, skillLevel, maxOutputTokens = 100) => {
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyBEYyXbovuMN87UIRW6B0DyiRbHR1Tcs94");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prompt Construction
    const prompt = `
      Create step-by-step instructions with short but informative directions including recommended time frame and a note section (Should be a continuing list):
      **Project Name:** ${projectName},
      **Project Description:** ${projectDescription},
      **Time Frame:** ${timeFrame},
      **Skill Level:** ${skillLevel},
    `;

    // Response Generation
    const result = await model.generateContent(prompt, { maxOutputTokens });

    console.log("Full response:", result.response.text());
    
    return result.response.text();  
  } catch (error) {
    console.error("Error generating content:", error.message);
    throw error;
  }
};

export default GeminiResponse;
