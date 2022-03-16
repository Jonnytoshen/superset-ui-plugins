import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';
import OlStyle, { Options } from 'ol/style/Style';
import { VectorLayerContext } from '../layers/VectorLayer';

export const StyleContext = createContext<{ style?: OlStyle }>({});

const Style = ({
  children,
  geometry,
  fill,
  image,
  renderer,
  hitDetectionRenderer,
  stroke,
  text,
  zIndex,
}: PropsWithChildren<Options>) => {
  const { vectorLayer } = useContext(VectorLayerContext);
  const [style, setStyle] = useState<OlStyle>();
  const host = vectorLayer;

  useEffect(() => {
    const instance = new OlStyle({
      geometry,
      fill,
      image,
      renderer,
      hitDetectionRenderer,
      stroke,
      text,
      zIndex,
    });

    setStyle(instance);

    if (host) {
      host.setStyle(instance);
    }

    return () => {
      if (host) {
        host.setStyle(null);
      }
    };
  }, [host]);

  useEffect(() => {
    if (style) style.setFill(fill as any);
  }, [fill]);

  useEffect(() => {
    if (style) style.setGeometry(geometry as any);
  }, [geometry]);

  useEffect(() => {
    if (style) style.setHitDetectionRenderer(hitDetectionRenderer as any);
  }, [hitDetectionRenderer]);

  useEffect(() => {
    if (style) style.setImage(image as any);
  }, [image]);

  useEffect(() => {
    if (style) style.setRenderer(renderer as any);
  }, [renderer]);

  useEffect(() => {
    if (style) style.setStroke(stroke as any);
  }, [stroke]);

  useEffect(() => {
    if (style) style.setText(text as any);
  }, [text]);

  useEffect(() => {
    if (style) style.setZIndex(zIndex);
  }, [zIndex]);

  return (
    <StyleContext.Provider value={{ style }}>{children}</StyleContext.Provider>
  );
};

export default Style;
