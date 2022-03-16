import React, {
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
  useContext,
} from 'react';
import { Options } from 'ol/layer/BaseVector';
import { ObjectEvent } from 'ol/Object';
import OlMap from 'ol/Map';
import OlGroupLayer from 'ol/layer/Group';
import BaseEvent from 'ol/events/Event';
import OlVectorLayer from 'ol/layer/Vector';
import RenderEvent from 'ol/render/Event';
import OlVectorSource from 'ol/source/Vector';

import { bindEventsFromProps } from '../core/utils';
import { MapContext } from '../Map';
import { GroupLayerContext } from './GroupLayer';

const events = [
  'change',
  'change:extent',
  'change:maxResolution',
  'change:maxZoom',
  'change:minResolution',
  'change:minZoom',
  'change:opacity',
  'change:source',
  'change:visible',
  'change:zIndex',
  'error',
  'postrender',
  'prerender',
  'propertychange',
];

export interface VectorLayerProps extends Options<OlVectorSource> {
  onChange?: (event: BaseEvent) => void;
  onExtentChange?: (event: ObjectEvent) => void;
  onMaxResolutionChange?: (event: ObjectEvent) => void;
  onMaxZoomChange?: (event: ObjectEvent) => void;
  onMinResolutionChange?: (event: ObjectEvent) => void;
  onMinZoomChange?: (event: ObjectEvent) => void;
  onOpacityChange?: (event: ObjectEvent) => void;
  onSourceChange?: (event: ObjectEvent) => void;
  onVisibleChange?: (event: ObjectEvent) => void;
  onZIndexChange?: (event: ObjectEvent) => void;
  onError?: (event: BaseEvent) => void;
  onPostrender?: (event: RenderEvent) => void;
  onPrerender?: (event: RenderEvent) => void;
  onPropertychange?: (event: ObjectEvent) => void;
}

export const VectorLayerContext = createContext<{
  vectorLayer?: OlVectorLayer<OlVectorSource>;
}>({});

const VectorLayer = ({
  className,
  opacity,
  visible,
  extent,
  zIndex,
  minResolution,
  maxResolution,
  minZoom,
  maxZoom,
  renderOrder,
  renderBuffer,
  source,
  declutter,
  style,
  background,
  updateWhileAnimating,
  updateWhileInteracting,
  properties,
  ...props
}: PropsWithChildren<VectorLayerProps>) => {
  const { map } = useContext(MapContext);
  const { groupLayer } = useContext(GroupLayerContext);
  const host = groupLayer || map;
  const [vectorLayer, setVectorLayer] =
    useState<OlVectorLayer<OlVectorSource>>();

  useEffect(() => {
    const instance = new OlVectorLayer({
      className,
      opacity,
      visible,
      extent,
      zIndex,
      minResolution,
      maxResolution,
      minZoom,
      maxZoom,
      renderOrder,
      renderBuffer,
      source,
      map,
      declutter,
      style,
      background,
      updateWhileAnimating,
      updateWhileInteracting,
      properties,
    });

    bindEventsFromProps(instance, events, props);

    setVectorLayer(instance);

    if (host && vectorLayer) {
      if (host instanceof OlGroupLayer) {
        host.getLayers().push(vectorLayer);
      } else if (host instanceof OlMap) {
        host.addLayer(vectorLayer);
      }
    }

    return () => {
      if (host instanceof OlGroupLayer) {
        host.getLayers().remove(instance);
      } else if (host instanceof OlMap) {
        host.removeLayer(instance);
      }
    };
  }, [host]);

  useEffect(() => {
    if (vectorLayer) {
      vectorLayer.setExtent(extent);
    }
  }, [extent]);

  useEffect(() => {
    if (vectorLayer && maxResolution !== undefined) {
      vectorLayer.setMaxResolution(maxResolution);
    }
  }, [maxResolution]);

  useEffect(() => {
    if (vectorLayer && maxZoom !== undefined) {
      vectorLayer.setMaxZoom(maxZoom);
    }
  }, [maxZoom]);

  useEffect(() => {
    if (vectorLayer && minResolution !== undefined) {
      vectorLayer.setMinResolution(minResolution);
    }
  }, [minResolution]);

  useEffect(() => {
    if (vectorLayer && minZoom !== undefined) {
      vectorLayer.setMinZoom(minZoom);
    }
  }, [minZoom]);

  useEffect(() => {
    if (vectorLayer && opacity !== undefined) {
      vectorLayer.setOpacity(opacity);
    }
  }, [opacity]);

  useEffect(() => {
    if (vectorLayer && properties !== undefined) {
      vectorLayer.setProperties(properties);
    }
  }, [properties]);

  useEffect(() => {
    if (vectorLayer && source !== undefined) {
      vectorLayer.setSource(source);
    }
  }, [source]);

  useEffect(() => {
    if (vectorLayer) {
      vectorLayer.setStyle(style);
    }
  }, [style]);

  useEffect(() => {
    if (vectorLayer && zIndex !== undefined) {
      vectorLayer.setZIndex(zIndex);
    }
  }, [zIndex]);

  useEffect(() => {
    if (vectorLayer && visible !== undefined) {
      vectorLayer.setVisible(visible);
    }
  }, [visible]);

  return (
    <VectorLayerContext.Provider value={{ vectorLayer }}>
      {props.children}
    </VectorLayerContext.Provider>
  );
};

export default VectorLayer;
