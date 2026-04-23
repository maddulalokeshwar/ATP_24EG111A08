import {create} from "zustand";

export const useCounterStore = create((set) => ({
    //state
    newCounter: 0,
    newCounter1: 100,
    //add user state (name, age, email)
    user:{name:"ravi", age: 21, email: "ravi@example.com"},
    //function to change email
    changeEmail: (newEmail) => set((state) => ({user:{...state.user, email: newEmail}})),
    //function to change name and age
    changeNameAndAge: (newName, newAge) => set((state) => ({user:{...state.user, name: newName, age: newAge}})),
    //function to modify the state
    modifyUser: (updatedUser) => set((state) => ({user:{...state.user, ...updatedUser}})),
    //functions to modify the state
    incrementCounter: () => set((state) => ({ newCounter: state.newCounter + 1 })),
    incrementCounter1: () => set((state) => ({ newCounter1: state.newCounter + 1 })),
    decrementCounter: () => set((state) => ({ newCounter: state.newCounter - 1 })),
    decrementCounter1: () => set((state) => ({ newCounter1: state.newCounter - 1 })),
    resetCounter: () => set({ newCounter: 0 }),
    //function to change newCounter to 500
    changeNewCounterTo500: () => set({ newCounter: 500 }),
    //function to decrement newCounter1 by 20
    decrementNewCounter1By20: () => set((state) => ({ newCounter1: state.newCounter1 - 20 }))

}));