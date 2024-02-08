import nlwIcon from '@Expert/resources/icons/ic_nlw_logo.svg';
import { CardNote } from './components/CardNote';
import { NewNote } from './components/NewNote';
import { useState } from 'react';

export interface Note {
  id: string;
  content: string;
  createdAt: Date;
}

export const Startup = () => {
  const [notes, setNotes] = useState<Array<Note>>(() => {
    const notesFromStorage = localStorage.getItem('notes');
    return notesFromStorage ? JSON.parse(notesFromStorage) : [];
  });
  const [search, setSearch] = useState('');

  const filteredNotes =
    search !== '' ? notes.filter(note => note.content.toLocaleLowerCase().includes(search)) : notes;

  const onNoteCreated = (content: string) => {
    const newNotes = [{ content, id: crypto.randomUUID(), createdAt: new Date() }, ...notes];
    setNotes(newNotes);
    localStorage.setItem('notes', JSON.stringify(newNotes));
  };

  const onNoteDeleted = (id: string) => {
    const newNotes = notes.filter(note => note.id != id);
    setNotes(newNotes);
    localStorage.setItem('notes', JSON.stringify(newNotes));
  };

  return (
    <div className="mx-auto px-5 max-w-6xl my-12 space-y-6">
      <img
        src={nlwIcon}
        width={125}
        height={24}
        loading="eager"
        alt="Logo do evento NLW da Rocketseat"
      />
      <form className="w-full">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value.toLocaleLowerCase())}
          id="search"
          className="bg-transparent text-3xl w-full font-semibold tracking-tight placeholder:text-slate-500 outline-none"
          placeholder="Busque em suas notas..."
          autoComplete="off"
        />
      </form>
      <div className="bg-slate-700 h-px" />
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 auto-rows-[250px]">
        <NewNote onNoteCreated={onNoteCreated} />
        {filteredNotes.map(note => (
          <CardNote note={note} onDelete={onNoteDeleted} key={note.id} />
        ))}
      </div>
    </div>
  );
};
