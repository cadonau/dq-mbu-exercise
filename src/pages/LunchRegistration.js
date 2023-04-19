import {useState} from "react";
import MainNavigation from "../components/MainNavigation";
import PersonFieldset from "../components/lunchRegistration/PersonFieldset";
import DateTimeFieldset from "../components/lunchRegistration/DateTimeFieldset";
import OfferFieldset from "../components/lunchRegistration/OfferFieldset";

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

    const [status, setStatus] = useState({
        message: "",
        type: ""
    });

    const TOTAL_STEPS = 3;
    const [currentStep, setCurrentStep] = useState(0);

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
                {/* cf. https://react.dev/learn/conditional-rendering */}
                {/* (~ cf. https://react.dev/learn/sharing-state-between-components#step-3-add-state-to-the-common-parent) */}
                <PersonFieldset formData={formData} onChange={handleChange} isActive={currentStep === 0}/>
                <DateTimeFieldset formData={formData} onChange={handleChange} isActive={currentStep === 1}/>
                <OfferFieldset formData={formData} onChange={handleChange} isActive={currentStep === 2}/>
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
