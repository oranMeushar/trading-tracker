import React, { useState, useEffect } from 'react';
import { Container, DownArrow, UpArrow, List } from './DropDown.style';
import OutsideClickHandler from 'react-outside-click-handler';
const DropDown = ({list, onchange}) => {
    const [selectedItem, setSelectedItem] = useState('');
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        onchange(list[0])
        setSelectedItem(list[0]);
    }, []);

    return (
        <OutsideClickHandler onOutsideClick={()=>setIsClicked(false)}>
        <Container onClick={() => setIsClicked(!isClicked)}>
            <p>{selectedItem}</p>
            {isClicked ? <DownArrow/> : <UpArrow/>}
            {isClicked &&
                <List>
                    {list.map((item, index) => <p key={index} onClick={() => {onchange(item);setSelectedItem(item)}}>{item}</p>)}
                </List>
            }
        </Container>
        </OutsideClickHandler>
    );
};

export default DropDown;