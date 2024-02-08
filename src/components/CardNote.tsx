import { Note } from '@Expert/Startup';
import * as Dialog from '@radix-ui/react-dialog';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X } from 'lucide-react';

interface Props {
  note: Note;
  onDelete: (id: string) => void;
}

export const CardNote = ({ note: { id, content, createdAt }, onDelete }: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-lime-400 hover:ring-2 hover:ring-slate-600 overflow-hidden relative bg-slate-800 p-5 gap-3">
        <span className="text-sm text-slate-300 font-medium">
          {formatDistanceToNow(createdAt, { locale: ptBR, addSuffix: true })}
        </span>
        <p className="text-sm leading-6 text-slate-400">{content}</p>
        <div className="absolute pointer-events-none bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed overflow-hidden md:left-1/2 md:top-1/2 md:h-[60vh] md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full bg-slate-700 md:rounded-md flex flex-col outline-none inset-0 md:inset-auto">
          <Dialog.Close className="absolute right-0 p-1.5 top-0 bg-slate-800 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm text-slate-300 font-medium">
              {formatDistanceToNow(createdAt, { locale: ptBR, addSuffix: true })}
            </span>
            <p className="text-sm leading-6 text-slate-400">{content}</p>
          </div>

          <button
            onClick={() => onDelete(id)}
            type="button"
            className="w-full bg-slate-800 py-4 text-center text-sm font-medium text-slate-300 outline-none group"
          >
            Deseja <span className="text-red-400 group-hover:underline">apagar essa nota</span>?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};