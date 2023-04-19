import {useEffect, useState} from "react";
import MainNavigation from "../components/MainNavigation";

function PersonFieldset({formData, onChange, personOptions = []}) {

    // (cf. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
    const {person} = formData;

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
    </fieldset>;
}

function DateTimeFieldset({formData, onChange}) {

    const {date, time} = formData;

    return <fieldset>
        <label htmlFor="date" className="form-label">Datum:</label>
        {/* Autofocus is problematic! */}
        {/* cf. https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus */}
        <input id="date" name="date" type="date" value={date} onChange={onChange}
               required
               className="form-control"
               autoFocus="autofocus"/>
        <label htmlFor="time" className="form-label">Zeit:</label>
        <input id="time" name="time" type="time" value={time} onChange={onChange}
               min="12:00"
               max="13:00"
               step="3600"
               required
               className="form-control"/>
    </fieldset>;
}

function OfferFieldset({formData, onChange}) {

    const {lunchType} = formData;

    return <fieldset>
        <legend>Angebot/Menü:</legend>
        <div className="form-check">
            {/* Autofocus is problematic! */}
            {/* cf. https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus */}
            <input id="vegetarian" name="lunchType" type="radio" value="vegetarian"
                   checked={lunchType === "vegetarian"} onChange={onChange}
                   className="form-check-input"
                   required
                   autoFocus="autofocus"/>
            <label htmlFor="vegetarian" className="form-check-label">Vegetarisch</label>
        </div>
        <div className="form-check">
            <input id="meat" name="lunchType" type="radio" value="meat"
                   checked={lunchType === "meat"} onChange={onChange}
                   className="form-check-input"
                   required/>
            <label htmlFor="meat" className="form-check-label">Fleisch</label>
        </div>
        <div className="form-check">
            <input id="salad-only" name="lunchType" type="radio" value="salad-only"
                   checked={lunchType === "salad-only"} onChange={onChange}
                   className="form-check-input"
                   required/>
            <label htmlFor="salad-only" className="form-check-label">Nur Salat</label>
        </div>
    </fieldset>;
}

// cf. https://react.dev/learn/sharing-state-between-components#step-3-add-state-to-the-common-parent
function Step({isCurrent, children}) {
    if (!isCurrent) {
        return null;
    }
    return children;
}

export default function LunchRegistration() {

    const authToken = localStorage.getItem("auth") ?? null;

    const currentDateTimeISO = new Date().toISOString();
    const defaultDate = currentDateTimeISO.split("T")[0];

    const initialFormData = {
        date: defaultDate,
        time: "12:00",
        person: "",
        lunchType: null
    };

    const [formData, setFormData] = useState(initialFormData);
    const [personOptions, setPersonOptions] = useState([]);

    const [status, setStatus] = useState({
        message: "",
        type: ""
    });

    const TOTAL_STEPS = 3;
    const [currentStep, setCurrentStep] = useState(0);

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
                    setStatus({
                        message: "Fehler beim Laden der Personenliste: " + response.statusText,
                        type: "error"
                    });
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

    }, [authToken]);


    function handleChange(event) {
        const value = event.target.value;
        console.log(event.target.name, ":", value);

        // Concise arrow function
        // cf. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
        setFormData(prevState => (
            {
                // cf. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#spread_properties
                ...prevState,
                [event.target.name]: value
            }
        ));

        // Equivalent to (with usual block body):

        // setFormData((prevState) => {
        //     const newState = {
        //         ...prevState,
        //         [event.target.name]: value
        //     };
        //     return newState;
        // });

        // Equivalent to (with traditional anonymous function):

        // setFormData(function (prevState){
        //     const newState = {
        //         ...prevState,
        //         [event.target.name]: value
        //     };
        //     return newState;
        // });

    }

    function resetForm() {
        setFormData(initialFormData);
        setCurrentStep(0);
    }

    function handlePrev(event) {
        if (0 < currentStep) {
            setCurrentStep(prevState => prevState - 1);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // cf. https://developer.mozilla.org/en-US/docs/Web/API/Event/Comparison_of_Event_Targets
        // cf. https://stackoverflow.com/questions/10086427/what-is-the-exact-difference-between-currenttarget-property-and-target-property
        // cf. https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/reportValidity
        if (event.currentTarget.reportValidity()) {
            if (currentStep < TOTAL_STEPS - 1) {
                setCurrentStep(prevState => prevState + 1);
            } else {
                // cf. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_json_data
                try {
                    // cf. https://create-react-app.dev/docs/adding-custom-environment-variables/
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/dqdata`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            Key: crypto.randomUUID(),
                            Text: JSON.stringify(formData)
                        })
                    });
                    if (!response.ok) {
                        setStatus({
                            message: "Fehler beim Übermittlungs-Versuch: " + response.statusText,
                            type: "error"
                        });
                        return;
                    }
                    const responseObject = await response.json();
                    console.log(responseObject);
                    setStatus({
                        message: "Erfolgreiche Anmeldung.",
                        type: "success"
                    });
                    resetForm();
                } catch (error) {
                    console.error(error);
                    setStatus({
                        message: "Unerwarteter Fehler beim Übermittlungs-Versuch.",
                        type: "error"
                    });
                }
            }
        }
    }

    return (
        <div className="container">
            <header>
                <MainNavigation/>
            </header>
            <h1 className="container">Anmeldung für Mittagsmenü</h1>

            {/*cf. https://getbootstrap.com/docs/5.2/forms/overview/*/}
            <form onSubmit={handleSubmit} className="container">
                <Step isCurrent={currentStep === 0}>
                    <PersonFieldset formData={formData} onChange={handleChange} personOptions={personOptions}/>
                </Step>
                <Step isCurrent={currentStep === 1}>
                    <DateTimeFieldset formData={formData} onChange={handleChange}/>
                </Step>
                <Step isCurrent={currentStep === 2}>
                    <OfferFieldset formData={formData} onChange={handleChange}/>
                </Step>
                {0 < currentStep &&
                    <input type="button" className="btn btn-outline-primary" value="Zurück" onClick={handlePrev}/>
                }
                <input type="submit" className="btn btn-primary"
                       value={currentStep < TOTAL_STEPS - 1 ? "Weiter" : "Übermitteln"}/>
            </form>
            <div
                className={`container ${status.type === "error" ? "text-danger" : null} ${status.type === "success" ? "text-success" : null}`}>
                {status.message}
            </div>
        </div>
    );
}
