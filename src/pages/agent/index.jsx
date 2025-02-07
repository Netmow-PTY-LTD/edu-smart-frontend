import AgentLayout from '@/components/clientSite/agent/AgentLayout';
import AgentPopularCourses from '@/components/clientSite/agent/Home/AgentPopularCourses';
import AgentServices from '@/components/clientSite/agent/Home/AgentServices';
import HomeSlider from '@/components/clientSite/agent/Home/HomeSlider';
import HomeUniversities from '@/components/clientSite/agent/Home/HomeUniversities';

import React from 'react';

export default function AgentHome() {
  return (
    <AgentLayout>
      <HomeSlider />
      <HomeUniversities />
      <AgentServices />
      <AgentPopularCourses />
    </AgentLayout>
  );
}
