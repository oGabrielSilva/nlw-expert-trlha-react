import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  onNoteCreated: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;

export const NewNote = ({ onNoteCreated }: Props) => {
  const [shouldShowOnBoarding, setShoundShowOnBoarding] = useState(true);
  const [content, setContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleStartEditor = () => setShoundShowOnBoarding(false);

  const handleOnClearTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (e.target.value.length < 1) setShoundShowOnBoarding(true);
  };

  const handleSaveNote = (e: FormEvent) => {
    e.preventDefault();
    if (content === '') return;
    onNoteCreated(content);
    setContent('');
    setShoundShowOnBoarding(true);
    toast.success('Nota criada com sucesso');
  };

  const handleStartRecording = () => {
    const isSpeechRecognitionAPIAvailable =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

    if (!isSpeechRecognitionAPIAvailable) {
      setIsRecording(false);
      return alert('Infelizmente seu navegador não suporta essa funcionalidade');
    }
    setIsRecording(true);
    setShoundShowOnBoarding(false);

    const SpeechRecordingAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    speechRecognition = new SpeechRecordingAPI();
    speechRecognition.lang = 'pt-BR';
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = e => {
      setContent(
        Array.from(e.results).reduce((acum, current) => acum.concat(current[0].transcript), '')
      );
    };
    speechRecognition.onerror = console.error;

    speechRecognition.start();
  };
  const handleStopRecording = () => {
    setIsRecording(false);
    speechRecognition?.stop();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 p-5 gap-3 text-left focus-visible:ring-2 outline-none focus-visible:ring-lime-400 hover:ring-2 hover:ring-slate-600">
        <span className="text-sm text-slate-200 font-medium">Adicionar nota</span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed overflow-hidden inset-0 md:left-1/2 md:inset-auto md:top-1/2 md:h-[60vh] md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full bg-slate-700 md:rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 p-1.5 top-0 bg-slate-800 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>
          <form className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm text-slate-300 font-medium">Adicionar nota</span>
              {shouldShowOnBoarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{' '}
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="font-medium text-lime-400 hover:underline"
                  >
                    gravando uma nota
                  </button>{' '}
                  em áudio ou se preferir{' '}
                  <button
                    type="button"
                    onClick={handleStartEditor}
                    className="font-medium text-lime-400 hover:underline"
                  >
                    utilize apenas texto
                  </button>
                </p>
              ) : (
                <textarea
                  onChange={handleOnClearTextarea}
                  autoFocus
                  value={content}
                  className="text-sm leading-6 text-slate-400 resize-none bg-transparent flex-1 outline-none"
                />
              )}
            </div>

            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="w-full items-center flex justify-center gap-3 bg-slate-900 py-4 text-center text-sm text-slate-300 text font-medium outline-none hover:text-slate-100"
              >
                <div className="size-3 rounded-full animate-ping bg-red-600" />
                Gravando! (clique p/ interromper)
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveNote}
                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 text font-medium outline-none hover:bg-lime-500"
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
