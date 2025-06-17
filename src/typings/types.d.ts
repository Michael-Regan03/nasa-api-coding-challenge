type RespExampleType = {
  id: number;
  version: string;
  envVal: string;
};

export type ApodResponseType = {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};


export type NeoResponseType = {
  links: {
    next: string;
    previous: string;
    self: string;
  };
  element_count: number;
  near_earth_objects: {
    [date: string]: NearEarthObject[];
  };
};

export type NearEarthObject = {
  links: {
    self: string;
  };
  id: string;
  neo_reference_id: string;
  name: string;
  designation?: string,
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: DiameterRange;
    meters: DiameterRange;
    miles: DiameterRange;
    feet: DiameterRange;
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproachData[];
  is_sentry_object: boolean;
  orbital_data?: OrbitalData;
};

export type DiameterRange = {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
};

export type CloseApproachData = {
  close_approach_date: string;
  close_approach_date_full?: string;
  epoch_date_close_approach: number;
  relative_velocity: {
    kilometers_per_second: number;
    kilometers_per_hour: number;
    miles_per_hour: number;
  };
  miss_distance: {
    astronomical: number;
    lunar: number;
    kilometers: number;
    miles: number;
  };
  orbiting_body: string;
};
export type OrbitalData = {
  orbit_id: string;
  orbit_determination_date: string;
  first_observation_date: string;
  last_observation_date: string;
  data_arc_in_days: number;
  observations_used: number;
  orbit_uncertainty: string;
  minimum_orbit_intersection: number;
  jupiter_tisserand_invariant: number;
  epoch_osculation: number;
  eccentricity: number;
  semi_major_axis: number;
  inclination: number;
  ascending_node_longitude: number;
  orbital_period: number;
  perihelion_distance: number;
  perihelion_argument: number;
  aphelion_distance: number;
  perihelion_time: number;
  mean_anomaly: number;
  mean_motion: number;
  equinox: string;
  orbit_class: OrbitClass;
};

export type OrbitClass = {
  orbit_class_type: string;
  orbit_class_description: string;
  orbit_class_range: string;
};

