'use client';

import React, {createContext, useContext, useEffect, useState} from 'react';
import {getCookie} from 'cookies-next';
import {jwtDecode} from "jwt-decode";

// Tipe untuk context autentikasi
interface AuthContextType {
    roles: string[];
    name: string;
    nik?: string;
    setRoles: React.Dispatch<React.SetStateAction<string[]>>;
    getUserInfo: () => void;
}

// Membuat context autentikasi
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider untuk context autentikasi
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [roles, setRoles] = useState<string[]>([]);
    const [name, setName] = useState<string>('-');
    const [nik, setNik] = useState<string>();

    // Fungsi untuk mendapatkan informasi pengguna
    const getUserInfo = async () => {
        try {
            const token = getCookie('access-token' );
            console.log(token)
            if (!token) return;
            // const response: any =  jwt.verify(token, 'nosystemissafe');
            const decoded: any = jwtDecode(token);
            console.log(decoded)
            setRoles(decoded.role ?? '-');
            setName(decoded.name ?? '-');
            setNik(decoded.nik?? null)
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    // Mengambil informasi pengguna ketika komponen dimount
    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <AuthContext.Provider value={{ roles, setRoles, getUserInfo, name, nik }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook untuk menggunakan context autentikasi
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
