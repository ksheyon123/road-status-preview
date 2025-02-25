export type HighwayInfo = {
  highways: {
    route_display_id: string;
    route_id: string;
    route_name: string;
    start_point: string;
    end_point: string;
    distance: number;
  }[];
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
  hasAccident?: boolean;
};

export type AccidentInfo = {
  accidents: {
    occurred_at: string;
    route_id: string;
    direction: string;
    accident_type: string;
    accident_detail_type: string;
    description: string;
    coordinates: {
      x: number;
      y: number;
    };
    conzone_id: string;
    cleared_at: string;
    start_name: string;
    end_name: string;
  }[];
};
