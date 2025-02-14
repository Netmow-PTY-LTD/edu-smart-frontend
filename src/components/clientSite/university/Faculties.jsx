import AllCoursesLayoutUniversity from '@/components/university/components/AllCourses/AllCoursesLayoutUniversity';

export default function UniversityFaculties({ coursesSubtitle, universityId }) {
  return (
    <section className="university-faculties">
      <div className="container">
        <div className="sec-heading">
          <h2>Our Courses</h2>
          <p>{coursesSubtitle ? coursesSubtitle : ''}</p>
        </div>
        <div>
          <AllCoursesLayoutUniversity university_id={universityId} />
        </div>
      </div>
    </section>
  );
}
