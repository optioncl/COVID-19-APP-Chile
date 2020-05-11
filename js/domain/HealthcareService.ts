import { LatLng } from 'react-native-maps';
import defaultPosition from 'js/infraestructure/const/PositionDefault';

export interface HealthcareService {
  Id: number;
  geopoint: LatLng;
  Address: string;
  Name: string;
  Phone?: number;
  hasPeople: boolean;
  LocationId: string;
  MonitorId: string;
  totalPeople: number;
}

export const defaultHealthcare = {
  Id: 0,
  geopoint: defaultPosition,
  Address: '',
  Name: '',
  Phone: 0,
  MonitorId: '',
  LocationId: '',
  hasPeople: false,
  totalPeople: 0,
} as HealthcareService;
