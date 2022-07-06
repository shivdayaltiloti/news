import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    static defaultProps = {
      country : 'in',
      pageSize : 3,
      category : 'sports'
    }

    static propsTypes = {
      country  : PropTypes.string,
      pageSize : PropTypes.number,
      category : PropTypes.string,
    }
  
  
  
    capitalizeFirstLatter = (string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
   

    constructor(props){
  super(props);
  this.state = {
    articles :  [],
    loading : true,
    page :1,
    totalResults:0
  }
  document.title = `${this.capitalizeFirstLatter(this.props.category)} - NewsMonkey`;
}

 

async updateNews(){
  this.props.setProgress(10);
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${ this.state.page}&apiKey=889d171e83ed4dee977dab80efcfbbf3&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  this.props.setProgress(30);
  let parsedData = await data.json();
  this.props.setProgress(50);
  console.log(parsedData);
  this.props.setProgress(70);
  this.setState({articles : parsedData.articles , totalResults : parsedData.totalResults , loading:false})
  this.props.setProgress(100);
}


    async componentDidMount(){
       this.updateNews();
    }
     handlePrevClick = async() =>{
          this.setState({page:this.state.page-1});
          this.updateNews();

    }

    handleNextClick = async() =>{
        this.setState({ page :  this.state.page + 1 });
        this.updateNews();

    }

    fetchMoreData = async() => {
        this.setState({page : this.state.page + 1});
       
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${ this.state.page}&apiKey=889d171e83ed4dee977dab80efcfbbf3&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.setState({loading:true});
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles :  this.state.articles.concat(parsedData.articles) ,
           totalResults : parsedData.totalResults ,
            loading:false})



    };



  render() {
    return (
          <>
          <h2 align='center'> NewsMonkey - Top {this.capitalizeFirstLatter(this.props.category)}  Headlines</h2>
         
          <div className='text-center'>
           {this.state.loading && <Spinner/>}
          </div>
          
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={ <Spinner/> }
        >
             <div className='container'>
              <div className='row'>
            {this.state.articles.map((element)=>{
                return <div className='col-md-4 my-3' key={ element.url }>
                <NewsItem title={ element.title ? element.title.slice(0,40) : ''} description={ element.description ?  element.description.slice(0,88) : ''} imageUrl={element.urlToImage ? element.urlToImage :  'https://static.toiimg.com/thumb/msid-92303748,width-1070,height-580,imgsize-238857,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg'}
                 newsUrl={element.url } author={ element.author } date={ element.publishedAt } source = {element.source.name}/>
              </div>
            })}

            {/* <div className='container d-flex justify-content-between'>
            <button type='button' className='btn btn-dark' disabled={this.state.page>1 ? false : true} onClick={this.handlePrevClick}>&larr; Previous</button>
            <button type='button' className='btn btn-dark' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handleNextClick}>Next &rarr; </button>
            </div> */}
            </div>
            </div>
            </InfiniteScroll>
         </>
    )
  }
}
