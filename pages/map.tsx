import * as React from 'react';
import ReactMapGL, { Marker, ViewportProps } from 'react-map-gl';

import MainLayout from '../components/MainLayout';
import { Coordinates } from 'viewport-mercator-project';
import { useLocationsQuery } from '../__generated__/graphql';
import { useRouter } from 'next/router';
import { WebMercatorViewport } from 'react-map-gl';

const Map: React.FunctionComponent = () => {
  const router = useRouter();

  const query: string =
    (Array.isArray(router.query.q) ? router.query.q[0] : router.query.q) || '';

  const [viewport, setViewport] = React.useState<Partial<ViewportProps>>({
    latitude: 37.3343,
    longitude: -79.5231,
    zoom: 4,
  });

  const { data } = useLocationsQuery({
    variables: { query },
  });

  React.useEffect(() => {
    const bounds: [Coordinates, Coordinates] = (
      data?.locations.edges ?? []
    ).reduce(
      (
        [[westLongitude, southLatitude], [eastLongitude, northLatitude]],
        { node: { longitude, latitude } },
      ) => [
        [Math.min(westLongitude, longitude), Math.min(southLatitude, latitude)],
        [Math.max(eastLongitude, longitude), Math.max(northLatitude, latitude)],
      ],
      [
        [
          data?.locations.edges[0]?.node.longitude ?? -79.5231,
          data?.locations.edges[0]?.node.latitude ?? 37.3343,
        ],
        [
          data?.locations.edges[0]?.node.longitude ?? -79.5231,
          data?.locations.edges[0]?.node.latitude ?? 37.3343,
        ],
      ],
    );

    const newViewport = new WebMercatorViewport({
      height: viewport.height || 500,
      width: viewport.width || 500,
    }).fitBounds(bounds, { padding: 25 });

    setViewport({
      ...newViewport,
      zoom: Math.min(newViewport.zoom, 8),
    });
  }, [data]);

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
