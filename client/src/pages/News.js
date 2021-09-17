import axios from "axios";
import React from "react";
import {useState, useEffect} from 'react';
import "semantic-ui-css/semantic.min.css";
import {List, Grid, Image, Container, Header} from "semantic-ui-react";

export default function News(){
    const [loadArticles, setLoadArticles] = useState(true);
    const [animeArticles, setAnimeArticles] = useState([]);

    useEffect(()=>{
        const fetchArticles = async()=>{
            setLoadArticles(true);

            const result = await axios("http://localhost:3001/news/2021/summer");

            setAnimeArticles(result.data);
            setLoadArticles(false);
        }
        fetchArticles();
    }, [])

    // filter out anime without articles
    let filteredArticles = animeArticles.filter(item=>{
        return item.article.length > 0;
    });
    
    return(
        <div className="content">
            {loadArticles ? (
                <h1>Loading articles...</h1>
            ) : (
                <Container>
                    <List divided style={{maxWidth: 900, margin: "0 auto"}}>   
                        {filteredArticles.map((item, i)=>{
                            return(
                                <Article item={item} key={item.anime + i} />
                            )
                        })}
                    </List>
                </Container>
            )}
        </div>
    )
}

function Article({item}){
    let currentArticle = item.article[0];
    return(
        <List.Item style={{padding: 30}}>
            <Grid>
                <Grid.Column   
                    width={11}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start"
                    }}
                >
                    <Header as="h3">
                        <a href={currentArticle.url}>
                            {currentArticle.title}
                        </a>
                    </Header>
                    <List.Description style={{margin: "20px 0"}}>
                        {currentArticle.description}
                    </List.Description>
                    <List bulleted horizontal>
                        <List.Item>
                            {currentArticle.source.name}
                        </List.Item>
                        <List.Item>
                            {currentArticle.publishedAt.split("T")[0]}
                        </List.Item>
                        <List.Item>
                            {item.anime}
                        </List.Item>
                    </List>
                </Grid.Column>
                <Grid.Column width={5}>
                    <Image src={currentArticle.urlToImage} />
                </Grid.Column>
            </Grid>
        </List.Item>
    )
}