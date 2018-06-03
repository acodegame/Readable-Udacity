import React from 'react';

const LineSeperator = props => {
  const styles = {
    line: {
      marginTop: '8px',
      marginBottom: '6px',
      borderBottom: '1px solid #c8cbd0',
    },
  }
  return (
    <div style={styles.line} />
  );
}

export default LineSeperator;
