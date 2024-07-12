import { create } from "zustand";

interface UpdatePlaylistModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUpdatePlaylistModal = create<UpdatePlaylistModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUpdatePlaylistModal;
