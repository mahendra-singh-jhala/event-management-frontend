import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api/API";

function QueryForm() {
    const [queryType, setqueryType] = useState("");
    const [description, setDescription] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");

    // Handler form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { queryType, description, firstname, lastname, email }
        try {
            const res = await api.post("/api/query", user)
            if(res.data) {
                toast.success("Query send Succseful")
                setqueryType("")
                setDescription("")
                setFirstname("")
                setLastname("")
                setEmail("")
            }
        } catch (error) {
            toast.error("Error to send query")
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                    <h1 className="text-2xl font-bold mb-2">Query Form</h1>
                    <p className="text-gray-600 mb-6 text-xs">We would love to hear your queries or reports so we can assist you better!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Query Type</label>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        value="Query"
                                        checked={queryType === "Query"}
                                        onChange={(e) => setqueryType(e.target.value)}
                                        className="mr-2"

                                    />
                                    <label className="text-gray-700">Query</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        value="Report"
                                        checked={queryType === "Report"}
                                        onChange={(e) => setqueryType(e.target.value)}
                                        className="mr-2"
                                    />
                                    <label className="text-gray-700">Report</label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Description:</label>
                            <textarea
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Name</label>
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    placeholder="First Name"
                                    className="w-1/2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"

                                />
                                <input
                                    type="text" value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    placeholder="Last Name"
                                    className="w-1/2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"

                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2">E-mail</label>
                            <input
                                type="email" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="myname@example.com"
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none">Submit</button>
                        </div>
                    </form>
                </div>
        </div>
    );
}

export default QueryForm
