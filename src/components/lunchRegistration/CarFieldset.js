export default function CarFieldset({formData, onChange, isActive = true}) {

    const {licensePlate} = formData;

    if (!isActive) {
        return null;
    }

    return <fieldset>
        <label htmlFor="date" className="form-label">Autonummer (AB 123456):</label>
        {/* cf. https://www.w3.org/WAI/tutorials/forms/validation/#validating-patterned-input */}
        <input id="licensePlate" name="date" type="text" value={licensePlate} onChange={onChange}
               pattern="[A-Z]{2} [0-9]{1,6}"
               placeholder="DQ 8953"
               className="form-control"/>
    </fieldset>;
}
