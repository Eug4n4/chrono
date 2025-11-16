import { Link } from "react-router-dom";
import s from "./notfound.module.css";

function NotFound() {
    return (
        <div className={s.error_page}>
            <div className={s.error_wrapper}>
                <div className={s.container}>
                    <h1>404</h1>

                    <h2>OOPS! PAGE NOT FOUND</h2>
                    <div className={s.error_description}>
                        <p>
                            Sorry, the page you're looking for doesn't exists.
                        </p>
                    </div>
                    <Link className={s.action} to={"/"}>
                        RETURN HOME
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
