import axios from 'js/infraestructure/HttpRequest';
import apiDataMob from 'js/infraestructure/const/ApiDatMob';
import dayjs from 'dayjs';
import FilterPotentialPerfomance from './FilterPotentialPerfomance';
import { AUTHORIZATION_TOKEN_DATMOB } from 'react-native-dotenv';
import qs from 'qs';

const request = axios.create({
  baseURL: apiDataMob.API_URL,
});

const login = async () => {
  const { data } = await request.post('/ingresar', {
    authentication_token: AUTHORIZATION_TOKEN_DATMOB,
  });

  return data.token;
};

const normalizeFilterParams = (filter: FilterPotentialPerfomance) => {
  let {
    starts_at,
    ends_at,
    branch_ids,
    time_lapse = 'hourly',
  } = filter;
  if (undefined === starts_at) {
    starts_at = dayjs()
      .subtract(2, 'hour')
      .format(apiDataMob.FORMAT_DATE_API);
  }

  if (undefined === ends_at) {
    ends_at = dayjs().format(apiDataMob.FORMAT_DATE_API);
  }

  let params: FilterPotentialPerfomance = { starts_at, ends_at, time_lapse };

  if (branch_ids) {
    params.branch_ids = branch_ids;
  }

  if (filter['loc_id[]']) {
    params['loc_id[]'] = filter['loc_id[]'];
  }
  return params;
};

const getAllClientPotentialPerfomance = async (
  filter: FilterPotentialPerfomance = {},
) => {
  const token = await login();
  try {
    let Authorization = `Bearer ${token}`;
    let params = normalizeFilterParams(filter);
    const {data} = await request.get('/performance/clientes-potenciales', {
      params,
      paramsSerializer: params =>
        qs.stringify(params, { arrayFormat: 'repeat' }),
      headers: {
        accept: '*/*',
        Authorization,
      },
    });
    return data;
  } catch (e) {
    return [];
  }
};

export default {
  login,
  getAllClientPotentialPerfomance,
};
