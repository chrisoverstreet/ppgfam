import * as React from 'react';

import MainLayout from '../components/MainLayout';
import { useRouter } from 'next/router';
import { ILocation, useLocationsQuery } from '../__generated__/graphql';
import { debounce } from 'lodash';

const List: React.FunctionComponent = () => {
  const router = useRouter();

  const [locations, setLocations] = React.useState<
    ({ __typename?: 'Location' } & Pick<
      ILocation,
      'id' | 'name' | 'latitude' | 'longitude' | 'type' | 'userId'
    >)[]
  >([]);
  const debouncedSetLocations = debounce(setLocations, 500);

  const query: string =
    (Array.isArray(router.query.q) ? router.query.q[0] : router.query.q) || '';

  useLocationsQuery({
    variables: { query },
    onCompleted: (data) =>
      debouncedSetLocations(
        data?.locations.edges.map((edge) => edge.node) ?? [],
      ),
  });

  return (
    <MainLayout>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            {location.name}
            {location.latitude}
            {location.longitude}
            {location.type}
          </li>
        ))}
      </ul>
    </MainLayout>
  );
};

export default List;
