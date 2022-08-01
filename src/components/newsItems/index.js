import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
} from "@ionic/react";
import "./index.scss";
import { NavLink } from "react-router-dom";
export default function NewsItems(props) {
  const mainNewsPiece = [props.newsList[0]];
  const hotNews = [props.newsList[1], props.newsList[2]];
  const relatedNews = props.newsList.splice(3, props.newsList.length - 3);
  console.log(mainNewsPiece);
  return (
    <div className="news-container">
      <div className="news-headlines">
        <div className="headline">
          <NewsPiece news={mainNewsPiece} />
        </div>
        <div className="hot-news">
          <NewsPiece news={hotNews} />
        </div>
      </div>
      <div className="related-news">
        <NewsPiece news={relatedNews} />
      </div>
    </div>
  );
}

function NewsPiece(props) {
  return (
    <div>
      {props.news.map((news, i) => {
        return (
          <ion-card href={news.url} color="light">
            <img src={news.urlToImage} />
            <div className="news-content">
              <ion-card-header>
                <ion-card-subtitle>{news.source?.name}</ion-card-subtitle>
                <ion-card-title>{news.title}</ion-card-title>
              </ion-card-header>
              <ion-card-content>{news.description}</ion-card-content>
              <ion-card-content value={news.content}></ion-card-content>
            </div>
          </ion-card>
        );
      })}
    </div>
  );
}

// author: "Matt Simon"
// content: "When last springs lockdown quieted the Penn State campus and surrounding town of State College, a jury-rigged instrument was listening. A team of researchers from the university had tapped into an un… [+3564 chars]"
// description: "Vibrations from cars and pedestrians create unique signals in cables. Now scientists have used the trick to show how Covid-19 brought life to a halt."
// publishedAt: "2021-06-28T16:00:00Z"
// source: {id: 'wired', name: 'Wired'}
// title: "How Underground Fiber Optics Spy on Humans Moving Above"
// url: "https://www.wired.com/story/how-underground-fiber-optics-spy-on-humans-moving-above/"
// urlToImage: "https://media.wired.com/photos/60d5f9a6a069f13cc7c034c4/191:100/w_1280,c_limit/science_fiberoptic_541379892.jpg"
