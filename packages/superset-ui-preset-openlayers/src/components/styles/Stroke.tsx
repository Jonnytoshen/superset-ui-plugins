import { useContext, useEffect, useState } from 'react';
import OlStroke, { Options } from 'ol/style/Stroke';
import { StyleContext } from './Style';

const StrokeStyle = ({
  color,
  lineCap,
  lineDash,
  lineDashOffset,
  lineJoin,
  miterLimit,
  width,
}: Options) => {
  const [stroke, setStroke] = useState<OlStroke>();
  const { style } = useContext(StyleContext);
  const host = style;

  useEffect(() => {
    const instance = new OlStroke({
      color,
      lineCap,
      lineDash,
      lineDashOffset,
      lineJoin,
      miterLimit,
      width,
    });

    setStroke(instance);

    if (host) {
      host.setStroke(instance);
    }

    return () => {
      if (host) {
        host.setStroke(null as any);
      }
    };
  }, [host]);

  useEffect(() => {
    if (stroke) stroke.setColor(color as any);
  }, [color]);

  useEffect(() => {
    if (stroke) stroke.setLineCap(lineCap);
  }, [lineCap]);

  useEffect(() => {
    if (stroke) stroke.setLineJoin(lineJoin);
  }, [lineJoin]);

  useEffect(() => {
    if (stroke) stroke.setLineDash(lineDash as any);
  }, [lineDash]);

  useEffect(() => {
    if (stroke) stroke.setLineDashOffset(lineDashOffset);
  }, [lineDashOffset]);

  useEffect(() => {
    if (stroke) stroke.setMiterLimit(miterLimit);
  }, [miterLimit]);

  useEffect(() => {
    if (stroke) stroke.setWidth(width);
  }, [width]);

  return null;
};

export default StrokeStyle;
