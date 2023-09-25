import twitterClient from "../config/twit";
import keywords from "../common/keywords";
import { getRandomTweetResponse } from "../util/response.util";

const stream = twitterClient.stream('statuses/filter', { track: keywords[0] });

console.log('stream created', stream)

enum TwitterClientEvents {
    TWEET = 'tweet',
    STATUSES_FILTER = 'statuses/filter'
}

type TweetType = {
    text: string
    id_str: string
}

export function subscribeToTweetEvent(responseText?: string) {
    console.log('starting to listen to tweets');

    stream.on(TwitterClientEvents.STATUSES_FILTER, (tweet: TweetType) => {
        console.log('tweet received:', tweet.text);

        const tweetText = tweet.text.toLowerCase();
        const matchingKeyword = keywords.find(keyword => tweetText.includes(keyword.toLowerCase()));

        if (matchingKeyword) {
            const randomResponse = responseText || getRandomTweetResponse(true);
            const reply = {
                status: randomResponse,
                in_reply_to_status_id: tweet.id_str
            };

            // twitterClient.post('statuses/update', reply, (err) => {
            //     if (err) {
            //         console.error('Erro ao responder ao tweet:', err);
            //     } else {
            //         console.log('Resposta ao tweet enviada:', randomResponse);
            //     }
            // });
        }
    });

}


