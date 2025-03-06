import { City } from "./userType";

export type Request = {
  id: string;
  familyId: string;
  requestType: RequestType;
  description: string;
  city: City;
  status: RequestStatus;
  isUrgent: boolean;
  assignesdVolenteerId: string;
  expertCompletion: Date;
  preferedDatetime: Date;
  createdAt: Date;
};

export enum RequestStatus {
  Searching = 1,
  InProgress = 2,
  Done = 3,
}

export const requestStatusMapper: Record<RequestStatus, string> = {
  [RequestStatus.Searching]: "מחפש מתנדב",
  [RequestStatus.InProgress]: "בטיפול",
  [RequestStatus.Done]: "טופל",
};

export enum RequestType {
  shoppingHelp = 1,
  buildingIssue = 2,
  electricityWork = 3,
  waterLeak = 4,
  gasIssue = 5,
}

export const requestTypeMapper: Record<RequestType, string> = {
  [RequestType.shoppingHelp]: "עזרה בקניות",
  [RequestType.buildingIssue]: "תקלת בינוי",
  [RequestType.electricityWork]: "תקלת חשמל",
  [RequestType.waterLeak]: "דליפת מים",
  [RequestType.gasIssue]: "תקלת גז",
};

export const requestTypeList = [
  "shoppingHelp",
  "buildingIssue",
  "electricityWork",
  "waterLeak",
  "gasIssue",
];
