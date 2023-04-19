export default function OfferFieldset({formData, onChange, isActive = true}) {

    const {lunchType} = formData;

    if (!isActive) {
        return null;
    }

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
