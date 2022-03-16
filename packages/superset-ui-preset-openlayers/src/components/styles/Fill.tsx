import { useEffect, useContext, useState } from 'react';
import OlFill, { Options } from 'ol/style/Fill';
import { StyleContext } from './Style';

const FillStyle = ({ color }: Options) => {
  const { style } = useContext(StyleContext);
  const [fill, setFill] = useState<OlFill>();
  const host = style;

  useEffect(() => {
    const instance = new OlFill({ color });

    setFill(instance);

    if (host) {
      host.setFill(instance);
    }

    return () => {
      if (host) {
        host.setFill(null as any);
      }
    };
  }, [host]);

  useEffect(() => {
    if (fill) fill.setColor(color as any);
  }, [color]);

  return null;
};

export default FillStyle;
