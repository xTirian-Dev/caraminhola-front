import { useState } from 'react';

const MobileAccessBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
    <img src="https://pbs.twimg.com/media/E1yC4KNWUAAd6uT.jpg" alt="dog" width={450} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%'}} />
      {isVisible && (
        <div
          style={{
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px',
            textAlign: 'center',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          Acesse esta página pelo celular para uma melhor experiência!
          <button onClick={handleClose} style={{ marginLeft: '10px' }}>
            Fechar
          </button>
        </div>
      )}
    </>
  );
};

export default MobileAccessBanner;
