import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoffee } from "@fortawesome/free-solid-svg-icons"

export default function Home()
{
	return (
    <div className="partsGrid">
      <aside className="aside">
        <h2>
          <span>RECENT ARTICLES</span>
        </h2>
        <div className="grid12 postBlock">
          <article className="post">
            <figure className="eyecatch">
              <a href="#">
                <img src="/image/test.jpg" alt="" />
              </a>
            </figure>
            <div className="text">
              <h3>
                <a href="#">タイトルがここに入ります。タイトルがここに...</a>
              </h3>
              <div className="subText">
                <time dateTime="2020-11-11">
                  <FontAwesomeIcon icon={faCoffee} />
                  <span> 2020.11.10</span>
                </time>
                <a href="#" className="category">
                  <i className="fas fa-folder-open" />
                  <span>カテゴリー</span>
                </a>
              </div>
            </div>
          </article>
          <article className="post">
            <figure className="eyecatch">
              <a href="#">
                <img src="/image/test.jpg" alt="" />
              </a>
            </figure>
            <div className="text">
              <h3>
                <a href="#">タイトルがここに入ります。タイトルがここに...</a>
              </h3>
              <div className="subText">
                <time dateTime="2020-11-11">
                  <i className="fas fa-clock" />
                  <span> 2020.11.10</span>
                </time>
                <a href="#" className="category">
                  <i className="fas fa-folder-open" />
                  <span>カテゴリー</span>
                </a>
              </div>
            </div>
          </article>
          <article className="post">
            <figure className="eyecatch">
              <a href="#">
                <img src="/image/test.jpg" alt="" />
              </a>
            </figure>
            <div className="text">
              <h3>
                <a href="#">タイトルがここに入ります。タイトルがここに...</a>
              </h3>
              <div className="subText">
                <time dateTime="2020-11-11">
                  <i className="fas fa-clock" />
                  <span> 2020.11.10</span>
                </time>
                <a href="#" className="category">
                  <i className="fas fa-folder-open" />
                  <span>カテゴリー</span>
                </a>
              </div>
            </div>
          </article>
          <article className="post">
            <figure className="eyecatch">
              <a href="#">
                <img src="/image/test.jpg" alt="" />
              </a>
            </figure>
            <div className="text">
              <h3>
                <a href="#">タイトルがここに入ります。タイトルがここに...</a>
              </h3>
              <div className="subText">
                <time dateTime="2020-11-11">
                  <i className="fas fa-clock" />
                  <span> 2020.11.10</span>
                </time>
                <a href="#" className="category">
                  <i className="fas fa-folder-open" />
                  <span>カテゴリー</span>
                </a>
              </div>
            </div>
          </article>
          <div className="pagination">
            <a href="#">
              <span>SEE MORE</span>
              <i className="fas fa-chevron-right" />
            </a>
          </div>
        </div>
      </aside>
    </div>
  )
}