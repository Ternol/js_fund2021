import React from 'react';
import cl from './mymodal.module.css'
const MyModal = ({children, visible, setVisible}) => {
    const rootClasses = [cl.myModal];
    if (visible) {
        rootClasses.push(cl.active)
    }
    return (
        <div className={rootClasses.join(' ')} onClick={()=> setVisible(false)}>
            <div className={cl.myModalContent} onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;