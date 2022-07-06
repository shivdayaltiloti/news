import React, { Component } from 'react'

export default class Newsitem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="card">
        <div style={{ display:'flex' ,  justifyContent : 'flex-end' , position : 'absolute' , right : '0'}}>
          <span className="badge rounded-pill bg-danger">
           Source :  {source}
            <span className="visually-hidden">unread messages</span>
          </span>
        </div>
        <img src={imageUrl} className="card-img-top" height='180' alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title} ...

          </h5>
          <p className="card-text">{description} ...</p>
          <p className='card=text'><small className='text-muted'>By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} className="btn btn-primary" target='_blank'>Read More </a>
        </div>
      </div>
    )
  }
}
