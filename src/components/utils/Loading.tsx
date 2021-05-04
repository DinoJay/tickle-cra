import React, {useState, useEffect} from 'react';
// @ts-ignore
import FpsCtrl from './fpsCtrl';

/**
 * @constructor
 * @this Test
 */
const Loading: React.FC<{
  style?: React.CSSProperties;
  className?: string;
}> = props => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const fp: any = new FpsCtrl(2, () => {
      setStep(st => (st + 1) % 3);
    });
    fp.start();

    return () => fp.pause();
  }, []);

  const arr = new Array(step).fill('a');
  return (
    <div {...props}>
      <h1 className="w-64 flex">
        <div>Loading</div>
        <span>
          {arr.map(() => (
            <span>.</span>
          ))}
        </span>
      </h1>
    </div>
  );
};

export default Loading;
