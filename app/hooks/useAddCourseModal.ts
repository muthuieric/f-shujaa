import { create } from "zustand";

interface AddCourseModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddCourseModal = create<AddCourseModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}));

export default useAddCourseModal;
