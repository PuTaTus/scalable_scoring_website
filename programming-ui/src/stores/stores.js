import { readable } from "svelte/store";
import {writable} from 'svelte/store';

let user = localStorage.getItem("userUuid");

if (!user) {
  user = crypto.randomUUID().toString();
  localStorage.setItem("userUuid", user);
} 

// Using svelte store to create a variable 
let assIndex = writable(1);

// Total number of assignment handouts.
let lenAssignment = writable(0)

export {assIndex, lenAssignment};

export const userUuid = readable(user);