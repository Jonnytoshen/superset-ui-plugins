import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from 'react';
import OlGroupLayer, { Options } from 'ol/layer/Group';
import BaseEvent from 'ol/events/Event';
import { ObjectEvent } from 'ol/Object';
import { Collection } from 'ol';
import { MapContext } from '../Map';
import { bindEventsFromProps } from '../core/utils';

const events = [
  'change',
  'change:extent',
  'change:layers',
  'change:maxResolution',
  'change:maxZoom',
  'change:minResolution',
  'change:minZoom',
  'change:opacity',
  'change:visible',
  'change:zIndex',
  'error',
  'propertychange',
];

export interface GroupLayerProps extends Options {
  onChange?: (event: BaseEvent) => void;
  onExtentChange?: (event: ObjectEvent) => void;
  onLayersChange?: (event: ObjectEvent) => void;
  onMaxResolutionChange?: (event: ObjectEvent) => void;
  onMaxZoomChange?: (event: ObjectEvent) => void;
  onMinResolutionChange?: (event: ObjectEvent) => void;
  onMinZoomChange?: (event: ObjectEvent) => void;
  onOpacityChange?: (event: ObjectEvent) => void;
  onVisibleChange?: (event: ObjectEvent) => void;
  onZIndexChange?: (event: ObjectEvent) => void;
  onError?: (event: BaseEvent) => void;
  onPropertychange?: (event: ObjectEvent) => void;
}

export const GroupLayerContext = createContext<{
  groupLayer?: OlGroupLayer;
}>({});

const GroupLayer = ({
  opacity,
  visible,
  extent,
  zIndex,
  maxResolution,
  maxZoom,
  minResolution,
  minZoom,
  layers,
  properties,
  ...props
}: PropsWithChildren<GroupLayerProps>) => {
  const { map } = useContext(MapContext);
  const [groupLayer, setGroupLayer] = useState<OlGroupLayer>();

  useEffect(() => {
    const instance = new OlGroupLayer({
      opacity,
      visible,
      extent,
      zIndex,
      maxResolution,
      maxZoom,
      minResolution,
      minZoom,
      layers,
      properties,
    });

    bindEventsFromProps(instance, events, props);

    setGroupLayer(instance);

    if (map) {
      map.addLayer(instance);
    }

    return () => {
      if (map) {
        map.removeLayer(instance);
      }
    };
  }, [map]);

  useEffect(() => {
    if (groupLayer) {
      groupLayer.setExtent(extent);
    }
  }, [extent]);

  useEffect(() => {
    if (groupLayer && layers) {
      groupLayer.setLayers(
        layers instanceof Collection ? layers : new Collection(layers),
      );
    }
  }, [layers]);

  useEffect(() => {
    if (groupLayer && maxResolution !== undefined) {
      groupLayer.setMaxResolution(maxResolution);
    }
  }, [maxResolution]);

  useEffect(() => {
    if (groupLayer && maxZoom !== undefined) {
      groupLayer.setMaxZoom(maxZoom);
    }
  }, [maxZoom]);

  useEffect(() => {
    if (groupLayer && minResolution !== undefined) {
      groupLayer.setMinResolution(minResolution);
    }
  }, [minResolution]);

  useEffect(() => {
    if (groupLayer && minZoom !== undefined) {
      groupLayer.setMinZoom(minZoom);
    }
  }, [minZoom]);

  useEffect(() => {
    if (groupLayer && opacity !== undefined) {
      groupLayer.setOpacity(opacity);
    }
  }, [opacity]);

  useEffect(() => {
    if (groupLayer && properties !== undefined) {
      groupLayer.setProperties(properties);
    }
  }, [properties]);

  useEffect(() => {
    if (groupLayer && visible !== undefined) {
      groupLayer.setVisible(visible);
    }
  }, [visible]);

  useEffect(() => {
    if (groupLayer && zIndex !== undefined) {
      groupLayer.setZIndex(zIndex);
    }
  }, [zIndex]);

  return (
    <GroupLayerContext.Provider value={{ groupLayer }}>
      {props.children}
    </GroupLayerContext.Provider>
  );
};

export default GroupLayer;
