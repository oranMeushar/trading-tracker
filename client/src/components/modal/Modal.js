import React from 'react';
import {ModalContainer, ModalChildren} from './Modal.style';
import {AnimatePresence, motion} from 'framer-motion';

const Modal = ({children, setIsModal, width}) => {

    const handleModalClicked = () =>{
        setIsModal(false); 
    }

    return (
        <AnimatePresence>
            <ModalContainer 
                as={motion.div} 
                initial={{opacity: 0}}
                animate={{opacity: 1, backgroundColor: 'rgba(39, 49, 58, 0.5)'}} 
                transition={{duration: 0.3}}
                onClick={handleModalClicked}
                >
            <ModalChildren 
                width={width}
                as={motion.div}
                initial={{y: -100, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.3, delay: 0.2}}
                onClick={(e) => e.stopPropagation()}
            >
            {children}
            </ModalChildren>
        </ModalContainer>
        </AnimatePresence>
    );
};

export default Modal;



