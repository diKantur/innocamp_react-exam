import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Image.css';

const Image = ({
  src, alt, className, width, height, circle, grey, ...attrs
}) => {
  const classes = classNames(
    className,
    { circle },
    { grey },
  );

  if (!src) {
    src = `https://via.placeholder.com/${width}x${height}`;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={classes}
      width={width}
      height={height}
      {...attrs}
    />
  );
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  circle: PropTypes.bool,
  grey: PropTypes.bool,
  className: PropTypes.string,
};

Image.defaultProps = {
  src: '',
  alt: 'image',
  width: 150,
  height: 200,
  circle: false,
  grey: false,
  className: '',
};

export default Image;
