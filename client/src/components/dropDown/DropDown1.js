import React, { useState, useEffect } from 'react';
import { Container, ItemContainer, ContentContainer, SearchAndToggle, Buttons, Button, Items, Item, ItemLabel, StyledSelect } from './DropDown1.style';
import Select from 'react-dropdown-select';
import {AnimatePresence, motion} from 'framer-motion';

const DropDown = ({list, labelField, valueField, searchable, multi, clearable, separator, searchBy, placeholder, dropdownRenderer, contentRenderer, itemRenderer, onSelect, height, className}) => {
    const [values, setValues] = useState('');
    const [isClicked, setIsClicked] = useState(false);

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        multi ? setValues(list) : setValues([list[0]]);
      }, [list]);

    useEffect(() => {
       onSelect(values);
    }, [values]);  

    const handleDropDownClosed = ({ close }) => {
        setIsClicked(true);
        sleep(300).then(() => {
            close();
            setIsClicked(false);
        });
    }

    const customItemRenderer = ({ item, itemIndex, props, state, methods }) =>(
        <ItemContainer onClick={() => methods.addItem(item)}>
            {/* <input type='checkbox' checked={methods.isSelected(item)} />{" "} */}
            {item.name}
        </ItemContainer>
    );

      const contentRendererFn = ({ props, state, methods }) => (
        <ContentContainer>
            {
                multi 
                ? <p>Selected {state.values.length} out of {props.options.length}</p>
                : <p>{values[0]?.name}</p>

            }
            {/* {state.values.length} Items Selected */}
            {/* <input
                type="text"
                value={state.search}
                onChange={methods.setSearch}
                placeholder='Search anything'
            /> */}
        </ContentContainer>
      )

      const dropdownRendererFn = ({ props, state, methods }) => {
        const regexp = new RegExp(state.search, "i");
        return (
            <div>
            <SearchAndToggle color={'blue'}>
                <Buttons>
                    <div>Search and select:</div>
                {
                    methods.areAllSelected() 
                    ? (<Button className="clear" onClick={methods.clearAll}>Clear all</Button>) 
                    : (<Button onClick={methods.selectAll}>Select all</Button>)
                }
                </Buttons>
                <input type="text" value={state.search} onChange={methods.setSearch} placeholder="Type anything"/>
            </SearchAndToggle>
            <Items>
                {
                props.options
                .filter(item =>regexp.test(item[props.searchBy] || item[props.labelField]))
                .map(option => {
                    // if (!this.state.keepSelectedInList && methods.isSelected(option)) return null;
                    return(
                        <Item
                            disabled={option.disabled}
                            key={option[props.valueField]}
                            onClick={option.disabled ? null : () => methods.addItem(option)}
                        >
                        <input
                            type="checkbox"
                            onChange={() => methods.addItem(option)}
                            // checked={state.values.indexOf(option) !== -1}
                            checked={methods.isSelected(option)}
                        />
                        <ItemLabel>{option[props.labelField]}</ItemLabel>
                        </Item>
                    );
                })}
            </Items>
            </div>
        );
    };

    return (
        <Container>
            {/* <Select 
                options={list} 
                labelField={labelField}
                valueField={valueField} 
                onChange={(values) => setValues(values)} 
                values={values}
                searchable={searchable}
                style={{width:'35vmin'}}
                multi={multi}
                dropdownGap={2}
                clearable={clearable}
                className='custom-select'
                separator={separator}
                searchBy={searchBy}
                placeholder={placeholder}
                itemRenderer={itemRenderer && customItemRenderer}
                contentRenderer={contentRenderer && contentRendererFn}
                dropdownRenderer={dropdownRenderer && dropdownRendererFn}
            /> */}

        <StyledSelect
            onDropdownCloseRequest={handleDropDownClosed}
            isOpen={isClicked}
            height={height}
            options={list} 
            labelField={labelField}
            valueField={valueField} 
            onChange={(values) => setValues(values)} 
            values={values}
            searchable={searchable}
            style={{width:'35vmin'}}
            multi={multi}
            dropdownGap={2}
            clearable={clearable}
            className={className || 'custom-select'}
            separator={separator}
            searchBy={searchBy}
            placeholder={placeholder}
            itemRenderer={itemRenderer && customItemRenderer}
            contentRenderer={contentRenderer && contentRendererFn}
            dropdownRenderer={dropdownRenderer && dropdownRendererFn}
      />
        </Container>
    );
};

export default DropDown;