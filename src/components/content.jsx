import React, { Component } from 'react';
import Modal from './modal/Modal';
import Item from './item/item';
import Input from './searchInput/searchInput';

import './content.css'

const DATA_PATH = 'http://www.omdbapi.com/?apikey=4b601aab&';
const ID_PARAM = 'i=';
const TITLE_PARAM = 's=';
const YEAR_PARAM = 'y=';
const PAGE_PARAM = 'page=';

class Content extends Component {
    state = {
        searchQuery: '',
        searchYear: '',
        result: {},
        isOpen: false,
        id: '',
    }

    componentDidMount() {
        const { searchQuery, searchYear } = this.state;
        this.fetchData(searchQuery, searchYear);
    }

    fetchData = (searchQuery, searchYear) => {
        fetch(`${DATA_PATH}${TITLE_PARAM}${searchQuery}&${YEAR_PARAM}${searchYear}`)
            .then(res => res.json())
            .then(result => this.setData(result))
            .catch(error => error);
    }

    handleInputChange = ({ target: { value } }) => {
        this.setState({
            searchQuery: value
        })
    }

    handleYearChange = ({ target: { value } }) => {
        this.setState({
            searchYear: value
        })
    }

    getSearch = ({ key }) => {
        if (key === 'Enter') {
            const { searchQuery, searchYear } = this.state;
            this.fetchData(searchQuery, searchYear);
        }
    }

    setData = result => {
        this.setState({ result });
    }

    openModal = (imdbID) => {
        this.setState({ isOpen: true, id: imdbID })
    }

    handleCancel = () => {
        console.log('Cancel function!');
        this.setState({ isOpen: false });
    }

    render() {
        const { searchQuery, searchYear, result, id } = this.state;
        const { Search = [] } = result

        console.log(result);
        console.log(id);

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
                            <>
                                <Item
                                    key={imdbID}
                                    title={Title}
                                    year={Year}
                                    posterUrl={(Poster === 'N/A') ? '' : Poster}
                                    onClick={()=>this.openModal(imdbID)}
                                />
                            </>
                        )
                    }
                    )}
                </ul>
                <Modal
                    title=""
                    isOpen={this.state.isOpen}
                    onCancel={this.handleCancel}
                    details={this.state.id}
                />
            </>
        );
    }
}

export default Content;