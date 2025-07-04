import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

const CounterUp = () => {
  const ref = useRef(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect(); // Trigger once
        }
      },
      { threshold: 0.3 } // Adjust as needed
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {startCount && <CountUp end={1234} duration={2} />}
    </div>
  );
};

export default CounterUp;
