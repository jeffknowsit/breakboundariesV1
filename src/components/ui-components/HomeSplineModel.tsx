import React from 'react';
import SplineModel from './SplineModel';

const HomeSplineModel: React.FC = () => {
  return (
    <SplineModel 
      sceneUrl="https://prod.spline.design/3xZS7hcjoGJ2anpH/scene.splinecode"
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0
      }}
    />
  );
};

export default HomeSplineModel; 