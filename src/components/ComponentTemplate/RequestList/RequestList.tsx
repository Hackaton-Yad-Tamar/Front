import { Dispatch, FC, SetStateAction, useState } from "react";
import { User } from "../../../types/userType";
import { RequestCard } from "./RequestCard";
import { SearchBar } from "./SearchBar/SearchBar";
export interface RequestList {
  requests: User[];
  isFiltered?: boolean;
  setSelectedRequest: Dispatch<SetStateAction<User | undefined>>;
}

export const RequestList: FC<RequestList> = ({
  requests,
  isFiltered = false,
  setSelectedRequest,
}) => {
  const [filteredRequests, setFilteredRequests] = useState<User[]>([]);

  return (
    <>
      <SearchBar {...{ setFilteredRequests, requests, isFiltered }} />
      {filteredRequests.map((request) => (
        <RequestCard
          key={request.id}
          {...{ request, setSelectedRequest }}
          isEditable={!isFiltered}
        />
      ))}
    </>
  );
};
