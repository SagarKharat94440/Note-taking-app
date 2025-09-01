import React, { useContext, useEffect, useState } from "react";
import API from "../lib/api";
import { AuthContext } from "../context/AuthContext";
import NoteItem from "../components/NoteCard";

type Note = { _id: string; title: string; content: string; createdAt: string };

export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const [notes, setNotes] = useState<Note[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);

    const handleNoteToggle = (noteId: string) => {
        setExpandedNoteId(prevId => prevId === noteId ? null : noteId);
    };
    useEffect(() => {
        fetchNotes();
    }, []);

    async function fetchNotes() {
        setLoading(true);
        try {
            const res = await API.get("/notes");
            setNotes(res.data);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to fetch notes");
        } finally {
            setLoading(false);
        }
    }

    async function createNote(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
     
        setLoading(true);
        try {
            const res = await API.post("/notes", { title, content });
            setNotes(prev => [res.data, ...prev]);
            setTitle("");
            setContent("");
            setIsModalOpen(false);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to create note");
        } finally {
            setLoading(false);
        }
    }

    async function deleteNote(id: string) {
        try {
            await API.delete(`/notes/${id}`);
            setNotes(prev => prev.filter(n => n._id !== id));
        } catch (err: any) {
            setError(err?.response?.data?.message || "Delete failed");
        }
    }

    return (
        <div className="bg-gray-50 pt-2 min-h-screen">
            <div className="max-w-md mx-auto p-4  h-[95vh] sm:rounded-lg sm:shadow-md sm:border sm:border-gray-200 ">

                {}
                <header className="flex justify-between items-center sm:py-3">
                    <div className="flex items-center gap-3">
                        {}
                        <div className="sm:flex hidden absolute top-3 left-3 items-center mb-6 self-start">
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.1424 0.843087L16.9853 0L14.3248 9.89565L11.9228 0.961791L8.76555 1.80488L11.3608 11.4573L4.8967 5.01518L2.58549 7.31854L9.67576 14.3848L0.845959 12.0269L0 15.1733L9.64767 17.7496C9.53721 17.2748 9.47877 16.7801 9.47877 16.2717C9.47877 12.6737 12.4055 9.75685 16.0159 9.75685C19.6262 9.75685 22.5529 12.6737 22.5529 16.2717C22.5529 16.7768 22.4952 17.2685 22.3861 17.7405L31.1541 20.0818L32 16.9354L22.314 14.3489L31.1444 11.9908L30.2984 8.84437L20.6128 11.4308L27.0768 4.98873L24.7656 2.68538L17.7737 9.65357L20.1424 0.843087Z" fill="#367AFF" />
                                <path d="M22.3776 17.7771C22.1069 18.9176 21.5354 19.9421 20.7513 20.763L27.1033 27.0935L29.4145 24.7901L22.3776 17.7771Z" fill="#367AFF" />
                                <path d="M20.6872 20.8292C19.8936 21.637 18.8907 22.2398 17.7661 22.5504L20.0775 31.1472L23.2346 30.3041L20.6872 20.8292Z" fill="#367AFF" />
                                <path d="M17.6482 22.5819C17.1264 22.7156 16.5795 22.7866 16.0159 22.7866C15.4121 22.7866 14.8274 22.705 14.2723 22.5523L11.9589 31.1569L15.116 32L17.6482 22.5819Z" fill="#367AFF" />
                                <path d="M14.1607 22.5205C13.0532 22.1945 12.0682 21.584 11.2908 20.7739L4.92322 27.1199L7.23442 29.4233L14.1607 22.5205Z" fill="#367AFF" />
                                <path d="M11.2377 20.7178C10.4737 19.9026 9.91718 18.8917 9.65228 17.7688L0.855713 20.1179L1.70167 23.2643L11.2377 20.7178Z" fill="#367AFF" />
                            </svg>
                            <span className="h-9 w-9  items-center hidden sm:flex justify-center  text-black rounded-full font-bold">HD</span>
                        </div>
                        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="sm:hidden flex" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.1424 0.843087L16.9853 0L14.3248 9.89565L11.9228 0.961791L8.76555 1.80488L11.3608 11.4573L4.8967 5.01518L2.58549 7.31854L9.67576 14.3848L0.845959 12.0269L0 15.1733L9.64767 17.7496C9.53721 17.2748 9.47877 16.7801 9.47877 16.2717C9.47877 12.6737 12.4055 9.75685 16.0159 9.75685C19.6262 9.75685 22.5529 12.6737 22.5529 16.2717C22.5529 16.7768 22.4952 17.2685 22.3861 17.7405L31.1541 20.0818L32 16.9354L22.314 14.3489L31.1444 11.9908L30.2984 8.84437L20.6128 11.4308L27.0768 4.98873L24.7656 2.68538L17.7737 9.65357L20.1424 0.843087Z" fill="#367AFF" />
                            <path d="M22.3776 17.7771C22.1069 18.9176 21.5354 19.9421 20.7513 20.763L27.1033 27.0935L29.4145 24.7901L22.3776 17.7771Z" fill="#367AFF" />
                            <path d="M20.6872 20.8292C19.8936 21.637 18.8907 22.2398 17.7661 22.5504L20.0775 31.1472L23.2346 30.3041L20.6872 20.8292Z" fill="#367AFF" />
                            <path d="M17.6482 22.5819C17.1264 22.7156 16.5795 22.7866 16.0159 22.7866C15.4121 22.7866 14.8274 22.705 14.2723 22.5523L11.9589 31.1569L15.116 32L17.6482 22.5819Z" fill="#367AFF" />
                            <path d="M14.1607 22.5205C13.0532 22.1945 12.0682 21.584 11.2908 20.7739L4.92322 27.1199L7.23442 29.4233L14.1607 22.5205Z" fill="#367AFF" />
                            <path d="M11.2377 20.7178C10.4737 19.9026 9.91718 18.8917 9.65228 17.7688L0.855713 20.1179L1.70167 23.2643L11.2377 20.7178Z" fill="#367AFF" />
                        </svg>
                        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Dashboard</h1>
                    </div>
                    <button onClick={logout} className="font-semibold underline text-blue-600 hover:underline">
                        Sign Out
                    </button>
                </header>

                <main className="mt-4">
                    {}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Welcome, {user?.name}!</h2>
                        <p className="text-gray-500 text-sm sm:text-base mt-1">Email: {user?.email}</p>
                    </div>

                    {}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-700 transition-colors shadow-md"
                    >
                        Create Note
                    </button>

                    {}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Notes</h3>
                        {loading ? (
                            <p className="text-center text-gray-500">Loading...</p>
                        ) : (
                            <div className="space-y-3">
                                {notes.map((note, index) => (
                                    <NoteItem
                                        key={note._id}
                                        note={{ ...note, title: `Note ${index + 1}` }} 
                                        onDelete={deleteNote}
                                        onToggle={handleNoteToggle}
                                        isExpanded={expandedNoteId === note._id}
                                    />
                                ))}
                                {notes.length === 0 && <p className="text-center text-gray-500">No notes found.</p>}
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                        <h2 className="text-lg sm:text-xl font-bold mb-5 text-gray-800">Create a New Note</h2>
                        <form onSubmit={createNote}>
                            {}
                            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" rows={4} className="w-full border border-gray-300 p-3  rounded mb-5 outline-none"></textarea>
                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => {setIsModalOpen(false);
                                    setContent("");
                                    setError("");
                                }} className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">{loading ? 'Saving...' : 'Save Note'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}













