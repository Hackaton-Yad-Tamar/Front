export interface Request {
    name: string;
    emergencyType: string;
    location: string;
    severity: string;
    responseStatus: string;
}

export interface RequestsListProps {
    requests: Request[];
}

export interface RequestDialogProps {
    open: boolean;
    onClose: () => void;
    emergency: {
        name: string;
        emergencyType: string;
        location: string;
        severity: string;
        responseStatus: string;
        description?: string
    } | null;
}