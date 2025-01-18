import { GoogleGenerativeAI } from "@google/generative-ai";

const GeminiResponse = async (projectName, projectDescription, timeFrame, skillLevel, maxOutputTokens = 100) => {
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyBEYyXbovuMN87UIRW6B0DyiRbHR1Tcs94");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prompt Construction
    const prompt = `
      Create a task breakdown (strictly output it as a numbered list & make it as short as possible):
      **Project Name:** ${projectName},
      **Project Description:** (Steps) ${projectDescription},
      **Time Frame:** ${timeFrame},
      **Skill Level:** ${skillLevel},
    `;

    // Response Generation
    const result = await model.generateContent(prompt, { maxOutputTokens });

    const textResult = result.response.text();

    console.log("...Text Generated");
    
    return (projectName, textResult);  
  } catch (error) {
    console.error("Error generating content:", error.message);
    throw error;
  }
};

export default GeminiResponse;
