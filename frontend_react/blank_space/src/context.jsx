import { createContext } from 'react';

export const UserContext = createContext('Unknown');

export const EventContext =  createContext({
    name: null,
    owner_name: null,
    owner_email: null,
    date: new Date(),
    time_slots: [],
    matches: []
});