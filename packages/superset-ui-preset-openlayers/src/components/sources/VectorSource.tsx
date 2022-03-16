import { PropsWithChildren, useContext, useState, useEffect } from 'react';
import { Collection } from 'ol';
import { ObjectEvent } from 'ol/Object';
import OlVectorSource, { Options, VectorSourceEvent } from 'ol/source/Vector';
import BaseEvent from 'ol/events/Event';
import { VectorLayerContext } from '../layers/VectorLayer';
import { bindEventsFromProps } from '../core/utils';

const events = [
  'addfeature',
  'change',
  'changefeature',
  'clear',
  'error',
  'featuresloadend',
  'featuresloaderror',
  'featuresloadstart',
  'propertychange',
  'removefeature',
];

export interface VectorSourceProps extends Options {
  onAddfeature?: (event: VectorSourceEvent) => void;
  onChange?: (event: BaseEvent) => void;
  onChangefeature?: (event: VectorSourceEvent) => void;
  onClear?: (event: VectorSourceEvent) => void;
  onError?: (event: BaseEvent) => void;
  onFeaturesloadend?: (event: VectorSourceEvent) => void;
  onFeaturesloaderror?: (event: VectorSourceEvent) => void;
  onFeaturesloadstart?: (event: VectorSourceEvent) => void;
  onPropertychange?: (event: ObjectEvent) => void;
  onRemovefeature?: (event: VectorSourceEvent) => void;
}

const VectorSource = ({
  attributions,
  features,
  format,
  loader,
  overlaps,
  strategy,
  url,
  useSpatialIndex,
  wrapX,
  ...props
}: PropsWithChildren<VectorSourceProps>) => {
  const { vectorLayer } = useContext(VectorLayerContext);
  const [vectorSource, setVectorSource] = useState<OlVectorSource>();

  useEffect(() => {
    const instance = new OlVectorSource({
      attributions,
      features,
      format,
      loader,
      overlaps,
      strategy,
      url,
      useSpatialIndex,
      wrapX,
    });

    bindEventsFromProps(instance, events, props);

    setVectorSource(instance);

    if (vectorLayer) {
      vectorLayer.setSource(instance);
    }

    return () => {
      if (vectorLayer) {
        vectorLayer.setSource(null);
      }
    };
  }, [vectorLayer]);

  useEffect(() => {
    vectorSource?.setAttributions(attributions);
  }, [attributions]);

  useEffect(() => {
    if (loader) {
      vectorSource?.setLoader(loader);
    }
  }, [loader]);

  useEffect(() => {
    if (url) {
      vectorSource?.setUrl(url);
      vectorSource?.refresh();
    }
  }, [url]);

  useEffect(() => {
    vectorSource?.clear();
    if (features instanceof Collection) {
      vectorSource?.addFeatures(features.getArray());
    } else {
      vectorSource?.addFeatures(features || []);
    }
  }, [features]);

  return null;
};

export default VectorSource;
