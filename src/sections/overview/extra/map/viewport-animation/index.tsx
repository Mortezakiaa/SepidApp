import { useState, useCallback } from 'react';
import MapGL, { FlyToInterpolator, InteractiveMapProps } from 'react-map-gl';
// components
import { MapControlScale, MapControlGeolocate, MapControlNavigation, MapControlFullscreen } from '@components/map';
//
import ControlPanel from './ControlPanel';

// ----------------------------------------------------------------------

type propTypes = {
  data: { city: string }[];
};

export default function MapViewportAnimation({ data, ...other }: propTypes) {
  const [selectedCity, setSelectedCity] = useState(data[2].city);
  const [viewport, setViewport] = useState<InteractiveMapProps>({
    latitude: 37.7751,
    longitude: -122.4193,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

  const handleChangeCity = useCallback((event, { longitude, latitude }) => {
    setSelectedCity(event.target.value);
    setViewport({
      longitude,
      latitude,
      zoom: 10,
      transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
      transitionDuration: 'auto',
    });
  }, []);

  return (
    <MapGL {...viewport} onViewportChange={setViewport} dragRotate={false} {...other}>
      <MapControlScale />
      <MapControlNavigation />
      <MapControlFullscreen />
      <MapControlGeolocate />

      <ControlPanel data={data} selectedCity={selectedCity} handleChange={handleChangeCity} />
    </MapGL>
  );
}
