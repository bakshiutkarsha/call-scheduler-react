import React from 'react';
import headStyles from 'styles/header.scss';

const Header: React.FC = () => {
    return <div className={headStyles.head_cntr}>
          <div className={headStyles.title}>SCHEDULER</div>
          <div className={headStyles.description}>Stop using notepads, use call scheduler! </div>
    </div>
  };
  
  export default Header;