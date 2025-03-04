import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Exercise.css';

const Exercise = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  useEffect(() => {
    if (exercise?.name) {
      fetchRelatedVideos(exercise.name);
    }
  }, [exercise]);

  const fetchData = async (id) => {
    try {
      const { data } = await axios.get(
        `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
        {
          headers: {
            'X-RapidAPI-Key': 'e6dfb51c04msh0cc17f8f3874a90p1603d3jsn6d83d7d42730',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
          },
        }
      );
      setExercise(data);
    } catch (error) {
      console.error('Error fetching exercise:', error);
    }
  };

  const fetchRelatedVideos = async (name) => {
    try {
      const { data } = await axios.get(
        'https://youtube-search-and-download.p.rapidapi.com/search',
        {
          params: { query: name, hl: 'en', type: 'v', sort: 'r' },
          headers: {
            'X-RapidAPI-Key': 'ae40549393msh0c35372c617b281p103ddcjsn0f4a9ee43ff0',
            'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
          },
        }
      );
      setRelatedVideos(data.contents || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <div className='exercise-page' >

      {exercise && (
          <div className="exercise-container">

            <div className="exercise-image">
              
                <img src={exercise.gifUrl} alt="exercise img" />

            </div>

            <div className="exercise-data">
                <h3>{exercise.name}</h3>
                <span>
                  <b>Target:</b>
                  <p>{exercise.target}</p>
                </span>
                <span>
                  <b>Equipment:</b>
                  <p>{exercise.equipment}</p>
                </span>
                <span>
                  <b>Secondary Muscles:</b>
                  <ul>
                    {exercise.secondaryMuscles.map((muscle, index) => (
                      <li key={index}>{muscle}</li>
                    ))}
                  </ul>
                </span>
                <div className="exercise-instructions">
                    <h3>Instructions</h3>
                    {exercise.instructions.map((instruction, index) => (
                      <ul>
                        <li key={index} >{instruction}</li>
                      </ul>
                    ))}
                </div>
            </div>

           
          </div>
      )}

      {relatedVideos.length > 0 && (
        <div className="related-videos-container">
          <h3>Related Videos on YouTube</h3>
          <div className="related-videos">
            {relatedVideos.slice(0, 6).map((video, index) =>
              video.video?.videoId ? (
                <div
                  className="related-video"
                  key={index}
                  onClick={() =>
                    window.open(`https://www.youtube.com/watch?v=${video.video.videoId}`, '_blank')
                  }
                >
                  <h4>{video.video.title.slice(0, 40)}...</h4>
                  <span>
                    <p>{video.video.channelName}</p>
                    <p>{video.video.viewCountText}</p>
                  </span>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercise;
