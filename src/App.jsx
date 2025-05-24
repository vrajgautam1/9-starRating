import { use } from "react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

function App() {
    //-------states and other variables if any------//
    const myArray = [0, 1, 2, 3, 4];
    const [hover, setHover] = useState(0);
    const [star, setStar] = useState(0);
    const [feedback, setFeedback] = useState({});
    const [average, setAverage] = useState(0)
    const [list, setList] = useState(()=>{
        let ratingList = JSON.parse(localStorage.getItem("ratingsList"))

        if(ratingList){
            return ratingList
        }else{
            return []
        }
    });

    //-------functions----------//

    function handleMouseEnter(index) {
        setHover(index + 1);
    }

    function handleMouseLeave() {
        setHover(0);
    }

    function handleMouseClick(index) {
        setStar(index + 1);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFeedback({ ...feedback, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setList([...list, { ...feedback, starRating: star }]);
        setFeedback({});
        setStar(0);
        setHover(0);
    }

    useEffect(() => {
        console.log(feedback);
    }, [feedback]);

    useEffect(() => {
        localStorage.setItem("ratingsList", JSON.stringify(list))
        
        if(list.length > 0){
            let total=0

            for(let i of list){
                total += i.starRating
            }

            let avg = total/list.length

            setAverage(avg.toFixed(1))
        }else{
            setAverage(0)
        }

    }, [list]);

    return (
        <div className="container py-5">
    <div className="card mx-auto shadow p-4" style={{ maxWidth: "500px" }}>
        <h5 className="mb-3 text-center">Movie Review for <span className="fw-bold">Gladiator 2</span></h5>
        
        <form onSubmit={handleSubmit}>
            {/* Star Rating */}
            <div className="mb-3 text-center">
                {myArray.map((_, index) => (
                    <FaStar
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleMouseClick(index)}
                        size={24}
                        style={{ cursor: "pointer" }}
                        color={
                            hover > index || star > index ? "gold" : "gray"
                        }
                    />
                ))}
            </div>

            {/* Feedback */}
            <div className="mb-3">
                <textarea
                    name="message"
                    className="form-control"
                    placeholder="Give your feedback on the movie"
                    value={feedback.message || ""}
                    onChange={handleChange}
                    rows={4}
                ></textarea>
            </div>

            <div className="d-grid">
                <button className="btn btn-primary" type="submit">
                    Submit
                </button>
            </div>
        </form>
    </div>

    {/* Display Reviews */}
    <div className="mt-5 mx-auto shadow p-4 bg-secondary" style={{ maxWidth: "500px" }}>
        <h5 className="mb-3">All Reviews | Average rating : {average} Stars</h5>
        <table className="table table-bordered table-hover">
            <thead className="table-dark">
                <tr>
                    <th style={{ width: "150px" }}>Rating</th>
                    <th>Feedback</th>
                </tr>
            </thead>
            <tbody>
                {list.map((entry, index) => (
                    <tr key={index}>
                        <td>
                            {myArray.map((_, i) => (
                                <FaStar
                                    key={i}
                                    size={18}
                                    color={i < entry.starRating ? "gold" : "gray"}
                                />
                            ))}
                        </td>
                        <td>{entry.message}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

    );
}

export default App;
