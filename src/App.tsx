import React from "react";

import { ContentBlankLayout, ContentWithHeaderFragment } from "./layout";
import { PersonBuildingListContainer, PersonTabsContainer, HeaderContainer } from "./containers";

const App: React.FC = () => (
    <ContentBlankLayout>
        <ContentWithHeaderFragment>
            <HeaderContainer />
            <div>
                <PersonTabsContainer />
                <PersonBuildingListContainer />
            </div>
        </ContentWithHeaderFragment>
    </ContentBlankLayout>
);

export default App;
