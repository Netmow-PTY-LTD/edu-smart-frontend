import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';

export const useCustomData = () => {
  const { data: userInfoData } = useGetUserInfoQuery();

  let paneltext = '';
  let hideforadmissionmanger = '';
  let hideforaccountant = '';

  if (userInfoData?.data?.role === 'admission_manager') {
    paneltext = 'admission-managers';
    hideforadmissionmanger = `hide-div-for-manager`;
  }
  if (userInfoData?.data?.role === 'super_admin') {
    paneltext = 'super-admin';
  }

  if (userInfoData?.data?.role === 'accountant') {
    paneltext = 'accountant';
    hideforaccountant = `hide-div-for-accountant`;
  }

  if (userInfoData?.data?.role === 'agent') {
    paneltext = 'agent';
  }

  if (userInfoData?.data?.role === 'student') {
    paneltext = 'student';
  }

  return { paneltext, hideforadmissionmanger, hideforaccountant };
};
