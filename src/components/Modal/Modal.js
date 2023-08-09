import { useEffect } from 'react';

import './Modal.scss';

function Modal({ footer = '', children }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="modalContainer">
      <div className="popup">{children}</div>
      {footer && footer}
    </div>
  );
}
export default Modal;
