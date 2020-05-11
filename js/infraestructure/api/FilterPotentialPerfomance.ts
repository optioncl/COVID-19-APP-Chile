export default interface FilterPotentialPerfomance {
  starts_at?: String;
  ends_at?: String;
  branch_ids?: String | Number;
  'loc_id[]'?: Array<String> | String;
  time_lapse?: String;
};
