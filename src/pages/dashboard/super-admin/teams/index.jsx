import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import AddTeamModal from '@/components/sAdminDashboard/modals/AddTeamModal';

const Teams = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/team');
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      toast.error('Failed to fetch members');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <ToastContainer />
          {loading ? (
            <LoaderSpiner />
          ) : (
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <h1 className="mb-0">Team Members</h1>
                <Button color="primary" onClick={() => setShowModal(true)}>
                  + Add Team Member
                </Button>
              </CardHeader>

              <CardBody>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Country</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member, index) => (
                        <tr key={index}>
                          <td>{member.name}</td>
                          <td>{member.designation}</td>
                          <td>{member.contact || '-'}</td>
                          <td>{member.email}</td>
                          <td>{member.country}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>

      <AddTeamModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onMemberAdded={fetchMembers}
      />
    </Layout>
  );
};

export default Teams;
