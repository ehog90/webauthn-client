import {
  faEye,
  faFaceSmile,
  faFingerprint,
  faMobile,
  faQrcode,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, useEffect, useState } from 'react';

interface IAnimatedLogoProps {
  className?: string;
}
const icons = [faQrcode, faFingerprint, faEye, faFaceSmile, faMobile];

const AnimatedLogo: FunctionComponent<IAnimatedLogoProps> = ({ className }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayedIconIndex((index) => (index + 1) % icons.length);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const [displayedIconIndex, setDisplayedIconIndex] = useState(0);

  return (
    <div className={className}>
      <FontAwesomeIcon icon={icons[displayedIconIndex]}></FontAwesomeIcon>
    </div>
  );
};

export default AnimatedLogo;
