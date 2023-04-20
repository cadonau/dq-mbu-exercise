import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [status, setStatus] = useState({
        message: "",
        type: ""
    });

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
            setStatus({
                message: "Daten werden übermittelt …",
                type: "fetching"
            });
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
                setStatus({
                    message: "",
                    type: ""
                });
                navigate(from, {replace: true});
            } else {
                setStatus({
                    message: "Fehler beim Login-Versuch: " + data.message,
                    type: "error"
                });
            }
        } catch (error) {
            console.error(error);
            setStatus({
                message: "Unerwarteter Fehler beim Login-Versuch.",
                type: "error"
            });
        }
    }

    return (
        <>
            {status && status.message &&
                <div role={status.type === "error" ? "alert" : "status"}
                     className={`container ${status.type === "error" ? "text-danger" : status.type === "success" ? "text-success" : undefined}`}>
                    {status.message}
                </div>
            }
            {/*cf. https://getbootstrap.com/docs/5.2/forms/overview/*/}
            {/* cf. https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete */}
            <form onSubmit={handleSubmit} className="container">
                <label htmlFor="username" className="form-label">Benutzername:</label>
                <input id="username" name="username" type="text" value={username} onChange={handleUsernameChange}
                       required
                       autoComplete="username"
                       className="form-control"/>
                <label htmlFor="password" className="form-label">Passwort:</label>
                <input id="password" name="password" type="password" value={password}
                       onChange={handlePasswordChange}
                       required
                       autoComplete="current-password"
                       className="form-control"/>
                <button type="submit" className="btn btn-primary"
                        disabled={status && status.type === "fetching"}>
                    {status && status.type === "fetching" &&
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    }
                    Anmelden
                </button>
            </form>
        </>
    );
}
