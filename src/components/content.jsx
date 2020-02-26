import React, { Component } from 'react';
import Modal from './modal/Modal';
import Input from './searchInput/searchInput';

import './content.css'

const DATA_PATH = 'http://www.omdbapi.com/?apikey=4b601aab&';
const TITLE_PARAM = 's=';
const YEAR_PARAM = 'y=';
const PAGE_PARAM = 'page=';
const ID_PARAM = 'i=';

class Content extends Component {
    state = {
        searchQuery: '',
        searchYear: '',
        result: {},
        isOpen: false,
        id: '',
        describe: {},
        page: 1
    }

    componentDidMount() {
        const { searchQuery, searchYear } = this.state;
        this.fetchData(searchQuery, searchYear);
    }

    fetchData = (searchQuery, searchYear, page) => {
        fetch(`${DATA_PATH}${TITLE_PARAM}${searchQuery}&${YEAR_PARAM}${searchYear}&${PAGE_PARAM}${page}`)
            .then(res => res.json())
            .then(result => this.setData(result))
            .then(result => console.log(`${DATA_PATH}${TITLE_PARAM}${searchQuery}&${YEAR_PARAM}${searchYear}&${PAGE_PARAM}${page}`, result))
            .catch(error => error);
    }

    fetchDescribe = (id) => {
      fetch(`${DATA_PATH}${ID_PARAM}${id}`)
          .then(res => res.json())
          .then(describe => this.setDescribe(describe))
        //   .then(describe => console.log(`${DATA_PATH}${ID_PARAM}${id}`, describe))
          .catch(error => error);
    }

    handleInputChange = ({ target: { value } }) => {
        this.setState({
            searchQuery: value,
            page: 1 
        })
    }

    handleYearChange = ({ target: { value } }) => {
        this.setState({
            searchYear: value,
            page: 1 
        })
    }

    getSearch = ({ key }) => {
        if (key === 'Enter') {
            const { searchQuery, searchYear, page } = this.state;
            this.fetchData(searchQuery, searchYear, page);
        }
    }

    setData = result => {
        this.setState({ result });
    }
    setDescribe = describe => {
        this.setState({ describe });
    }

    openModal = (imdbID) => {
        this.setState({ isOpen: true})
        this.fetchDescribe(imdbID)
    }

    handleCancel = () => {
        console.log('Cancel function!');
        this.setState({ isOpen: false });
    }

    handlePageChange = ({target}) => {
        const btnType = target.getAttribute('data-name');
        let {page} = this.state;

        switch (btnType) {
            case 'prev':
                this.updatePage(page-1);
                break;
            case 'min2':
                this.updatePage(page-2);
                break;
            case 'min1':
                this.updatePage(page-1);
                break;
            case 'pls1':
                this.updatePage(page+1);
                break;
            case 'pls2':
                this.updatePage(page+2);
                break;
            case 'next':
                this.updatePage(page+1);
                break;
    
            default: 
                break;
        }
    }

    updatePage = number => {
        const {searchQuery, searchYear} = this.state;
        this.setState({
            page: number,
        }, ()=>{this.fetchData(searchQuery, searchYear, number);
        })
    }


    render() {
        const { searchQuery, searchYear, result, page } = this.state;
        const { Search = [], totalResults } = result
        const totalPage = Math.ceil(totalResults/10)
        
        console.log(result, 'result');
        // console.log(id, 'id');

        return (
            <>
                <header>
                    <Input
                        onKeyPress={this.getSearch}
                        onChange={this.handleInputChange}
                        value={searchQuery} />
                    <input
                        onKeyPress={this.getSearch}
                        type="number" name="year" id="year" min="1900" max='2100'
                        onChange={this.handleYearChange}
                        value={searchYear}
                    />
                </header>
                <ul className="dataList">
                    {Search.map(({ Title, Poster, Type, Year, imdbID }) => {
                        return (
                            <li className="item" onClick={()=>this.openModal(imdbID)} key={imdbID}>
                                <span className="title">{`title: ${Title}`}</span>
                                <span className="year">{`year: ${Year}`}</span>
                                <div>
                                    <a href={(Poster === 'N/A') ? '' : Poster} target='_blank' rel="noopener noreferrer">
                                        <img
                                            src={(Poster === 'N/A') ? `https://via.placeholder.com/150x200` : Poster}
                                            alt={Title}
                                        />
                                    </a>
                                </div>
                            </li>
                        )
                    }
                    )}
                </ul>
                <footer>
                {page!==1 && <button onClick={this.handlePageChange} data-name="prev">{'<<'}</button>} 
                {page>2 && <button onClick={this.handlePageChange} data-name="min2">{page-2}</button>} 
                {page>1 && <button onClick={this.handlePageChange} data-name="min1">{page-1}</button>} 
                <button onClick={this.handlePageChange} data-name="">{page}</button>
                {page<totalPage && <button onClick={this.handlePageChange} data-name="pls1">{page+1}</button>} 
                {page<totalPage-1 && <button onClick={this.handlePageChange} data-name="pls2">{page+2}</button>}
                {page!==totalPage && <button onClick={this.handlePageChange} data-name="next">{'>>'}</button>} 
                </footer>
                <Modal
                    isOpen={this.state.isOpen}
                    onCancel={this.handleCancel}
                    describe={this.state.describe}
                />
            </>
        );
    }
}

export default Content;