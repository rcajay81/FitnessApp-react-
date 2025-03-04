import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Categories.css';

const EquipmentCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        if (id) {
            fetchData(id);
        }
    }, [id]);

    const fetchData = async (id) => {
        const options = {
            method: 'GET',
            url: `https://exercisedb.p.rapidapi.com/exercises/equipment/${id}`,
            params: { limit: '50' },
            headers: {
                'X-RapidAPI-Key': 'e6dfb51c04msh0cc17f8f3874a90p1603d3jsn6d83d7d42730',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setExercises(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='category-exercises-page'>
            <h1>Category: <span>{id}</span></h1>

            {exercises.length > 0 && (
                <div className="exercises">
                    {exercises.map((exercise) => (
                        <div className="exercise" key={exercise.id} onClick={() => navigate(`/exercise/${exercise.id}`)}>
                            <img src={exercise.gifUrl} alt={exercise.name} />
                            <h3>{exercise.name}</h3>
                            <ul>
                                <li>{exercise.target}</li>
                                {exercise.secondaryMuscles?.slice(0, 2).map((muscle, index) => (
                                    <li key={index}>{muscle}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EquipmentCategory;
