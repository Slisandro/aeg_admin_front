import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    entityType: string;
}

interface StoreState {
    allUsers: number | null,
    getAllUsers: (n: number) => void,

    allClients: User[] | null,
    getAllClients: (n: User[]) => void,

    allCourses: number | null,
    getAllCourses: (n: number) => void,

    allConstancies: number | null,
    getAllConstancies: (n: number) => void,
}

export const useStore = create<StoreState>((set) => ({
    allUsers: null,
    getAllUsers: (n: number) => set({ allUsers: n }),

    allClients: null,
    getAllClients: (n: User[]) => set({ allClients: n }),
    
    allCourses: null,
    getAllCourses: (n: number) => set({ allCourses: n }),
    
    allConstancies: null,
    getAllConstancies: (n: number) => set({ allConstancies: n }),
}));