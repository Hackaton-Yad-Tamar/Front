import React from "react";
import "./i18n/config";
import FamilyView from "./views/FamilyView/FamilyView";

export const themeColors = {
    lightBlue: "#00AEEE",
    lightGreen: "#67B446",
    darkBlue: "#002F42",
    orange: "#FF8E00"
}

const App: React.FC = () => {
    return (
        <FamilyView/>
    );
};

export default App;