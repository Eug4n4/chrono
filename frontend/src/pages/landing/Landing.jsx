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
        <div className={s.landingPage}>
            <section className={s.hero}>
                <div className={s.container}>
                    <div className={s.content}>
                        <h1 className={s.title}>
                            Organize your life,{" "}
                            <span className={s.highlight}>simply.</span>
                        </h1>
                        <p className={s.subtitle}>
                            Welcome to Chronos. The ultimate tool to manage your
                            schedule, track events and boost your productivity.
                            All in one clean, fast and beautiful interface.
                        </p>
                        <div className={s.actions}>
                            <button
                                className={s.primaryButton}
                                onClick={handleClick}
                            >
                                {isAuthenticated
                                    ? "Go to Calendar"
                                    : "Get Started"}
                            </button>
                            {!isAuthenticated && (
                                <button
                                    className={s.secondaryButton}
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                    <div className={s.imageWrapper}>
                        <img
                            src="/preview.png"
                            alt="Chronos Interface"
                            className={s.heroImage}
                        />
                        <div className={s.imageGlow}></div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;
