import React, { PropsWithChildren, useState, useEffect } from 'react';
import { fromLonLat } from 'ol/proj';
import RenderEvent from 'ol/render/Event';
import { Extent } from 'ol/extent';
import OlMap from 'ol/Map';

import Map from './components/Map';
import View from './components/View';
import GroupLayer from './components/layers/GroupLayer';
import TileLayer from './components/layers/TileLayer';
import XYZSource from './components/sources/XYZSource';

import { MAP_STYLE } from './utils/map-style';
import { ViewportControlValue } from './controls/ViewportControl';

export interface ContainerProps {
  viewport: ViewportControlValue;
  mapStyle: string;
  grayscale: boolean;
  width: string;
  height: string;
  autoZoom: boolean;
  extent?: Extent;
}

const Container = ({
  width,
  height,
  viewport,
  mapStyle,
  grayscale,
  children,
  autoZoom,
  extent,
}: PropsWithChildren<ContainerProps>) => {
  const [map, setMap] = useState<OlMap | null>(null);
  const { longitude, latitude, zoom } = viewport;
  const center = fromLonLat([longitude, latitude]);

  const onBasemapPostrender = (event: RenderEvent) => {
    const context = event.context as CanvasRenderingContext2D;
    context.filter = 'grayscale(0)';
  };

  const onBasemapPrerender = (event: RenderEvent) => {
    const context = event.context as CanvasRenderingContext2D;
    context.filter = 'grayscale(0.95)';
  };

  const renderBasemapLayer = () => {
    const { url } = MAP_STYLE[mapStyle];
    return !grayscale ? (
      <TileLayer className="basemap-layer">
        <XYZSource url={url} />
      </TileLayer>
    ) : null;
  };

  const renderGrayscaleBasemapLayer = () => {
    const { url } = MAP_STYLE[mapStyle];
    return grayscale ? (
      <TileLayer
        className="grayscale-basemap-layer"
        onPostrender={e => onBasemapPostrender(e)}
        onPrerender={e => onBasemapPrerender(e)}
      >
        <XYZSource url={url} />
      </TileLayer>
    ) : null;
  };

  const handleMapReady = (map: OlMap) => {
    setMap(map);
    if (autoZoom && extent) {
      setTimeout(() => {
        map.getView().fit(extent, {
          padding: [5, 5, 5, 5],
          duration: 500,
        });
      }, 50);
    }
  };

  useEffect(() => {
    if (map && autoZoom && extent) {
      setTimeout(() => {
        map.getView().fit(extent, {
          padding: [5, 5, 5, 5],
          duration: 500,
        });
      }, 50);
    }
  }, [autoZoom, extent]);

  return (
    <Map
      width={width}
      height={height}
      controls={[]}
      onMapReady={map => handleMapReady(map)}
    >
      <View center={center} zoom={zoom} />
      <GroupLayer>
        {renderBasemapLayer()}
        {renderGrayscaleBasemapLayer()}
      </GroupLayer>
      {children}
    </Map>
  );
};

export default Container;
