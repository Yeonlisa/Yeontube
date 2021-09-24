import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'end',
            justifyContent: 'center', fontSize:'1rem', marginRight: '10px'
        }}>
            <p> Happy Coding  <Icon type="smile" /></p>
        </div>
    )
}

export default Footer
