import React, {useState} from "react";

export default function LunchItemForm({onItemAddition}) {

    const [formValues, setFormValues] = useState({
        description: "",
        price: ""
    });

    function handleInputChange(event) {
        const inputElement = event.target;
        setFormValues(prevState => ({
            ...prevState,
            [inputElement.name]: inputElement.value
        }));
        const isValid = inputElement.checkValidity();
        if (isValid) {
            inputElement.classList.add("is-valid");
            inputElement.classList.remove("is-invalid");
        } else {
            inputElement.classList.add("is-invalid");
            inputElement.classList.remove("is-valid");
        }
    }

    function resetForm() {
        setFormValues({
            description: "",
            price: ""
        });
        const inputs = document.querySelectorAll(".needs-validation");
        inputs.forEach(input => {
            input.classList.remove("is-valid");
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        onItemAddition(formValues);
        resetForm();
    }

    return (
        // cf. https://getbootstrap.com/docs/5.2/forms/overview/
        <form onSubmit={handleSubmit} className="row">
            <div className="col">
                <label htmlFor="description" className="form-label">Angebot</label>
                <input id="description" name="description" type="text" value={formValues.description}
                       onChange={handleInputChange}
                       required
                       minLength="3"
                       className="form-control needs-validation"/>
            </div>
            <div className="col">
                <label htmlFor="price" className="form-label">Preis</label>
                <input id="price" name="price" type="number" value={formValues.price} onChange={handleInputChange}
                       required
                       min="1"
                       max="100"
                       step="0.05"
                       list="price-options"
                       className="form-control needs-validation"/>
                <datalist id="price-options">
                    <option value="8"/>
                    <option value="9"/>
                    <option value="10"/>
                </datalist>
            </div>
            <div className="col align-self-end">
                <input type="submit" value="Hinzufügen" className="btn btn-secondary"/>
            </div>
        </form>
    );
}
