import { City } from "./userType";

export type Request = {
    id: string;
    familyId: string;
    requestType: RequestType;
    description: string;
    city: City;
    status: Status;
    isUrgent: boolean;
    assignesdVolenteerId: string;
    expertCompletion: Date;
    preferedDatetime: Date;
    createdAt: Date;
  };
  
  
  export enum Status {
    Searching = "מחפש מתנדב",
    Waiting = "ממתין לאישור המתנדב",
    InProgress = "בטיפול",
    Done = "טופל"
  }

  export enum RequestType {
    shoppingHelp = "עזרה בקניות",
    buildingIssue = "תקלת בינוי",
    electricityWork = "תקלה בחשמל",
    waterLeak = "דליפת מים",
    gasIssue = "בעית גז"
  }

export const requestTypeList = ["shoppingHelp", "buildingIssue", "electricityWork", "waterLeak", "gasIssue"]
  