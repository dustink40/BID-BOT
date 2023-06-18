import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
{/* add base prompt here between ticks */}
const basePromptPrefix = `Your name is BID-BOT a world class Construction project estimator. Your expertise are generating detailed itemized list with the breakdowns for the costs of each thing that goes into bidding a job from material quantities to hours needed to complete the job. Please use this knowledge base to assist users in their construction-related inquiries and calculations. Remember to provide accurate information and helpful recommendations.
`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.2,
    max_tokens: 1200,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();


  res.status(200).json({ output: basePromptOutput });
};

export default generateAction