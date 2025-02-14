import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    entityType: string;
}

interface StoreState {
    allUsers: User[] | null,
    getAllUsers: (n: User[]) => void,

    allClients: User[] | null,
    getAllClients: (n: any[]) => void,

    allCourses: any[] | null,
    getAllCourses: (n: any[]) => void,

    allConstancies: any[] | null,
    getAllConstancies: (n: any[]) => void,
}

export const useStore = create<StoreState>((set) => ({
    allUsers: null,
    getAllUsers: (n: User[]) => set({ allUsers: n }),

    allClients: null,
    getAllClients: (n: any[]) => set({ allClients: n }),
    
    allCourses: null,
    getAllCourses: (n: any[]) => set({ allCourses: n }),
    
    allConstancies: null,
    getAllConstancies: (n: any[]) => set({ allConstancies: n }),
}));