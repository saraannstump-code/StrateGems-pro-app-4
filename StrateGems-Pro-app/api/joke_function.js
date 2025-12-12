import process from "process";
import OpenAI from "openai";

const dadJokeTopics = [
  "Coffee", "Elevators", "Fishing", "Math class", "Computers", "Socks",
];

const setupMessage =
  "For the AI Gateway to work, ensure you have a credit-based plan" +
  " and a linked project that you deployed live at least once";

export default async () => {
  if (!process.env.OPENAI_BASE_URL)
    return Response.json({ error: setupMessage });

  const randomTopic =
    dadJokeTopics[Math.floor(Math.random() * dadJokeTopics.length)];

  try {
    const client = new OpenAI();
    const res = await client.responses.create({
      model: "gpt-5-mini",
      input: [
        {
          role: "user",
          content: `Give me a random short dad joke about ${randomTopic}`,
        },
      ],
      reasoning: { effort: "minimal" },
    });
    const joke = res.output_text?.trim() || "Oops! I'm all out of jokes";

    return Response.json({
      topic: randomTopic,
      joke,
      model: res.model,
      tokens: {
        input: res.usage.input_tokens,
        output: res.usage.output_tokens,
      },
    });
  } catch (e) {
    return Response.json({ error: `${e}` }, { status: 500 });
  }
};

export const config = {
  path: "/api/joke",
}; 