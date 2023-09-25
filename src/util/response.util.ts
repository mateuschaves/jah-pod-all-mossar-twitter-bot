import { tweetResponsesPositive, tweetResponsesNegative } from '../common/tweets_responses';

export function getRandomTweetResponse(
    isPositive: boolean, 
    _tweetResponsesNegative: string[] = tweetResponsesNegative, 
    _tweetResponsesPositive: string[] = tweetResponsesPositive
) {
    const responses = isPositive ? _tweetResponsesPositive : _tweetResponsesNegative;
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}