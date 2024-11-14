import Link from "next/link";
import React from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const AddItems = () => {
  return (
    <>
      <div className=" d-md-flex flex-grow-1 dropdown ms-2 topbar-topbar-head-dropdown header-item ">
        <UncontrolledDropdown className="card-header-dropdown">
          <DropdownToggle tag="a" className="  d-flex" role="button">
            <div
              className="button p-3 fs-4 text-black"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              id="additembtn"
            >
              <i className="ri-add-circle-line align-middle me-1 text-black"></i>
              <span>ADD</span>
            </div>
          </DropdownToggle>
          <DropdownMenu className="mt-3 dropdown-menu-end">
            <DropdownItem>
              <div>
                <Link href="/admin/add-player">
                  <i className="ri-add-line align-middle me-2"></i>
                  Add Player
                </Link>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div>
                <Link href="/admin/add-guardian">
                  <i className="ri-add-line align-middle me-2"></i>
                  Add Guardians
                </Link>
              </div>
            </DropdownItem>
            <DropdownItem>
              <div>
                <Link href="/admin/add-new-team">
                  <i className="ri-add-line align-middle me-2"></i>
                  Add Team
                </Link>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </>
  );
};

export default AddItems;
