import AgentLayout from '@/components/clientSite/agent/AgentLayout';
import HomeSlider from '@/components/clientSite/agent/Home/HomeSlider';
import HomeUniversities from '@/components/clientSite/agent/Home/HomeUniversities';
import PopularCourses from '@/components/clientSite/agent/Home/PopularCourses';
import React from 'react';

export default function AgentHome() {
  return (
    <AgentLayout>
      <HomeSlider />
      <HomeUniversities />
      <PopularCourses/>
    </AgentLayout>
  );
}
