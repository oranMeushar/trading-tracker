import React, { useState } from 'react';
import { Container, Title } from './AccCard.style';
import AccChart from '../../charts/comulativeChart/cumulative_chart_big';
import Modal from '../../modal/Modal';

const AccCard = ({children, clickable, t1, v1, t2, v2, sign='$'}) => {

    const [isModal, setIsModal] = useState(false);
    
    return (
        <Container onClick={() => setIsModal(!isModal)}>
            <Title>
                <p>{t1}</p>
                <span>{v1}</span>
                {
                    t2 && 
                    <Title className='second_title'>
                        <p>{t2}.</p>
                        <span>{v2}</span>
                    </Title>
                }
            </Title>
            {/* {children[0]} */}
            {React.cloneElement(children[0],{...children.props})}
            {   (isModal && clickable) && 
                <Modal setIsModal={setIsModal} width='85%'> 
                    {React.cloneElement(children[1],{...children.props})}
                </Modal>
            }
        </Container>
    );
};

export default AccCard;