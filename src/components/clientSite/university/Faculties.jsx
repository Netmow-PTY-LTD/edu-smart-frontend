import AllCoursesLayoutUniversity from "@/components/university/components/AllCourses/AllCoursesLayoutUniversity";


export default function UniversityFaculties({universityId }) {
  return (
    <section className="university-faculties">
      <div className="container">
        <div className="sec-heading">
          <h2>Our Courses</h2>
          <p>
            Malaysia started focusing on the development of telecommunication,
            Telekom Malaysia Berhad (TM) took a leap of faith by establishing
            the first private-owned higher learning institute..
          </p>
        </div>
        <div>
          <AllCoursesLayoutUniversity university_id={universityId} />
        </div>
      </div>
    </section>
  );
}
