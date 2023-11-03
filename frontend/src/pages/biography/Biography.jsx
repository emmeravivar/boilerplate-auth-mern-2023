import React from 'react'
import './../../styles/main.scss'

const Biography = () => {


  return (
    <div className='container'>
      <div className='secction-first'>
        <div className='bio-introducction'>
          <div className='bio-photo'>
            <img src="https://picsum.photos/id/64/200/200" />
          </div>
          <div className='bio-artist'>
            <div className='bio-artist-name'>
              <span>Artist Name</span>
            </div>
            <div className='bio-artist-type'>
              <span>Artist Type</span>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className='secction-middle'>
        <div className='bio-menu'>
          <ul>
            <li>Biography</li>
            <li>Projects</li>
            <li>Works</li>
            <li>Collaborations</li>    
          </ul>
        </div>
      </div>
      <div className='secction-middle'>
        <div className='bio-about'>
          <h6>KNOW ME</h6>
          <div className='bio-about-list'>
            <div className='bio-about-list-item'>
              <span>Name:</span>Lore ipsum
            </div>
            <div className='bio-about-list-item'>
              <span>Artist:</span>Lore ipsum
            </div>
            <div className='bio-about-list-item'>
              <span>Country:</span>Lore ipsum
            </div>
            <div className='bio-about-list-item'>
              <span>Born:</span>Lore ipsum
            </div>
            <div className='bio-about-list-item'>
              <span>Web:</span>Lore ipsum
            </div>
          </div>
          <div className='bio-about-rrss'>
            <div className='bio-about-rrss-item'>
              <span>Icono Facebook</span>
            </div>
            <div className='bio-about-rrss-item'>
              <span>Icono Facebook</span>
            </div>
            <div className='bio-about-rrss-item'>
              <span>Icono Facebook</span>
            </div>
            <div className='bio-about-rrss-item'>
              <span>Icono Facebook</span>
            </div>
            <div className='bio-about-rrss-item'>
              <span>Icono Facebook</span>
            </div>
            <div className='bio-about-rrss-item'>
              <span>Icono Facebook</span>
            </div>
          </div>
        </div>
      </div>
      <div className='secction-middle'>
        <div className='bio-live-and-carrer'>
          <div className='bio-live-and-carrer-gallery'>
            Gallery image (Component)
          </div>
          <div className='bio-live-and-carrer-text'>
            <h5>Live And Carrer</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend enim elit, eget ullamcorper purus sagittis quis. Donec pulvinar lacus eget justo fermentum, at venenatis ligula elementum. Praesent eget dolor massa. Nullam diam elit, ultricies ut elementum et, scelerisque et mi. Aliquam pretium orci et orci tempor tempus. Ut et arcu diam. Morbi vitae nunc et libero vulputate mollis ac non lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</p>
            <div className='bio-live-and-carrer-link'>
              Reade More
            </div>
          </div>
          publicaciones totales
        </div>
      </div>
      <div className='secction-middle'>
        <div className='bio-projects'>
          Projects
        </div>
      </div>
      <div className='secction-middle'>
        <div className='bio-works'>
          Trabajos (links externos)
        </div>
      </div>
      <div className='secction-finally'>
        <div className='bio-introducction'>
          Collaborations
        </div>
      </div>
    </div>
  )
}

export default Biography