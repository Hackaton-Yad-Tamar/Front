type RequestTypeRelation = {
    type_name: string; // Keeping this as it appears in the response
    id: number;
  };
  
  export type MyRequest = {
    description: string;
    status: number;
    assigned_volunteer_id: string;
    preferred_datetime: string; // Can be Date if parsed
    created_at: string; // Can be Date if parsed
    id: string;
    family_id: string;
    request_type: number;
    city: number;
    is_urgent: boolean;
    expected_completion: string; // Can be Date if parsed
    request_type_relation: RequestTypeRelation;
  };
  