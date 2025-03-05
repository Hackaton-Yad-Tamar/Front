export type Request = {
  id: string;
  family_id: string;
  request_type: REQUEST_TYPE;
  title: string;
  description?: string;
  city: string;
  status: STATUS;
  is_urgent: boolean;
  assigned_volunteer_id?: string;
  expected_completion?: string;
  preferred_datetime?: string;
  created_at: string;
};

export enum STATUS {
  'none',
  'מחפש מתנדב',
  'ממתין לאישור המתנדב',
  'בטיפול',
  'טופל',
}

export enum REQUEST_TYPE {
  'none',
  'shopping_help',
  'building_issue',
  'electricity_work',
  'water_leak',
  'gas_issue',
}
