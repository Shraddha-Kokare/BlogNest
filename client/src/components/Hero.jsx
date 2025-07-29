import React from 'react';
import heroImg from '../images/hero.gif'

const Hero = () => {
  return (
    <div
      className='hero flex items-center justify-between mx-8 px-[100px]'
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div className='left w-[50%] '>
        <h3 className="text-white text-4xl">Unlock the Secrets to <span className='sp-text'>Masterful </span>Programming Here</h3>
        <div className='flext m-6 items-center gap-[15px]'>
          <button className='btnNormal'>Get Started</button>
          <button className='btnWhite'>Learn More</button>
        </div>
      </div>
      <div className='right text-white w=[50%] text-2xl'>
        <img src={heroImg} alt="" />
      </div>
    </div>
  );
};

export default Hero;
