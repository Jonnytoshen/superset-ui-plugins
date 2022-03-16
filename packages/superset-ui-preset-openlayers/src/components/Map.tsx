import React, {
  useState,
  useEffect,
  createRef,
  createContext,
  PropsWithChildren,
} from 'react';
import OlMap from 'ol/Map';
import OlView from 'ol/View';
import { MapOptions } from 'ol/PluggableMap';
import LayerGroup from 'ol/layer/Group';
import BaseEvent from 'ol/events/Event';
import { ObjectEvent } from 'ol/Object';
import { MapBrowserEvent, MapEvent } from 'ol';
import RenderEvent from 'ol/render/Event';

import 'ol/src/ol.css';
import { bindEventsFromProps } from './core/utils';

interface MapProps extends MapOptions {
  className?: string;
  width?: number | string;
  height?: number | string;
  onChange?: (event: BaseEvent) => void;
  onLayerGroupChange?: (event: ObjectEvent) => void;
  onSizeChange?: (event: ObjectEvent) => void;
  onTargetChange?: (event: ObjectEvent) => void;
  onViewChange?: (event: ObjectEvent) => void;
  onClick?: (event: MapBrowserEvent<UIEvent>) => void;
  onDblclick?: (event: MapBrowserEvent<UIEvent>) => void;
  onSingleclick?: (event: MapBrowserEvent<UIEvent>) => void;
  onError?: (event: BaseEvent) => void;
  onMoveend?: (event: MapEvent) => void;
  onMovestart?: (event: MapEvent) => void;
  onPointerdrag?: (event: MapBrowserEvent<UIEvent>) => void;
  onPointermove?: (event: MapBrowserEvent<UIEvent>) => void;
  onPostcompose?: (event: RenderEvent) => void;
  onPrecompose?: (event: RenderEvent) => void;
  onRendercomplete?: (event: RenderEvent) => void;
  onPostrender?: (event: MapEvent) => void;
  onPropertychange?: (event: ObjectEvent) => void;
  onMapReady?: (instance: OlMap) => void;
}

export const MapContext = createContext<{ map?: OlMap }>({});

const events = [
  'change',
  'change:layerGroup',
  'change:size',
  'change:target',
  'change:view',
  'click',
  'dblclick',
  'error',
  'moveend',
  'movestart',
  'pointerdrag',
  'pointermove',
  'postcompose',
  'postrender',
  'precompose',
  'propertychange',
  'rendercomplete',
  'singleclick',
];

const Map = ({
  width = '100%',
  height = '100%',
  controls,
  pixelRatio,
  interactions,
  keyboardEventTarget,
  layers,
  maxTilesLoading,
  moveTolerance,
  overlays,
  target,
  view,
  onMapReady,
  ...props
}: PropsWithChildren<MapProps>) => {
  const mapRef = createRef<HTMLDivElement>();
  const [map, setMap] = useState<OlMap>();
  const [style, setStyle] = useState({});

  useEffect(() => {
    const mapInstance = new OlMap({
      controls,
      pixelRatio,
      interactions,
      keyboardEventTarget,
      layers,
      maxTilesLoading,
      moveTolerance,
      overlays,
      target: target || (mapRef.current as HTMLDivElement),
      view,
    });

    bindEventsFromProps(mapInstance, events, props);

    if (onMapReady) {
      onMapReady(mapInstance);
    }

    setMap(mapInstance);

    Promise.resolve().then(() => {
      mapInstance.updateSize();
    });

    return () => mapInstance.setTarget(undefined);
  }, []);

  useEffect(() => {
    if (map && layers) {
      if (layers instanceof LayerGroup) {
        map.setLayerGroup(layers);
      } else {
        map.setLayers(layers);
      }
    }
  }, [layers]);

  useEffect(() => {
    if (map) {
      map.setView(view as OlView);
    }
  }, [view]);

  useEffect(() => {
    setStyle({
      position: 'relative',
      width,
      height,
    });
    if (map) {
      Promise.resolve().then(() => {
        map.updateSize();
      });
    }
  }, [width, height]);

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className={props.className} style={style}>
        {props.children}
      </div>
    </MapContext.Provider>
  );
};

export default Map;
