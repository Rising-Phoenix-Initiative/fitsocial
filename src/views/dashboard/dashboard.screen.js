import React from 'react';

import {
    DashboardContainer,
    SideContent,
    Wrapper,
} from './dashboard.styles';

import Navigation from './components/navigation/navigation.components';
import Widgets from './components/widgets/widgets.component';
import MainContent from './components/main/main-content.component';
import NewPostDialog from '../../components/post/new-post-dialog.component';

const Dashboard = () => {

    return (
        <DashboardContainer>
            <Navigation />
            <Wrapper>
                <MainContent />
                <SideContent>
                    <Widgets />
                </SideContent>
            </Wrapper>
            <NewPostDialog />
        </DashboardContainer>
    );
};

export default Dashboard;