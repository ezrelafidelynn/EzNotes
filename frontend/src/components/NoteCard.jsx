import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { formatDate } from "../lib/utils.js";
import api from "../lib/axios.js";
import axios from "axios";

const NoteCard = ({ note, setNotes }) => {
    const handleDelete = async (e, id) => {
        // Prevent propagation if wrapped in clickable element
        e.preventDefault();

        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter((note) => note._id !== id));
            toast.success("Note deleted successfully");
        } catch (error) {
            console.error("Error in handleDelete", error);
            toast.error("Failed to delete note");
        }
    };

    return (
        <div className="card bg-base-100 hover:shadow-xl transition-all duration-200 border-t-4 border-solid border-[#f04cf0] mx-7 my-7">
            <div className="card-body">
                <Link to={`/note/${note._id}`} className="block">
                    <h3 className="card-title text-base-content hover:underline">{note.title}</h3>
                </Link>
                <p className="text-base-content/70 line-clamp-3">{note.content}</p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className="flex items-center gap-1">
                        <Link to={`/note/${note._id}`}>
                            <PenSquareIcon className="size-4 hover:text-primary" />
                        </Link>
                        <button
                            className="btn btn-ghost btn-xs text-error"
                            onClick={(e) => handleDelete(e,note._id)}
                            aria-label="Delete Note"
                        >
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoteCard;
