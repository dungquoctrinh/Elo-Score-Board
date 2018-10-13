import React from 'react';

const getInitialsContainerStyles = size => {
  if (size === 'tiny') {
    return {
      width: '20px',
      height: '20px',
      borderRadius: '10px',
      border: '2px solid lightgrey',
      backgroundColor: '#262626',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '2px',
    }
  } else if (size === 'jumbo') {
    return {
      width: '96px',
      height: '96px',
      borderRadius: '48px',
      border: '5px solid lightgrey',
      backgroundColor: '#262626',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '5px',
    };
  } 

  return {
    width: '48px',
    height: '48px',
    borderRadius: '24px',
    border: '5px solid lightgrey',
    backgroundColor: '#262626',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5px',
  };
}
  
const getInitialsStyles = (initials, size) => {
  let fontSize;
  let letterSpacing;

  if (size === 'tiny') {
    letterSpacing = '0.5px';
    fontSize = '12px';
    if (initials.length === 2) {
      fontSize = '10px';
    } else if (initials.length === 3) {
      fontSize = '8px';
    } else if (initials.length >= 4) {
      fontSize = '6px';
    }
  } else if (size === 'jumbo') {
    letterSpacing = '2px';
    fontSize = '48px';
    if (initials.length === 2) {
      fontSize = '40px';
    } else if (initials.length === 3) {
      fontSize = '32px';
    } else if (initials.length >= 4) {
      fontSize = '24px';
    }
  } else {
    letterSpacing = '1px';
    fontSize = '24px';
    if (initials.length === 2) {
      fontSize = '20px';
    } else if (initials.length === 3) {
      fontSize = '16px';
    } else if (initials.length >= 4) {
      fontSize = '12px';
    }
  }

  return {
    color: 'white',
    fontFamily: `'Fjalla One', sansSerif`,
    fontSize: fontSize,
    letterSpacing: '1px',
  }
}

const getSize = (isTiny, isJumbo) => {
  if (isTiny) {
    return 'tiny';
  } else if (isJumbo) {
    return 'jumbo';
  } else {
    return 'normal';
  }
}

export const Avatar =  React.createClass( {

  render() {
    const isTiny = this.props.className && this.props.className.indexOf('img-tiny') !== -1;
    const isJumbo = this.props.className && this.props.className.indexOf('jumbo') !== -1;
    const size = getSize(isTiny, isJumbo);

    return this.props.src ?
      <img className={`img-circle img-thumbnail ${this.props.className} ${size}`} 
        src={ this.props.src }
        title={this.props.title}
        alt={this.props.alt}
      />
      :
      <div className="initials-circle" style={getInitialsContainerStyles(size)}>
        <div style={getInitialsStyles(this.props.initials, size)}>{this.props.initials}</div>
      </div>
  }

});
