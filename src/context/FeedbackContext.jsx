import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    const fetchFeedback = async () => {
        // fetch data from url, ordering data by id, ordering data by descending
        const response = await fetch(`/feedback?_sort=id&_order=desc`)
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)
    }

    const addFeedback = async (newFeedback) => {
        const response = await fetch(`/feedback`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFeedback)
            });

        const data = await response.json()
        // Add item to the array:
        setFeedback([data, ...feedback])
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    const updateFeedback = async (id, upditem) => {
        const response = await fetch(`/feedback/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(upditem)
            }
        )
        const data = await response.json()
        setFeedback(feedback.map((item) => item.id === id ? {
            ...item, ...data
        } : item))
    }

    const deleteFeedback = async (id) => {
        // Confimration modal
        // if (window.confirm("This item will be deleted. Continue?")) {
        await fetch(`/feedback/${id}`, { method: 'DELETE' });
        // Delete item from array (filter())
        setFeedback(feedback.filter((item) => item.id !== id))
        //}
    }

    return (
        <FeedbackContext.Provider
            value={{
                feedback,
                feedbackEdit,
                isLoading,
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