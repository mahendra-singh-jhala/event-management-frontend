import Main from "../ui/Main";
import Footer from "../ui/Footer";
import EventList from "../components/Event/EventList";
import Feedback from "./admin/feedback/Feedback";

function Home() {
    return (
        <div>
            <Main />
            <EventList />
            <Feedback />
            <Footer />
        </div>
    )
}

export default Home
