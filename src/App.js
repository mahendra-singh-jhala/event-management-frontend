import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import EventForm from "./components/Event/EventForm";
import EventList from "./components/Event/EventList";
import TicketForm from "./components/Tickets/TicketForm";
import TicketList from "./components/Tickets/TicketList";
import Payment from "./payment/Payment";
import RegisterForm from "./pages/auth/Register";
import LoginForm from "./pages/auth/Login";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import IsAuth from "./pages/Auth";
import Navbar from "./pages/nav/Navbar";
import EventDetails from "./components/Event/EventDetails";
import Home from "./pages/Home";
import TicketSelectionPage from "./components/Tickets/SelectTickets";
import Dashbord from "./pages/admin/Dashbord";
import ConfirmTicket from "./components/Tickets/ConfirmTicket";
import Profile from "./pages/user/Profile";
import ChangePassword from "./pages/user/ChangePassword";
import UpdateProfile from "./pages/user/UpdateProfilte";
import DeleteTicket from "./components/Tickets/DeleteTicket";
import FeedbackForm from "./pages/user/Feedback";
import QueryForm from "./pages/user/Query";
import Calendar from "./pages/Calendar";
import QueryRepaly from "./pages/user/QueryRepaly";
import AdminProfile from "./pages/admin/AdminProfile";
import UpdateAdminProfile from "./pages/admin/UpdateAdminProfile";
import UpdateEventForm from "./pages/admin/UpdateEventForm";
import AdminRoutes from "./components/routes/AdminRoutes";
import PrivateRoutes from "./components/routes/PrivateRoutes";



function App() {

    return (
        <Router>
            <Toaster position="top-right" />

            <header>
                <Navbar />
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route element={<IsAuth />}>
                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                    </Route>
                    <Route path="/event" element={<EventList />} />
                    <Route element={<PrivateRoutes />} >
                        <Route path="/eventForm" element={<EventForm />} />
                        <Route path="/event/:id" element={<EventDetails />} />
                        <Route path="/createTicket" element={<TicketForm />} />
                        <Route path="/tickets" element={<TicketList />} />
                        <Route path="/event/:id/ticket" element={<TicketSelectionPage />} />
                        <Route path="/payment/:id" element={<Payment />} />
                        <Route path="/userticket" element={<ConfirmTicket />} />
                        <Route path="/cancelTicket/:ticketId" element={<DeleteTicket />} />
                        <Route path="/changepassword" element={<ChangePassword />} />
                        <Route path="/updateprofile" element={<UpdateProfile />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/feedback" element={<FeedbackForm />} />
                        <Route path="/query" element={<QueryForm />} />
                        <Route path="/calendar" element={<Calendar />} />
                    </Route>
                    <Route element={<AdminRoutes />}>
                        <Route path="/dashboard" element={<Dashbord />}>
                            <Route path="event" element={<EventList />} />
                            <Route path="people" element={<EventList />} />
                            <Route path="getQuery" element={<QueryRepaly />} />
                            <Route path="calendar" element={<Calendar />} />
                            <Route path="adminProfile" element={<AdminProfile />} />
                            <Route path="tickets" element={<TicketList />} />
                        </Route>
                        <Route path="/updateAdminprofile" element={<UpdateAdminProfile />} />
                        <Route path="/event/:id/updateForm" element={<UpdateEventForm />} />
                        <Route path="/getQuery" element={<QueryRepaly />} />
                        <Route path="/adminProfile" element={<AdminProfile />} />
                    </Route>
                </Routes>
            </main>
        </Router>
    );
}

export default App;
