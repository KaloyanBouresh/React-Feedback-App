import React from 'react';
import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {

    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This item is 1 from context',
            rating: 8
        },
        {
            id: 2,
            text: 'This item is 2 from context',
            rating: 10
        },
        {
            id: 3,
            text: 'This item is 3 from context',
            rating: 2
        }
    ])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        // Add item to the array:
        setFeedback([newFeedback, ...feedback])
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    const updateFeedback = (id, upditem) => {
        setFeedback(feedback.map((item) => item.id === id ? {
            ...item, ...upditem
        } : item))
    }

    const deleteFeedback = (id) => {
        // Confimration modal
        // if (window.confirm("This item will be deleted. Continue?")) {
        // Delete item from array (filter())
        setFeedback(feedback.filter((item) => item.id !== id))
        //}
    }

    return (
        <FeedbackContext.Provider
            value={{
                feedback,
                feedbackEdit,
                deleteFeedback,
                addFeedback,
                editFeedback,
                updateFeedback
            }}
        >
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext;