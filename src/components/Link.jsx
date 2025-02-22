import React from 'react';
import { navigate } from 'vike/client/router';

const Link = ({ to, children, ...props }) => {
//   const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default Link;
