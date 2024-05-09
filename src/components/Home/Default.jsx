import React from 'react'
import bgImage from '../../../public/assets/bgImage.svg'
import lock from '../../../public/assets/lock.svg'
import './styles/Default.css'

function Default() {
    return (
        <div className='main'>
            <div className='bg-section'>
                <img src={bgImage} className='bgImage' alt="bg" />
                <h3 style={{ textAlign: 'center', fontSize: '30px' }}>Pocket Notes</h3><br />
                <p style={{ textAlign: 'center', fontSize: 'medium' }}>Send and receive messages without keeping your phone online.<br />Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
            </div>


            <div className='encryption'>
                <img src={lock} alt='Lock' />
                <p>end-to-end encrypted</p>
            </div>
        </div>
    )
}

export default Default