import * as React from 'react';
import css from 'styled-jsx/css';
import ReactMapGL, { Marker, ViewportProps } from 'react-map-gl';
import { debounce } from 'lodash';
import { usePopper } from 'react-popper';

import MainLayout from '../components/MainLayout';
import PinIcon from '../icons/pin.svg';
import { Coordinates } from 'viewport-mercator-project';
import {
  ILocation,
  ILocationType,
  useLocationsQuery,
} from '../__generated__/graphql';
import { useRouter } from 'next/router';
import { WebMercatorViewport } from 'react-map-gl';
import theme from '../lib/theme';

const PIN = css.resolve`
  svg {
    color: ${theme.colors.red500};
    cursor: pointer;
    pointer-events: none;
    height: 48px;
    transition: transform 0.15s ease-in;
    transform-origin: bottom center;
    transform: translate(-50%, -48px);

    &[data-type='${ILocationType.Lz}'] {
      color: ${theme.colors.red500};
    }
   
    &[data-type='${ILocationType.Home}'] {
      color: ${theme.colors.blue};
    }
    
    &[data-type='${ILocationType.School}'] {
      color: ${theme.colors.amber500};
    }

    :hover {
      transform: translate(-50%, -48px) scale(1.5);
    }

    & > :global(path) {
      pointer-events: auto;
    }
  }
`;

const Map: React.FunctionComponent = () => {
  const router = useRouter();

  const [referenceElement, setReferenceElement] = React.useState(null);
  const popperElement = React.useRef(null);
  const arrowElement = React.useRef(null);

  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement.current,
    {
      modifiers: [
        { name: 'arrow', options: { element: arrowElement.current } },
        { name: 'offset', options: { offset: [0, 24] } },
      ],
      placement: 'top',
    },
  );

  const [locations, setLocations] = React.useState<
    ({ __typename?: 'Location' } & Pick<
      ILocation,
      'id' | 'name' | 'latitude' | 'longitude' | 'type' | 'userId'
    >)[]
  >([]);
  const debouncedSetLocations = debounce(setLocations, 500);

  const [activeLocation, setActiveLocation] = React.useState<
    | ({ __typename?: 'Location' } & Pick<
        ILocation,
        'id' | 'name' | 'latitude' | 'longitude' | 'type' | 'userId'
      >)
    | null
  >(null);

  const query: string =
    (Array.isArray(router.query.q) ? router.query.q[0] : router.query.q) || '';

  const [viewport, setViewport] = React.useState<Partial<ViewportProps>>({
    latitude: 37.3343,
    longitude: -79.5231,
    zoom: 4,
  });

  useLocationsQuery({
    variables: { query },
    onCompleted: (data) =>
      debouncedSetLocations(
        data?.locations.edges.map((edge) => edge.node) ?? [],
      ),
  });

  React.useEffect(() => {
    const bounds: [Coordinates, Coordinates] = locations.reduce(
      (
        [[westLongitude, southLatitude], [eastLongitude, northLatitude]],
        { longitude, latitude },
      ) => [
        [Math.min(westLongitude, longitude), Math.min(southLatitude, latitude)],
        [Math.max(eastLongitude, longitude), Math.max(northLatitude, latitude)],
      ],
      [
        [
          locations[0]?.longitude ?? -79.5231,
          locations[0]?.latitude ?? 37.3343,
        ],
        [
          locations[0]?.longitude ?? -79.5231,
          locations[0]?.latitude ?? 37.3343,
        ],
      ],
    );

    const newViewport = new WebMercatorViewport({
      height: viewport.height || 500,
      width: viewport.width || 500,
    }).fitBounds(bounds, { padding: 100 });

    setViewport({
      ...newViewport,
      zoom: Math.min(newViewport.zoom, 8),
    });
  }, [locations]);

  return (
    <MainLayout>
      <ReactMapGL
        {...viewport}
        height="100%"
        width="100%"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN}
        onViewportChange={setViewport}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            latitude={location.latitude}
            longitude={location.longitude}
          >
            <PinIcon
              className={PIN.className}
              data-type={location.type}
              onClick={() =>
                router.push(
                  '/location/[locationId]',
                  `/location/${location.id}`,
                )
              }
              onMouseEnter={(event) => {
                setReferenceElement(event.currentTarget);
                setActiveLocation(location);
              }}
              onMouseLeave={() => {
                setReferenceElement(null);
                setActiveLocation(null);
              }}
            />
            {PIN.styles}
          </Marker>
        ))}
      </ReactMapGL>
      <div
        ref={popperElement}
        style={styles.popper}
        {...attributes.popper}
        className="tooltip"
        data-visible={!!referenceElement}
      >
        {activeLocation?.name}
        <div ref={arrowElement} className="arrow" style={styles.arrow} />
      </div>
      <style jsx>
        {`
          .tooltip {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 8px 8px rgba(0, 0, 0, 0.5);
            display: none;
            padding: 8px 12px;

            &[data-visible='true'] {
              display: block;
            }
          }
        `}
      </style>
    </MainLayout>
  );
};

export default Map;
