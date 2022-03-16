import BaseEvent from 'ol/events/Event';
import { ObjectEvent } from 'ol/Object';
import { TileSourceEvent } from 'ol/source/Tile';
import XYZ, { Options } from 'ol/source/XYZ';
import { useContext, useEffect, useState } from 'react';
import { bindEventsFromProps } from '../core/utils';
import { TileLayerContext } from '../layers/TileLayer';

const events = [
  'change',
  'error',
  'propertychange',
  'tileloadend',
  'tileloaderror',
  'tileloadstart',
];

export interface XYZSourceProps extends Options {
  onChange?: (event: BaseEvent) => void;
  onError?: (event: BaseEvent) => void;
  onPropertychange?: (event: ObjectEvent) => void;
  onTileloadend?: (event: TileSourceEvent) => void;
  onTileloaderror?: (event: TileSourceEvent) => void;
  onTileloadstart?: (event: TileSourceEvent) => void;
}

const XYZSource = ({
  attributions,
  attributionsCollapsible,
  cacheSize,
  crossOrigin,
  imageSmoothing,
  interpolate,
  opaque,
  projection,
  reprojectionErrorThreshold,
  maxZoom,
  minZoom,
  maxResolution,
  tileGrid,
  tileLoadFunction,
  tilePixelRatio,
  tileSize,
  tileUrlFunction,
  url,
  urls,
  wrapX,
  transition,
  zDirection,
  ...props
}: XYZSourceProps) => {
  const { tileLayer } = useContext(TileLayerContext);
  const [source, setSource] = useState<XYZ>();

  useEffect(() => {
    const instance = new XYZ({
      attributions,
      attributionsCollapsible,
      cacheSize,
      crossOrigin,
      imageSmoothing,
      interpolate,
      opaque,
      projection,
      reprojectionErrorThreshold,
      maxZoom,
      minZoom,
      maxResolution,
      tileGrid,
      tileLoadFunction,
      tilePixelRatio,
      tileSize,
      tileUrlFunction,
      url,
      urls,
      wrapX,
      transition,
      zDirection,
    });

    bindEventsFromProps(instance, events, props);

    setSource(instance);

    if (tileLayer) {
      tileLayer.setSource(instance);
    }

    return () => {
      if (tileLayer) {
        tileLayer.setSource(null);
      }
    };
  }, [tileLayer]);

  useEffect(() => {
    if (source) {
      source.setAttributions(attributions);
    }
  }, [attributions]);

  useEffect(() => {
    if (source && tileLoadFunction) {
      source.setTileLoadFunction(tileLoadFunction);
    }
  }, [tileLoadFunction]);

  useEffect(() => {
    if (source && url) {
      source.setUrl(url);
      source.refresh();
    }
  }, [url]);

  useEffect(() => {
    if (source && urls) {
      source.setUrls(urls);
      source.refresh();
    }
  }, [urls]);

  return null;
};

export default XYZSource;
