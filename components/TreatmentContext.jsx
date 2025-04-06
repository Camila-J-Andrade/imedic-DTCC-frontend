// components/TreatmentContext.jsx
import React, { createContext, useState, useContext } from 'react';

const TreatmentContext = createContext();

export const TreatmentProvider = ({ children }) => {
    const [treatments, setTreatments] = useState([]);

    return (
        <TreatmentContext.Provider value={{ treatments, setTreatments }}>
            {children}
        </TreatmentContext.Provider>
    );
};

// Hook para usar no app
export const useTreatment = () => useContext(TreatmentContext);
