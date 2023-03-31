import React from "react";

function MenuFormFinal() {
    function handleSubmit(e) {
        e.preventDefault();


        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <fieldset>
                <legend>Zusätzliche Angebote</legend>
                <label name="descript">Beschreibung: </label>
                <input type="text" name="descript" id="userInput" required></input>
                <label name="price">Preis: </label>
                <input type="number" name="price" id="userInput" required></input>
                <input type="submit" value=" + " ></input>
            </fieldset>
        </form>
    )

}

export default MenuFormFinal;