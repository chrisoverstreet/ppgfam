import * as React from 'react';
import ReactMapGL, { ViewportProps } from 'react-map-gl';

import MainLayout from '../components/MainLayout';

const Map: React.FunctionComponent = () => {
  const [viewport, setViewport] = React.useState<
    Pick<ViewportProps, 'latitude' | 'longitude' | 'zoom'>
  >({
    latitude: 37.3343,
    longitude: -79.5231,
    zoom: 4,
  });

  return (
    <MainLayout>
      <ReactMapGL
        {...viewport}
        height="100%"
        width="100%"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN}
        onViewportChange={setViewport}
      />
    </MainLayout>
  );
};

export default Map;
