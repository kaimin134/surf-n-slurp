import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useCookies } from "react-cookie";

export const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [savedReviews, setSavedReviews] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);

  const userID = useGetUserID();
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get("http://localhost:3001/reviews");
        setReviews(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchSavedReview = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/reviews/savedReviews/ids/${userID}`
        );
        setSavedReviews(response.data.savedReviews);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReview();
    if (cookies.access_token) fetchSavedReview();
  }, []);

  const saveReview = async (reviewID) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/reviews",
        {
          reviewID,
          userID,
        },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      setSavedReviews(response.data.savedReviews);
    } catch (err) {
      console.error(err);
    }
  };

  const isReviewSaved = (id) => savedReviews.includes(id);

  return (
    <div>
      <h2> Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <div>
              <h2>{review.name}</h2>
              <button
                onClick={() => saveReview(review._id)}
                disabled={isReviewSaved(review._id)}
              >
                {isReviewSaved(review._id) ? "Saved" : "Save"}
              </button>
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
