import React from "react";
import { RequestsListProps } from "../../types/request.types";
import CardList from "./Card";

const RequestsList: React.FC<RequestsListProps> = ({ requests: requests }) => {
  const cardsData = [
    {
      title: "אינסטלציה",
      subtitle: "נדרש רכב",
      description: "ישראל ישראלי",
      location: "רחובות"
    },
    {
        title: "אינסטלציה",
        subtitle: "נדרש רכב",
        description: "ישראל ישראלי",
        location: "רחובות"
      },
      {
        title: "אינסטלציה",
        subtitle: "נדרש רכב",
        description: "ישראל ישראלי",
        location: "רחובות"
      },
    // Add more cards as needed
  ];

  return (
    <div>
      <CardList cardsData={requests} />
    </div>
  )
};

export default RequestsList;
