import React, { Component } from "react";
import PropTypes from "prop-types";

import Portal from "./portal/Portal";
import Icon from "../icon/Icon";
import Button from "../button/Button";

import "./Modal.css";

const DATA_PATH = "http://www.omdbapi.com/?apikey=4b601aab&";
const ID_PARAM = "i=";

class Modal extends Component {
  state = {
    result: {},
    id: this.props.id
  };

  fetchDescribe = id => {
    fetch(`${DATA_PATH}${ID_PARAM}${id}`)
      .then(res => res.json())
      .then(desctibe => this.setData(desctibe))
      .then(desctibe => console.log(desctibe))
      .catch(error => error);
  };
  render() {
    let { result } = this.state;
    console.log(result);
    let { isOpen, onCancel } = this.props;
    let {
      Title,
      Director,
      Actors,
      Released,
      BoxOffice,
      Country,
      Genre,
      Runtime,
      Plot,
      imdbRating,
      imdbVotes,
      Year,
      Poster
    } = this.props.describe;

    console.log(
      Director,
      Actors,
      Released,
      BoxOffice,
      Country,
      Genre,
      Runtime,
      Plot,
      imdbRating,
      imdbVotes,
      Year,
      Poster
    );
    return (
      <>
        {isOpen && (
          <Portal>
            <div className="modalOverlay">
              <div className="modalWindow">
                <div className="modalHeader">
                  <div className="modalTitle">{Title}</div>
                  <Icon name="times" onClick={onCancel} />
                </div>
                <div className="modalBody">
                  <ul className="description">
                    <li>Director: {Director}</li>
                    <li>Actors: {Actors}</li>
                    <li>Released: {Released}</li>
                    <li>BoxOffice: {BoxOffice}</li>
                    <li>Country: {Country}</li>
                    <li>Genre: {Genre}</li>
                    <li>Runtime: {Runtime}</li>
                    <li>Plot: {Plot}</li>
                    <li>imdbRating/imdbVotes: {imdbRating}/{imdbVotes}</li>
                    <li>Year: {Year}</li>
                  </ul>
                    <img src={Poster} alt={Title} />
                </div>
                <div className="modalFooter">
                  <Button onClick={onCancel}>Close</Button>
                </div>
              </div>
            </div>
          </Portal>
        )}
      </>
    );
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func
};

Modal.defaultProps = {
  title: "Modal title",
  isOpen: false,
  onCancel: () => {}
};

export default Modal;
