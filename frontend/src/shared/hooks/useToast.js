// useToast.js
// Custom hook for toast notifications (pure React, no dependencies)

import { useState, useEffect, useCallback } from 'react';

const TOAST_LIMIT = 5;
const TOAST_DURATION = 4000;

let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}

// Global state for toasts (works across components without context)
let memoryState = { toasts: [] };
const listeners = [];

function dispatch(action) {
    switch (action.type) {
        case 'ADD_TOAST':
            memoryState = {
                ...memoryState,
                toasts: [action.toast, ...memoryState.toasts].slice(0, TOAST_LIMIT),
            };
            break;
        case 'UPDATE_TOAST':
            memoryState = {
                ...memoryState,
                toasts: memoryState.toasts.map((t) =>
                    t.id === action.toast.id ? { ...t, ...action.toast } : t
                ),
            };
            break;
        case 'DISMISS_TOAST':
            memoryState = {
                ...memoryState,
                toasts: memoryState.toasts.map((t) =>
                    t.id === action.toastId || action.toastId === undefined
                        ? { ...t, open: false }
                        : t
                ),
            };
            break;
        case 'REMOVE_TOAST':
            if (action.toastId === undefined) {
                memoryState = { ...memoryState, toasts: [] };
            } else {
                memoryState = {
                    ...memoryState,
                    toasts: memoryState.toasts.filter((t) => t.id !== action.toastId),
                };
            }
            break;
        default:
            break;
    }
    listeners.forEach((listener) => listener(memoryState));
}

/**
 * Show a toast notification.
 * @param {object} props
 * @param {string} props.title - Main toast text
 * @param {string} [props.description] - Optional description
 * @param {'default'|'success'|'error'|'warning'} [props.variant] - Toast style
 * @param {number} [props.duration] - Auto-dismiss duration in ms
 */
export function toast({ title, description, variant = 'default', duration = TOAST_DURATION }) {
    const id = genId();

    const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

    dispatch({
        type: 'ADD_TOAST',
        toast: {
            id,
            title,
            description,
            variant,
            open: true,
        },
    });

    // Auto dismiss after duration
    setTimeout(() => {
        dispatch({ type: 'DISMISS_TOAST', toastId: id });
    }, duration);

    // Remove from DOM after animation
    setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', toastId: id });
    }, duration + 300);

    return { id, dismiss };
}

// Convenience methods
toast.success = (title, description) => toast({ title, description, variant: 'success' });
toast.error = (title, description) => toast({ title, description, variant: 'error' });
toast.warning = (title, description) => toast({ title, description, variant: 'warning' });

/**
 * Hook to access toast state. Used by the Toaster component.
 */
export function useToast() {
    const [state, setState] = useState(memoryState);

    useEffect(() => {
        listeners.push(setState);
        return () => {
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, []);

    const dismiss = useCallback((toastId) => {
        dispatch({ type: 'DISMISS_TOAST', toastId });
    }, []);

    return {
        toasts: state.toasts,
        toast,
        dismiss,
    };
}

export default useToast;
