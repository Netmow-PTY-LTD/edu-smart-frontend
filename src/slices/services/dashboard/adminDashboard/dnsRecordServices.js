const { baseURL } = require('@/slices/helper/helper');
const { default: axios } = require('axios');

const addDNSService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/dns-record',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};
const getAllDNSservice = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/dns-record',
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};
const deleteDNSservice = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/dns-record/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};
const updateDnsSettingsService = async (data) => {
  const token = localStorage.getItem('token');
  const id = data.id;
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + `/admin/api/v1/dns-record/${id}`,
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};
const updateDomainNameService = async (data) => {
  const token = localStorage.getItem('token');
  const res = await axios.patch(
    process.env.NEXT_PUBLIC_BASE_URL_PROD + '/admin/api/v1/domain-name',
    data,
    {
      headers: {
        authorization: token,
      },
    }
  );
  //
  return res.data;
};

export const dnsServices = {
  addDNSService,
  getAllDNSservice,
  deleteDNSservice,
  updateDomainNameService,
  updateDnsSettingsService,
};
