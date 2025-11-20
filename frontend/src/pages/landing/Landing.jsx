import { useSelector } from "react-redux";
import s from "./landing.module.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    function handleClick() {
        if (isAuthenticated) {
            navigate("/calendar");
        } else {
            navigate("/login");
        }
    }

    return (
        <div className={s.padding}>
            <section className={s.hero}>
                <div className={s.container}>
                    <div className={s.left}>
                        <h1>Organize your life, simply.</h1>
                        <div>
                            <p>
                                Welcome to Chronos. The ultimate tool to <br />
                                manage your schedule, track events and <br />
                                boost your productivity. All in one clean,
                                <br />
                                fast and beautiful interface.
                            </p>
                        </div>
                        <div>
                            <button className={s.button} onClick={handleClick}>
                                Go to calendar
                            </button>
                        </div>
                    </div>
                    <div className={s.right}>
                        <img
                            src="https://marketplace.canva.com/EAGXNJg7R38/1/0/1600w/canva-elegant-monthly-planner-december-2025-calendar-ZfBc2hEnM5c.jpg"
                            alt=""
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;
