import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    // Nice to have
    // cf. https://github.com/remix-run/react-router/blob/dev/examples/auth/src/App.tsx#L150
    // cf. https://github.com/remix-run/react-router/blob/dev/examples/auth/src/App.tsx#L139
    // IMPORTANT: Example above does not use `createBrowserRouter` recommended in latest ReactRouter v6.4+
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        // cf. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_json_data
        try {
            // cf. https://create-react-app.dev/docs/adding-custom-environment-variables/
            const response = await fetch(`${process.env.REACT_APP_API_URL}/authentication/login`, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${process.env.REACT_APP_API_AUTH_CREDENTIALS}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            const data = await response.json();
            console.log(data);
            if (data && data.authToken) {
                // cf. https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
                localStorage.setItem("auth", data?.authToken);
                setErrorMessage("");
                navigate(from, {replace: true});
            } else {
                setErrorMessage("Fehler beim Login-Versuch: " + data.message);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Unerwarteter Fehler beim Login-Versuch.");
        }
    }

    return (
        <>
            {/*cf. https://getbootstrap.com/docs/5.2/forms/overview/*/}
            <form onSubmit={handleSubmit} className="container">
                <label htmlFor="username" className="form-label">Username</label>
                <input id="username" name="username" type="text" value={username} onChange={handleUsernameChange}
                       required
                       className="form-control"/>
                <label htmlFor="password" className="form-label">Password</label>
                <input id="password" name="password" type="password" value={password} onChange={handlePasswordChange}
                       required
                       className="form-control"/>
                <input type="submit" className="btn btn-primary"/>
            </form>
            <div className="container text-danger">
                {errorMessage}
            </div>
        </>
    );
}
