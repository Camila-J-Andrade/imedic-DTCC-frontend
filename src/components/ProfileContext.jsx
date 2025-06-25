import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [userName, setUserName] = useState(''); // novo estado para o nome do usuário

    return (
        <ProfileContext.Provider value={{ profileImage, setProfileImage, userName, setUserName }}>
            {children}
        </ProfileContext.Provider>
    );
};
