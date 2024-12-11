import UniversitySponsorsForm from "@/components/common/alldashboardCommon/UniversitySponsorsForm";
import Layout from "@/components/layout";
import { Col, Row } from "reactstrap";

export default function UniversitySponsors() {
  return (
    <Layout>
      <div className="page-content">
        <Row>
          <Col lg={9}>
            <UniversitySponsorsForm />
          </Col>
        </Row>
      </div>
    </Layout>
  );
}
