import React from 'react';
import Spline from '@splinetool/react-spline';

type SplineModelProps = {
  sceneUrl?: string;
  className?: string;
  style?: React.CSSProperties;
};

const SplineModel: React.FC<SplineModelProps> = ({ 
  sceneUrl = "https://prod.spline.design/3xZS7hcjoGJ2anpH/scene.splinecode",
  className,
  style
}) => {
  return (
    <div className={className} style={style}>
      <Spline scene={sceneUrl} />
    </div>
  );
};

export default SplineModel; 