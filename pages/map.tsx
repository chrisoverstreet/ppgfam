import * as React from 'react';
import ReactMapGL, { Marker, ViewportProps } from 'react-map-gl';

import MainLayout from '../components/MainLayout';
import { useLocationsQuery } from '../__generated__/graphql';
import { useRouter } from 'next/router';

const Map: React.FunctionComponent = () => {
  const router = useRouter();

  const query: string =
    (Array.isArray(router.query.q) ? router.query.q[0] : router.query.q) || '';

  const [viewport, setViewport] = React.useState<
    Pick<ViewportProps, 'latitude' | 'longitude' | 'zoom'>
  >({
    latitude: 37.3343,
    longitude: -79.5231,
    zoom: 4,
  });

  const { data } = useLocationsQuery({
    variables: { query },
  });

  return (
    <MainLayout>
      <ReactMapGL
        {...viewport}
        height="100%"
        width="100%"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN}
        onViewportChange={setViewport}
      >
        {data?.locations.edges.map(({ node: location }) => (
          <Marker
            key={location.id}
            latitude={location.latitude}
            longitude={location.longitude}
          >
            {location.name}
          </Marker>
        ))}
      </ReactMapGL>
    </MainLayout>
  );
};

export default Map;
