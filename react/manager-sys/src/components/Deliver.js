import React from 'react';
import PropTypes from 'prop-types';

function Deliver ({
                    size,
                    vertical = false
                  }) {
  const style = {opacity: 0};
  if (vertical) {
    style.display = 'block';
    style.height = size + 'px';
  } else {
    style.display = 'inline-block';
    style.width = size + 'px';
  }

  return <div style={style}/>;
}

Deliver.propTypes = {
  size: PropTypes.number.isRequired,
  vertical: PropTypes.bool
};

export default Deliver;
