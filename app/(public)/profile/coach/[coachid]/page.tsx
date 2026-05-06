import Footer from "@/components/common/footer";
import Nav from "@/components/common/nav";
import CoachProfileCard from "./component/coach-profile-card";

 

export default function page() {
    return <section>

      <Nav/>

      <div className="">

        <CoachProfileCard/>
      </div>


      <Footer/>

    </section>
}