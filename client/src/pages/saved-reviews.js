import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";

export const SavedReviews = () => {
  const [savedReviews, setSavedReviews] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/reviews/savedReviews/${userID}`
        );
        setSavedReviews(response.data.savedReviews);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSavedReviews();
  }, []);

  return (
    <div>
      <h2> Saved Reviews</h2>
      <ul>
        {savedReviews.map((review) => (
          <li key={review._id}>
            <div>
              <h2>{review.name}</h2>
            </div>
            <div className="instructions">
              <p> {review.instructions}</p>
            </div>
            <img src={review.imageUrl} alt={review.name} />
            <p> Cooking Time: {review.cookingTime} (minutes)</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
