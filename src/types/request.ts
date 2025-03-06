export type RequestType = {
    id: number;
    type_name: string;
};

export type RequestStatus = {
    id: number;
    status_name: string;
    status_color: string;
}

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
    requires_vehicle: boolean;
};

export type AllRequest = {
    request: MyRequest;
    request_type: RequestType;
    status: RequestStatus;
}
