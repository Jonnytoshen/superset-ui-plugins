import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from 'react';
import OlMap from 'ol/Map';
import OlGroupLayer from 'ol/layer/Group';
import OlTileLayer from 'ol/layer/Tile';
import OlTileSource from 'ol/source/Tile';
import { Options } from 'ol/layer/BaseTile';
import BaseEvent from 'ol/events/Event';
import { ObjectEvent } from 'ol/Object';
import RenderEvent from 'ol/render/Event';
import { MapContext } from '../Map';
import { GroupLayerContext } from './GroupLayer';
import { bindEventsFromProps } from '../core/utils';

const events = [
  'change',
  'change:extent',
  'change:maxResolution',
  'change:maxZoom',
  'change:minResolution',
  'change:minZoom',
  'change:opacity',
  'change:preload',
  'change:source',
  'change:useInterimTilesOnError',
  'change:visible',
  'change:zIndex',
  'error',
  'postrender',
  'prerender',
  'propertychange',
];

export interface TileLayerProps extends Options<OlTileSource> {
  onChange?: (event: BaseEvent) => void;
  onExtentChange?: (event: ObjectEvent) => void;
  onMaxResolutionChange?: (event: ObjectEvent) => void;
  onMaxZoomChange?: (event: ObjectEvent) => void;
  onMinResolutionChange?: (event: ObjectEvent) => void;
  onMinZoomChange?: (event: ObjectEvent) => void;
  onOpacityChange?: (event: ObjectEvent) => void;
  onPreloadChange?: (event: ObjectEvent) => void;
  onSourceChange?: (event: ObjectEvent) => void;
  onUseInterimTilesOnErrorChange?: (event: ObjectEvent) => void;
  onVisibleChange?: (event: ObjectEvent) => void;
  onZIndexChange?: (event: ObjectEvent) => void;
  onError?: (event: BaseEvent) => void;
  onPostrender?: (event: RenderEvent) => void;
  onPrerender?: (event: RenderEvent) => void;
  onPropertychange?: (event: ObjectEvent) => void;
}

export const TileLayerContext = createContext<{
  tileLayer?: OlTileLayer<OlTileSource>;
}>({});

const TileLayer = ({
  className,
  opacity,
  visible,
  extent,
  zIndex,
  minResolution,
  minZoom,
  maxResolution,
  maxZoom,
  preload,
  source,
  useInterimTilesOnError,
  properties,
  ...props
}: PropsWithChildren<TileLayerProps>) => {
  const { map } = useContext(MapContext);
  const { groupLayer } = useContext(GroupLayerContext);
  const [tileLayer, setTileLayer] = useState<OlTileLayer<OlTileSource>>();
  const host = groupLayer || map;

  useEffect(() => {
    const instance = new OlTileLayer({
      className,
      opacity,
      visible,
      extent,
      zIndex,
      minResolution,
      minZoom,
      maxResolution,
      maxZoom,
      preload,
      source,
      useInterimTilesOnError,
      properties,
    });

    bindEventsFromProps(instance, events, props);

    setTileLayer(instance);

    if (host instanceof OlGroupLayer) {
      host.getLayers().push(instance);
    } else if (host instanceof OlMap) {
      host.addLayer(instance);
    }

    return () => {
      if (host instanceof OlGroupLayer) {
        host.getLayers().remove(instance);
      } else if (host instanceof OlMap) {
        host.removeLayer(instance);
      }
    };
  }, [host]);

  // useEffect(() => {
  //   if (tileLayer) {
  //     if (context instanceof OlGroupLayer) {
  //       context.getLayers().push(tileLayer);
  //     } else if (context instanceof OlMap) {
  //       context.addLayer(tileLayer);
  //     }
  //   }
  // }, [context, tileLayer]);

  useEffect(() => {
    if (tileLayer) {
      tileLayer.setExtent(extent);
    }
  }, [extent]);

  useEffect(() => {
    if (tileLayer && maxResolution !== undefined) {
      tileLayer.setMaxResolution(maxResolution);
    }
  }, [maxResolution]);

  useEffect(() => {
    if (tileLayer && maxZoom !== undefined) {
      tileLayer.setMaxZoom(maxZoom);
    }
  }, [maxZoom]);

  useEffect(() => {
    if (tileLayer && minResolution !== undefined) {
      tileLayer.setMinResolution(minResolution);
    }
  }, [minResolution]);

  useEffect(() => {
    if (tileLayer && minZoom !== undefined) {
      tileLayer.setMinZoom(minZoom);
    }
  }, [minZoom]);

  useEffect(() => {
    if (tileLayer && opacity !== undefined) {
      tileLayer.setOpacity(opacity);
    }
  }, [opacity]);

  useEffect(() => {
    if (tileLayer && preload !== undefined) {
      tileLayer.setPreload(preload);
    }
  }, [preload]);

  useEffect(() => {
    if (tileLayer && properties !== undefined) {
      tileLayer.setProperties(properties);
    }
  }, [properties]);

  useEffect(() => {
    if (tileLayer && source !== undefined) {
      tileLayer.setSource(source);
    }
  }, [source]);

  useEffect(() => {
    if (tileLayer && useInterimTilesOnError !== undefined) {
      tileLayer.setUseInterimTilesOnError(useInterimTilesOnError);
    }
  }, [useInterimTilesOnError]);

  useEffect(() => {
    if (tileLayer && zIndex !== undefined) {
      tileLayer.setZIndex(zIndex);
    }
  }, [zIndex]);

  useEffect(() => {
    if (tileLayer && visible !== undefined) {
      tileLayer.setVisible(visible);
    }
  }, [visible]);

  return (
    <TileLayerContext.Provider value={{ tileLayer }}>
      {props.children}
    </TileLayerContext.Provider>
  );
};

export default TileLayer;
