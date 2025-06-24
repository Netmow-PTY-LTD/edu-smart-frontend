import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import LoaderSpiner from '@/components/constants/Loader/LoaderSpiner';
import AddTeamModal from '@/components/sAdminDashboard/modals/AddTeamModal';
import Cookies from 'js-cookie';
import EditTeamModal from '@/components/sAdminDashboard/modals/EditTeamModal';
import { List } from 'react-movable';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Teams = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const token = Cookies.get('token');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_PROD || '';

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/v1/team`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch');

      const result = await res.json();

      const fixedMembers = (result?.data || []).map((m) => ({
        ...m,
        image: m.image?.startsWith('http') ? m.image : `${baseUrl}${m.image}`,
      }));

      setMembers(fixedMembers);
    } catch (error) {
      toast.error('Failed to fetch members');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this member?')) return;
    try {
      const res = await fetch(`${baseUrl}/api/v1/team/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success('Member deleted');
        fetchMembers();
      } else {
        toast.error('Failed to delete member');
      }
    } catch {
      toast.error('Server error on delete');
    }
  };

  const updateMembersOrder = async (updatedMembers) => {
    try {
      const res = await fetch(`${baseUrl}/api/v1/team/update-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ members: updatedMembers }),
      });

      if (!res.ok) throw new Error('Failed to update order');
      toast.success('Order updated successfully');
    } catch {
      toast.error('Error updating order');
    }
  };

  const handleDragEnd = ({ oldIndex, newIndex }) => {
    const updated = [...members];
    const [moved] = updated.splice(oldIndex, 1);
    updated.splice(newIndex, 0, moved);
    setMembers(updated);
    updateMembersOrder(updated);
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="container-fluid">
          <ToastContainer />
          {loading ? (
            <LoaderSpiner />
          ) : (
            <Card className="shadow-sm">
              <CardHeader className="d-flex justify-content-between flex-column flex-md-row gap-2 gap-md-0 mb-4 bg-light border-bottom ">
                <h1 className="text-secondary-alt fw-semibold">
                  Team Members
                </h1>
                <button className="button px-4 py-2" onClick={() => setShowAddModal(true)}>
                  Add Team Member <i className="ri-add-line fw-bolder"></i>
                </button>
              </CardHeader>

{/* card body */}
              <CardBody className="p-0">
                <div className="table-responsive">
                    <List
                    values={members}
                    onChange={handleDragEnd}
                    renderList={({ children, props }) => (
                        <table className="table table-hover mb-0 align-middle">
                        <thead className="table-secondary text-muted text-uppercase small">
                            <tr>
                            <th></th>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Country</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody {...props}>{children}</tbody> {/* Important fix */}
                        </table>
                    )}
                    renderItem={({ value: member, props, isDragged, index }) => (
                        <tr
                        {...props}
                        key={member._id}
                        className={`team-row drag-handle ${isDragged ? 'dragged' : ''}`}
                        style={{
                            ...props.style,
                            height: '65px',
                        }}
                        >
                        <td>
                          <i class="bi bi-grip-vertical fs-2"></i>
                        </td>
                        <td className="align-middle">{index + 1}</td>
                        <td className="align-middle">
                            {member.image ? (
                            <img
                                src={member.image}
                                alt={member.name}
                                className="rounded-circle"
                                style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                                border: '1px solid #dee2e6',
                                }}
                            />
                            ) : (
                            <div
                                className="d-flex justify-content-center align-items-center bg-light text-muted rounded-circle"
                                style={{ width: '50px', height: '50px' }}
                            >
                                N/A
                            </div>
                            )}
                        </td>
                        <td className="align-middle fw-semibold">{member.name}</td>
                        <td className="align-middle">{member.designation}</td>
                        <td className="align-middle">{member.contact || '-'}</td>
                        <td className="align-middle">{member.email}</td>
                        <td className="align-middle">{member.country}</td>
                        <td className="align-middle">
                            <Dropdown
                            isOpen={dropdownOpen === member._id}
                            toggle={() => toggleDropdown(member._id)}
                            >
                            <DropdownToggle
                              tag="a"
                              className="text-reset dropdown-btn"
                              role="button"
                            >
                              <span className="button px-3">
                                <i className="ri-more-fill align-middle"></i>
                              </span>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem
                                onClick={() => {
                                    setSelectedMember(member);
                                    setShowEditModal(true);
                                    setDropdownOpen(null);
                                }}
                                >
                                  <i className="ri-pencil-fill align-start me-2 text-muted"></i>
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                onClick={() => {
                                    setDropdownOpen(null);
                                    handleDelete(member._id);
                                }}
                                >
                                  <i className="ri-close-circle-fill align-start me-2 text-danger"></i>
                                Delete
                                </DropdownItem>
                            </DropdownMenu>
                            </Dropdown>
                        </td>
                        </tr>
                    )}
                    />
                  <div style={{ height: '80px' }} />
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>

      <AddTeamModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        onMemberAdded={fetchMembers}
      />

      {selectedMember && (
        <EditTeamModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          member={selectedMember}
          onMemberUpdated={fetchMembers}
        />
      )}
    </Layout>
  );
};

export default Teams;
