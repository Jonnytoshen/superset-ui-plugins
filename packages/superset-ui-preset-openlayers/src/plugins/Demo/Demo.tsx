import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'ol/format';
import { VectorSourceEvent } from 'ol/source/Vector';
import { Extent, getCenter } from 'ol/extent';
import { Point, Polygon } from 'ol/geom';
import RenderEvent from 'ol/render/Event';
import { fromLonLat, toLonLat, transformExtent } from 'ol/proj';
import { Feature } from 'ol';

import Container from '../../Container';
import { DemoProps } from './types';
import TileLayer from '../../components/layers/TileLayer';
import VectorLayer from '../../components/layers/VectorLayer';
import VectorSource from '../../components/sources/VectorSource';
import XYZSource from '../../components/sources/XYZSource';
import Style from '../../components/styles/Style';
import StrokeStyle from '../../components/styles/Stroke';
import { ExtentControlValue } from '../../controls/ExtentControl';
import { regionLabelStyle, plantsPlanedStyle } from './utils';

import './style.css';

const OpenlayersDemo = ({
  width,
  height,
  viewport,
  mapStyle,
  grayscale,
  regionAdcode,
  regionVisible,
  regionLabelVisible,
  resourceMapUrl,
  resourceMapVisible,
  resourceMapExtent,
  data,
  autoZoom,
  latCol,
  lonCol,
  typeCol,
}: DemoProps) => {
  const [boundaryURL, setBoundaryURL] = useState<string | null>(null);
  const [regionURL, setRegionURL] = useState<string | null>(null);
  const [boundaryExtent, setBoundaryExtent] = useState<Extent>();
  const [labelPoints, setLabelPoints] = useState<Feature<Point>[]>();

  useEffect(() => {
    if (regionAdcode) {
      setBoundaryURL(
        `https://geo.datav.aliyun.com/areas_v3/bound/${regionAdcode}.json`,
      );
      setRegionURL(
        `https://geo.datav.aliyun.com/areas_v3/bound/${regionAdcode}_full.json`,
      );
    } else {
      setBoundaryURL(null);
      setRegionURL(null);
    }
  }, [regionAdcode]);

  const format = new GeoJSON({
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857',
  });

  const handleBoundaryChange = (event: VectorSourceEvent) => {
    const { feature } = event;
    const geometry = feature?.getGeometry() as Polygon;
    const extent = geometry.getExtent();
    setBoundaryExtent(extent);
    console.log(transformExtent(extent, 'EPSG:3857', 'EPSG:4326'));
    console.log(toLonLat(getCenter(extent)));
  };

  const handleFeaturesloadend = (event: VectorSourceEvent) => {
    const features = event.features || [];
    const labelPoints = features.map(feature => {
      const { name, center } = feature.getProperties();
      return new Feature({
        geometry: new Point(fromLonLat(center)),
        name,
      });
    });
    setLabelPoints(labelPoints);
  };

  const setShadowBlur = (event: RenderEvent, shadowBlur: number) => {
    const context = event.context as CanvasRenderingContext2D;
    context.shadowBlur = shadowBlur;
    context.shadowColor = '#000000';
  };

  const formatExtent = (value: ExtentControlValue): Extent => {
    const { minX, minY, maxX, maxY } = value;
    return transformExtent([minX, minY, maxX, maxY], 'EPSG:4326', 'EPSG:3857');
  };

  const renderBoundaryLayer = () => {
    if (regionVisible && boundaryURL) {
      return (
        <VectorLayer
          key="boundary-layers"
          className="demo-layer-shadow"
          onPrerender={e => setShadowBlur(e, 16)}
          onPostrender={e => setShadowBlur(e, 0)}
        >
          <VectorSource
            format={format}
            url={boundaryURL}
            onAddfeature={e => handleBoundaryChange(e)}
          />
          <Style>
            <StrokeStyle width={4} color={[54, 49, 49, 0.3]} />
          </Style>
        </VectorLayer>
      );
    }
    return null;
  };

  const renderResourceMapLayer = () => {
    if (resourceMapVisible && resourceMapUrl) {
      return (
        <TileLayer extent={formatExtent(resourceMapExtent)}>
          <XYZSource url={resourceMapUrl} />
        </TileLayer>
      );
    }
    return null;
  };

  const renderRegionLayer = () => {
    if (regionVisible && regionURL) {
      return (
        <VectorLayer key="region-layer">
          <VectorSource
            format={format}
            url={regionURL}
            onFeaturesloadend={e => handleFeaturesloadend(e)}
          />
          <Style>
            <StrokeStyle width={1} color={[106, 118, 108, 0.25]} />
          </Style>
        </VectorLayer>
      );
    }
    return null;
  };

  const renderRegionLabelLayer = () => {
    if (regionVisible && regionLabelVisible && labelPoints) {
      return (
        <VectorLayer key="label-points-layer" style={regionLabelStyle()}>
          <VectorSource features={labelPoints} />
        </VectorLayer>
      );
    }
    return null;
  };

  const renderPlants = () => {
    if (data) {
      const plants = data.map(item => {
        const longitude = item[lonCol] as number;
        const latitude = item[latCol] as number;
        const coordinate = fromLonLat([longitude, latitude]);
        return new Feature({
          ...item,
          geometry: new Point(coordinate),
          type: item[typeCol],
        });
      });
      return (
        <VectorLayer style={plantsPlanedStyle()}>
          <VectorSource features={plants} />
        </VectorLayer>
      );
    }
    return null;
  };

  return (
    <Container
      width={width}
      height={height}
      viewport={viewport}
      mapStyle={mapStyle}
      grayscale={grayscale}
      extent={boundaryExtent}
      autoZoom={autoZoom}
    >
      {renderBoundaryLayer()}

      {renderResourceMapLayer()}

      {renderRegionLayer()}

      {renderRegionLabelLayer()}

      {renderPlants()}
    </Container>
  );
};

export default OpenlayersDemo;
