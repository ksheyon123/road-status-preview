export type HighwayInfo = {
  route_id: string;
  route_name: string;
  start_point: string;
  end_point: string;
  distance: number;
};

export type RouteInfo = {
  route_id: string;
  route_name: string;
  start_point: string;
  end_point: string;
  updated_at: string;
  directions: {
    forward: {
      sections: SectionInfo[];
    };
    reverse: {
      sections: SectionInfo[];
    };
  };
};

export type SectionInfo = {
  section_id: string;
  start_name: string;
  end_name: string;
  distance: number;
  order_num: number;
  status: "SMOOTH" | "SLOW" | "CONGESTED";
  travel_time: number;
  speed: number;
};
