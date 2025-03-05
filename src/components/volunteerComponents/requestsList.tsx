import React from "react";
import { RequestsListProps } from "../../types/request.types";
import CardList from "./Card";

const RequestsList: React.FC<RequestsListProps> = ({ requests: requests }) => {
  return (
    <div>
      <CardList cardsData={requests} />
    </div>
  )
};

export default RequestsList;
