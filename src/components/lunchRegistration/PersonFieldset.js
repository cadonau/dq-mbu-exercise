import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export default function PersonFieldset({formData, onChange, isActive = true}) {

    // (cf. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
    const {person} = formData;

    const [personOptions, setPersonOptions] = useState([]);
    const [status, setStatus] = useState({
        message: "",
        type: ""
    });

    const authToken = localStorage.getItem("auth") ?? null;
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        // see returned cleanup function below
        const controller = new AbortController();

        // cf. https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook
        (async () => {
            try {
                setStatus({
                    message: "Daten werden geladen …",
                    type: "fetching"
                });
                // cf. https://create-react-app.dev/docs/adding-custom-environment-variables/
                const response = await fetch(`${process.env.REACT_APP_API_URL}/pers?query="Inaktiv=false"&limit=0&attributes=PersNr,Name,Vorname,VornameName,NameVorname`, {
                    signal: controller.signal,
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                if (!response.ok) {
                    setStatus({
                        message: "Fehler beim Laden der Personenliste: " + response.statusText,
                        type: "error"
                    });

                    // if "Unauthorized"
                    // cf. https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
                    if (response.status === 401) {
                        localStorage.removeItem("auth");
                        navigate("/login", {
                            state: {
                                from: location
                            },
                            replace: true
                        });
                    }

                    return;
                }
                const responseObject = await response.json();
                console.log(responseObject);
                setPersonOptions(responseObject.data);
                setStatus({
                    message: "",
                    type: ""
                });
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Fetch request successfully aborted.");
                } else {
                    console.error(error);
                    setStatus({
                        message: "Unerwarteter Fehler beim Laden der Personenliste.",
                        type: "error"
                    });
                }
            }
        })();

        // cf. https://react.dev/reference/react/useEffect
        // cf. https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/
        return () => {
            controller.abort();
        };

    }, [authToken, location, navigate]);


    // cf. https://react.dev/learn/conditional-rendering#conditionally-returning-nothing-with-null
    if (!isActive) {
        return null;
    }

    return (
        <fieldset>
            <label htmlFor="person" className="form-label">Person:
                <span aria-hidden="true">*</span>
            </label>
            {status && status.message ?
                // cf. https://www.w3.org/WAI/tutorials/forms/notifications/
                <div role={status.type === "error" ? "alert" : "status"}
                     className={
                         status.type === "error" ? "text-danger" :
                             status.type === "success" ? "text-success" :
                                 status.type === "fetching" ? "spinner-border d-block" :
                                     undefined}>
                    <span className={status.type === "fetching" ? "visually-hidden" : undefined}>{status.message}</span>
                </div>
                :
                <select id="person" name="person" value={person} onChange={onChange}
                        required
                        className="form-select">
                    <option value="">Person auswählen</option>

                    {personOptions.map(({PersNr, NameVorname}) =>
                        <option key={PersNr} value={PersNr}>{NameVorname}</option>
                    )}
                </select>
            }
        </fieldset>
    );
}
