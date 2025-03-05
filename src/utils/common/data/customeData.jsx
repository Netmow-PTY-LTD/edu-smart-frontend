import { useGetUserInfoQuery } from '@/slice/services/common/userInfoService';

export const useCustomData = () => {
  const { data: userInfoData } = useGetUserInfoQuery();

  let paneltext = '';
  let hideforadmissionmanger = '';
  let hideforaccountant = '';
  let needhidemanageryes = '';
  let hideInAccountant = '';
  let showInSuperAdmin = '';

  if (userInfoData?.data?.role === 'admission_manager') {
    paneltext = 'admission-manager';
    hideforadmissionmanger = `hide-div-for-manager`;
    needhidemanageryes = 'yes';
  }

  if (userInfoData?.data?.role === 'super_admin') {
    paneltext = 'super-admin';
    showInSuperAdmin = 'yes';
  }

  if (userInfoData?.data?.role === 'accountant') {
    paneltext = 'accountant';
    hideforaccountant = `hide-div-for-accountant`;
    hideInAccountant = 'yes';
  }

  if (userInfoData?.data?.role === 'agent') {
    paneltext = 'agent';
  }

  if (userInfoData?.data?.role === 'student') {
    paneltext = 'student';
  }

  return {
    paneltext,
    hideforadmissionmanger,
    hideforaccountant,
    needhidemanageryes,
    hideInAccountant,
    showInSuperAdmin,
  };
};
