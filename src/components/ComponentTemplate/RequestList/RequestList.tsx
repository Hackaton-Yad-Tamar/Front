import { FC, useEffect, useState } from "react";
import { User } from "../../../types/userType";
import { RequestCard } from "./RequestCard";

export interface RequestList {
  requests: User[];
  isFiltered?: boolean;
}

export const RequestList: FC<RequestList> = ({
  requests,
  isFiltered = false,
}) => {
  const [filteredRequests, setFilteredRequests] = useState<User[]>([]);

  useEffect(() => {
    const updatedRequests = isFiltered
      ? requests.filter(({ approvedBy }) => approvedBy === "")
      : requests;

    setFilteredRequests(updatedRequests);
  }, [requests, isFiltered]);

  return (
    <>
      {filteredRequests.map((request) => (
        <RequestCard key={request.id} {...{ request }} />
      ))}
    </>
  );
};
