import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api/API";

function QueryRepaly() {
    const [queries, setQueries] = useState([]);
    const [replay, setReplay] = useState("");

    // useEffect to fetch queries 
    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const res = await api.get("/api/query");
                setQueries(res.data?.query);
            } catch (error) {
                console.log("Error to fetch queries", error);
            }
        };
        fetchQueries();
    }, []);

    // Handler submitting a reply
    const handleSubmit = async (e, query) => {
        e.preventDefault();
        try {
            const res = await api.post("/api/query/replay", { replay, email: query.email, _id: query._id });
            if (res.status === 200) {
                toast.success("Send reply successful")
                setReplay("");
            }
        } catch (error) {
            toast.error("Error to send reply")
        }
    };

    return (
        <div className="p-8">
            {queries.length > 0 ? (
                queries.map((query) => (
                    <div key={query._id} className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-white my-8">
                        <h1 className="text-2xl font-semibold mb-2">{query.firstname} {query.lastname}</h1>
                        <p className="text-gray-700 mb-4">{query.email}</p>
                        <h1 className="text-xl font-bold mb-2">{query.queryType}</h1>
                        <h2 className="text-lg text-gray-600 mb-4">{query.description}</h2>
                        <form onSubmit={(e) => handleSubmit(e, query)}>
                            <div className="mb-4">
                                <label className="block font-medium mb-1">Replay</label>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-md resize-none"
                                    rows="4"
                                    value={replay}
                                    onChange={(e) => setReplay(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
                                Replay
                            </button>
                        </form>
                    </div>
                ))
            ) : (
                <p className="text-center text-lg text-gray-600">No queries available.</p>
            )}
        </div>
    );
}

export default QueryRepaly