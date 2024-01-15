import React, { Children } from "react";
import { CloseOutlined } from '@ant-design/icons'
export const Popup = ({ text, closePopup, children }: any) => {

    const popupContainer: React.CSSProperties = {
        position: 'fixed',
        width: '100%',
        height: '100',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex:1000
    }
    const popupBody: React.CSSProperties = {
        position: 'absolute',
        left: '30%',
        right: '30%',
        bottom: '20%',
        top: '30%',
        textAlign: 'center',
        margin: 'auto',
        borderRadius: '15px',
        borderColor: 'black',
        background: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
    }

    return (
        <div style={popupContainer}>
            <div style={popupBody}>
                <div style={{display:'flex',justifyContent:'right'}}>
                    <button style={{backgroundColor:'white',borderRadius:'0 0 0 1em',padding:'0.5em'}} onClick={closePopup}>Close <CloseOutlined /></button>
                </div>
                {children}
            </div>
        </div>
    );
};