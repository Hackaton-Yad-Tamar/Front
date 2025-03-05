import { Request, RequestStatus, RequestType } from "./types/requestType";
import { City } from "./types/userType";

const mockRequest: Request = {
  id: "21345876",
  assignesdVolenteerId: "21345876",
  description: "אני רוצה בק",
  expertCompletion: new Date(),
  familyId: "21345876",
  isUrgent: false,
  preferedDatetime: new Date(),
  requestType: RequestType.buildingIssue,
  status: RequestStatus.InProgress,
  city: City.Ashdod,
  createdAt: new Date(),
  title: "בקבקבק",
  carNeeded: true,
};

export default mockRequest;
