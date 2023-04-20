export default function DateTimeFieldset({formData, onChange, isActive = true}) {

    const {date, time} = formData;

    if (!isActive) {
        return null;
    }

    return <fieldset>
        <label htmlFor="date" className="form-label">Datum:
            <span aria-hidden="true">*</span>
        </label>
        {/* Autofocus is problematic! */}
        {/* cf. https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus */}
        <input id="date" name="date" type="date" value={date} onChange={onChange}
               required
               className="form-control"
               autoFocus="autofocus"/>
        <label htmlFor="time" className="form-label">Zeit:
            <span aria-hidden="true">*</span>
        </label>
        <input id="time" name="time" type="time" value={time} onChange={onChange}
               min="12:00"
               max="13:00"
               step="3600"
               required
               className="form-control"/>
    </fieldset>;
}
