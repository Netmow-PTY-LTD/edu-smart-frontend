import AgentLayout from '@/components/clientSite/agent/AgentLayout';
import HomeMission from '@/components/clientSite/agent/Home/HomeMission';
import HomeSlider from '@/components/clientSite/agent/Home/HomeSlider';
import HomeUniversities from '@/components/clientSite/agent/Home/HomeUniversities';
import React from 'react';

export default function AgentHome() {
  return (
    <AgentLayout>
      <HomeSlider />
      <HomeUniversities />
      <HomeMission/>
    </AgentLayout>
  );
}
