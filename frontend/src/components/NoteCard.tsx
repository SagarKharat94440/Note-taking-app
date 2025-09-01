import React from 'react';
import deleteIcon from '../assets/icons/delete.svg'

type Note = {
  _id: string;
  title: string;
  content: string; 
};

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
  onToggle: (id:string) => void; 
  isExpanded: boolean; 
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete, onToggle, isExpanded }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {}
      <div 
        className="flex justify-between items-center p-2 sm:p-3 cursor-pointer"
        onClick={() => onToggle(note._id)}
      >
        <span className="font-semibold sm:text-base text-sm text-gray-800">{note.title || 'Untitled Note'}</span>
        <div className="flex items-center gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(note._id); }} 
            className="p-2 rounded-full hover:bg-red-50"
          >
            <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
          </button>
          {}
        </div>
      </div>

      {}
      <div
        className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 pb-4 border-t border-gray-100">
          <p className="text-gray-600 mt-2 whitespace-pre-wrap">{note.content || 'No content.'}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;