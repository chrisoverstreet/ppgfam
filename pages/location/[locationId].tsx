import * as React from 'react';
import MainLayout from '../../components/MainLayout';
import { useRouter } from 'next/router';

const LocationPage: React.FunctionComponent = () => {
  const router = useRouter();

  const locationId = router.query.location;

  return <MainLayout>{locationId}</MainLayout>;
};

export default LocationPage;
