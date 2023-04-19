import {useEffect, useState} from "react";

export default function PersonFieldset({formData, onChange, isActive = true}) {

    // (cf. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
    const {person} = formData;

    const [personOptions, setPersonOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const authToken = localStorage.getItem("auth") ?? null;

    useEffect(() => {

        // see returned cleanup function below
        const controller = new AbortController();

        // cf. https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook
        (async () => {
            try {
                // cf. https://create-react-app.dev/docs/adding-custom-environment-variables/
                const response = await fetch(`${process.env.REACT_APP_API_URL}/pers?query="Inaktiv=false"&limit=0&attributes=PersNr,Name,Vorname,VornameName,NameVorname`, {
                    signal: controller.signal,
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                if (!response.ok) {
                    setErrorMessage("Fehler beim Laden der Personenliste: " + response.statusText);
                    return;
                }
                const responseObject = await response.json();
                console.log(responseObject);
                setPersonOptions(responseObject.data);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Fetch request successfully aborted.");
                } else {
                    console.error(error);
                    setErrorMessage("Unerwarteter Fehler beim Laden der Personenliste.");
                }
            }
        })();

        // cf. https://react.dev/reference/react/useEffect
        // cf. https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/
        return () => {
            controller.abort();
        };

    }, [authToken]);


    // cf. https://react.dev/learn/conditional-rendering#conditionally-returning-nothing-with-null
    if (!isActive) {
        return null;
    }

    return <fieldset>
        <label htmlFor="person" className="form-label">Person:</label>
        <select id="person" name="person" value={person} onChange={onChange}
                required
                className="form-select">
            <option value="">Person auswählen</option>

            {personOptions.map(({PersNr, NameVorname}) =>
                <option key={PersNr} value={PersNr}>{NameVorname}</option>
            )}
        </select>
        {errorMessage &&
            <p className="text-danger">{errorMessage}</p>
        }
    </fieldset>;
}
