import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import TwitterTweetEmbed from "react-tweet-embed";

export function Tweets(){
    const [tweets, setTweets] = useState([]);
    const [loadTweet, setLoadTweet] = useState(false);
    useEffect(()=>{
        const fetchTweets = async() =>{
            setLoadTweet(true);

            const result = await axios("http://localhost:3001/tweets/2021/summer")

            setTweets(result.data);
            setLoadTweet(false);
        };
        fetchTweets();
    }, [])
    return(
        <div>
            {loadTweet ? (
                <h1 className="content">Loading tweets...</h1>
            ) : (
                <div className="content">
                    {tweets.map((item)=>{
                        return(
                            <div>
                                <h2 key={item.anime}>{item.anime}</h2>
                                <div style={{display: "flex", justifyContent: "center"}}>
                                    <TwitterTweetEmbed key={item.tweets[0]} id={item.tweets[0]} options={{width:700}}/>
                                    <TwitterTweetEmbed key={item.tweets[1]} id={item.tweets[1]} options={{width:700}}/>
                                    <TwitterTweetEmbed key={item.tweets[2]} id={item.tweets[2]} options={{width:700}}/>
                                    <p></p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}