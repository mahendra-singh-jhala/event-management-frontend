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
import IsAuth from "./pages/Auth";
import Navbar from "./pages/nav/Navbar";
import EventDetails from "./components/Event/EventDetails";
import Home from "./pages/Home";
import TicketSelectionPage from "./components/Tickets/SelectTickets";
import Dashbord from "./pages/admin/Dashbord";
import ConfirmTicket from "./components/Tickets/ConfirmTicket";
import DeleteTicket from "./components/Tickets/DeleteTicket";
import Calendar from "./pages/Calendar";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import ForgetPassword from "./pages/auth/password/ForgetPassword";
import ResetPassword from "./pages/auth/password/ResetPassword";
import QueryForm from "./pages/user/query/Query";
import QueryRepaly from "./pages/user/query/QueryRepaly";
import FeedbackForm from "./pages/user/feedback/Feedback";
import Profile from "./pages/user/profile/Profile";
import UpdateProfile from "./pages/user/profile/UpdateProfilte";
import ChangePassword from "./pages/user/profile/ChangePassword";
import UpdateEventForm from "./pages/admin/event/UpdateEventForm";
import UpdateAdminProfile from "./pages/admin/profile/UpdateAdminProfile";
import AdminProfile from "./pages/admin/profile/AdminProfile";


function App() {

    return (
        <Router>
            <AuthProvider>
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
                        <Route path="/eventForm" element={<EventForm />} />
                        <Route element={<ProtectedRoute roles={["User"]} />} >
                            <Route path="/event/:id" element={<EventDetails />} />
                            <Route path="/tickets" element={<TicketList />} />
                            <Route path="/event/:id/ticket" element={<TicketSelectionPage />} />
                            <Route path="/payment/:id" element={<Payment />} />
                            <Route path="/userticket" element={<ConfirmTicket />} />
                            <Route path="/cancelTicket/:ticketId" element={<DeleteTicket />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/updateprofile" element={<UpdateProfile />} />
                            <Route path="/changepassword" element={<ChangePassword />} />
                            <Route path="/feedback" element={<FeedbackForm />} />
                            <Route path="/query" element={<QueryForm />} />
                            <Route path="/calendar" element={<Calendar />} />
                        </Route>
                        <Route element={<ProtectedRoute roles={["Admin"]} />} >
                            <Route path="/adminDashboard" element={<Dashbord />}>
                                <Route path="event" element={<EventList />} />
                                <Route path="people" element={<EventList />} />
                                <Route path="getQuery" element={<QueryRepaly />} />
                                <Route path="calendar" element={<Calendar />} />
                                <Route path="adminProfile" element={<AdminProfile />} />
                                <Route path="tickets" element={<TicketList />} />
                            </Route>
                            <Route path="/event/:id" element={<EventDetails />} />
                            <Route path="/event/:id/updateForm" element={<UpdateEventForm />} />
                            <Route path="/adminProfile" element={<AdminProfile />} />
                            <Route path="/updateAdminprofile" element={<UpdateAdminProfile />} />
                            <Route path="/createTicket" element={<TicketForm />} />
                            <Route path="/getQuery" element={<QueryRepaly />} />
                        </Route>
                    </Routes>
                </main>
            </AuthProvider>
        </Router>
    );
}

export default App;
