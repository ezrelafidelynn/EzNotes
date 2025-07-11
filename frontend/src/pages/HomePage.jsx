import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import { formatDate } from "../lib/utils";
import axios from "axios";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false); // default false
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes");
                console.log(res.data);
                setNotes(res.data);
                setIsRateLimited(false);
            } catch (error) {
                console.error("Error fetching notes", error);
                if (error.response?.status === 429) {
                    setIsRateLimited(true); // HTTP 429 = Too Many Requests
                }else{
                    toast.error("Failed to load notes");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar />
            {isRateLimited && <RateLimitedUI />} 
            
            {loading && <div className="text-center text-primary py-10">Loading...</div>}
            
            {notes.length === 0 && !isRateLimited && <NotesNotFound />}
            
            {notes.length > 0 && !isRateLimited && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                    <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                ))}
                </div>
            )}
                
        </div>
    );
};

export default HomePage;
