import { ChatAnthropic } from "@langchain/anthropic";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

// 1. Define your strict schema
const schema = z.object({
  summary: z.string().describe("A concise, markdown-formatted summary of the repository (overview, main technologies, key features, important notes)"),
  coolfacts: z.array(z.string()).describe("An array of 3-5 cool or surprising facts about the repository"),
});

// Use StructuredOutputParser with your schema
const parser = StructuredOutputParser.fromZodSchema(schema);

// Initialize Anthropic client
const model = new ChatAnthropic({
  modelName: "claude-3-7-sonnet-20250219",
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  temperature: 0.7,
  maxTokens: 1000,
});

// Create prompt template for repository summarization
const prompt = PromptTemplate.fromTemplate(`
You are a helpful AI assistant that summarizes GitHub repositories.

Analyze the following GitHub repository and return a JSON object that strictly matches this schema:
${schema.toString()}

Repository URL: {url}

{format_instructions}

IMPORTANT: Respond ONLY with a valid JSON object that matches the schema above.
`);

// Create the summarization chain
const chain = prompt.pipe(model);

export async function summarizeRepository(url: string) {
  const input = {
    url,
    format_instructions: parser.getFormatInstructions(),
  };
  const result = await chain.invoke(input);
  const parsed = await parser.parse(result.content as string);
  return parsed;
} 