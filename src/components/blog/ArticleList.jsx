import React from 'react';
import { Link } from 'react-router';
import truncate from 'lodash/truncate';
// eslint-disable-next-line
import { config } from 'config';

import './ArticleList.scss';

const getArticleItem = (page) => {
  const path = page.get('path');
  const data = page.get('data');
  const title = data.get('title');
  const date = data.get('date');
  const body = data.get('body');

  return (
    <div className="article-list-item" key={path}>
      <h3><Link to={path}>{title}</Link></h3>
      <p className="post-author-date ms-fontSize-s">{`Posted by ${config.author} on ${date}`}</p>
      <div className="post-body">
        {
          truncate(body.replace(/<[^>]*>/g, ''), {
            length: 120, omission: ' ...', separator: /,? +/
          })
        }
      </div>
    </div>
  );
};

export default class ArticleList extends React.Component {

  render() {
    const { pages } = this.props;

    return (
      <div className="article-list">
        {
          pages.map(page => getArticleItem(page))
        }
      </div>
    );
  }
}
