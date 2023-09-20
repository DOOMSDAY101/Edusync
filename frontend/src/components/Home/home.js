import "./home.css";
import Studying from "./Studying.jpg";
import Studying1 from "./Studying1.jpg";
import Studying2 from "./studying2.webp";

function Home() {
  return (
    <div className="home_item">
      <div class="row  row-cols-md-3 g-3">
        <div class="col">
          <div class="card">
            <img src={Studying2} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Certified Teachers</h5>
              <p class="card-text">
                Accreditation ensures that other accredited schools and universities recognize our students’ transcripts, credits, and courses.
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src={Studying1} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Special Education</h5>
              <p class="card-text">
                Students can enroll at any time during the year and counselors will work to align the coursework to match up to previously completed work from the other school.
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src={Studying} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Anytime Learning</h5>
              <p class="card-text">
                We take the classroom to wherever you may be, regardless of timezone, provided a reliable internet connection is available. Lessons can also be completed offline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
