import { addNewEvent } from "@/lib/data";
import React, { useState, FormEvent } from "react";

export const NewEventForm: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [sDate, setSDate] = useState("");
    const [eDate, setEDate] = useState("");

    const startDate = new Date(sDate);
    const endDate = new Date(eDate);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [customCategory, setCustomCategory] = useState<string>("");

    const predefinedCategories = ["Art", "Business", "Celebration", "Charity", "Comedy", "Community", "Crafts", "Dance", "Education", "Environment", "Exhibition", "Festival", "Film", "Fitness", "Food", "Gaming", "Health", "History", "Literature", "Music", "Networking", "Science", "Technology", "Theater", "Virtual", "Workshops"];

    const likes = 0;
    const [message, setMessage] = useState<string>("");

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value && selectedCategories.length < 3 && !selectedCategories.includes(value)) {
            setSelectedCategories([...selectedCategories, value]);
        }
        // } else {
        //     setMessage("You can select a maximum of 3 categories.");
        // }
    };

    const handleCustomCategoryAdd = () => {
        if (customCategory && !selectedCategories.includes(customCategory)) {
            setSelectedCategories([...selectedCategories, customCategory]);
            setCustomCategory("");
        }
    };

    const handleCategoryRemove = (categoryToRemove: string) => {
        setSelectedCategories(selectedCategories.filter(cat => cat !== categoryToRemove));
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const eventData = {
            name,
            description,
            location,
            image,
            startDate: startDate,
            endDate: endDate,
            likes,
            category: selectedCategories
        };

        // console.log(eventData);

        try {
            const response = await addNewEvent(eventData);
            // console.log(response);
            setMessage("Event created!");
        } catch (error) {
            setMessage(`Error adding the event: ${error}`);
            // console.log("Error adding the event", error)
        }

        setName("");
        setDescription("");
        setLocation("");
        setImage("");
        setSDate("");
        setEDate("");
        setSelectedCategories([]);
        // setCustomCategory("");
    };

    return (
        <>
            <h3 className="bg-secondary mx-5 mt-4 text-neutral p-4 rounded-lg">Create a new event</h3>
            <form onSubmit={handleSubmit} className="bg-neutral space-y-4 mb-4 p-3">
                <div>
                    <label htmlFor="name">Name of the event:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Description of the event:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="location">Location of the event:</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image">Image of the event:</label>
                    <input
                        type="text"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="sDate">Start Date of the event:</label>
                    <input
                        type="date"
                        id="sDate"
                        value={sDate}
                        onChange={(e) => setSDate(e.target.value)}
                        required
                        className="px-3 py-2"
                    />

                    <label htmlFor="eDate">End Date of the event:</label>
                    <input
                        type="date"
                        id="eDate"
                        value={eDate}
                        onChange={(e) => setEDate(e.target.value)}
                        required
                        className="px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="category">Event Categories (You can select a maximum of 3 categories):</label>
                    <select id="category" required multiple onChange={handleCategoryChange}>
                        <option value="">Select a category</option>
                        {predefinedCategories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Selected Categories:</label>
                    <ul className="flex flex-wrap gap-2 mt-2">
                        {selectedCategories.map((cat, index) => (
                            <li
                                className="flex items-center bg-primary text-white p-2 rounded-full shadow-md"
                                key={index}
                            >
                                {cat}
                                <button
                                    className="ml-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 transition duration-200"
                                    type="button"
                                    onClick={() => handleCategoryRemove(cat)}
                                >
                                    x
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="flex justify-center">
                    <button className="btn my-2 bg-primary hover:bg-secondary text-white w-fit" type="submit">Submit</button>
                </div>
            </form>
            {message && <p>{message}</p>}
        </>
    );
};

export default NewEventForm;