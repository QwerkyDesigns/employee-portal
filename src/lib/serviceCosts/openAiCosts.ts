// 0.0002 / 1000 tokens
// 0.0000002 / 1 token
const CHATGPT_PRICE_PER_TOKEN = 0.0000002;
export const calculateTextGenerationCost = (input: string) => {
    const cleanedText = cleanText(input);
    const tokenCount = countTokens(cleanedText)
    const cost = tokenCount * CHATGPT_PRICE_PER_TOKEN;
    const roundedCost = parseFloat(cost.toFixed(3));
    return roundedCost;
};

function cleanText(text: string) {
    return text.trim().replace(' ', '').split('');
}

function countTokens(text: string[]) {
    return (text.length / 4) + 2 // <start> and <stop> are the additional 2
}
