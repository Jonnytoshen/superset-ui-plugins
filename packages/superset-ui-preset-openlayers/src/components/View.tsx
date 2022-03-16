import { useState, useEffect, useContext } from 'react';
import OlView, { ViewOptions } from 'ol/View';
import BaseEvent from 'ol/events/Event';
import { ObjectEvent } from 'ol/Object';
import { MapContext } from './Map';
import { bindEventsFromProps } from './core/utils';

const events = [
  'change',
  'change:center',
  'change:resolution',
  'change:rotation',
  'error',
  'propertychange',
];

interface ViewProps extends ViewOptions {
  onChange?: (event: BaseEvent) => void;
  onCenterChange?: (event: ObjectEvent) => void;
  onResolutionChange?: (event: ObjectEvent) => void;
  onRotationChange?: (event: ObjectEvent) => void;
  onError?: (event: BaseEvent) => void;
  onPropertychange?: (event: ObjectEvent) => void;
}

export default function View({
  center,
  constrainRotation,
  enableRotation,
  extent,
  constrainOnlyCenter,
  smoothExtentConstraint,
  maxResolution,
  minResolution,
  maxZoom,
  minZoom,
  multiWorld,
  constrainResolution,
  smoothResolutionConstraint,
  showFullExtent,
  projection,
  resolution,
  resolutions,
  rotation,
  zoom,
  zoomFactor,
  padding,
  ...props
}: ViewProps) {
  const { map } = useContext(MapContext);
  const [view, setView] = useState<OlView>();

  useEffect(() => {
    const instance = new OlView({
      center,
      constrainRotation,
      enableRotation,
      extent,
      constrainOnlyCenter,
      smoothExtentConstraint,
      maxResolution,
      minResolution,
      maxZoom,
      minZoom,
      multiWorld,
      constrainResolution,
      smoothResolutionConstraint,
      showFullExtent,
      projection,
      resolution,
      resolutions,
      rotation,
      zoom,
      zoomFactor,
      padding,
    });

    bindEventsFromProps(instance, events, props);

    setView(instance);

    if (map) {
      map.setView(instance);
    }

    return () => {
      if (map) {
        map.setView(null as any);
      }
    };
  }, [map]);

  useEffect(() => {
    if (view) {
      view.setCenter(center);
    }
  }, [center]);

  useEffect(() => {
    if (view && constrainResolution !== undefined) {
      view.setConstrainResolution(constrainResolution);
    }
  }, [constrainResolution]);

  useEffect(() => {
    if (view && maxZoom !== undefined) {
      view.setMaxZoom(maxZoom);
    }
  }, [maxZoom]);

  useEffect(() => {
    if (view && minZoom !== undefined) {
      view.setMinZoom(minZoom);
    }
  }, [minZoom]);

  useEffect(() => {
    if (view) {
      view.setResolution(resolution);
    }
  }, [resolution]);

  useEffect(() => {
    if (view && rotation !== undefined) {
      view.setRotation(rotation);
    }
  }, [rotation]);

  useEffect(() => {
    if (view && zoom !== undefined) {
      view.setZoom(zoom);
    }
  }, [zoom]);

  return null;
}
