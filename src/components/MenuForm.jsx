// import React, { useEffect, useRef } from "react";


function MenuForm() {

    return (

        <div>
            <br></br>
            <form id="neuer_eintrag" method="get">
                <legend>Zusätzliche Angebote</legend>

                {/* <label id="neuer_eintrag"></label><br></br> */}
                <label for="descript"> Beschreibung</label>
                <input type="text" name="descript" id="user_input" required></input>
                <label for="preis"> Preis</label>
                <input type="number" name="preis" id="user_input" required></input>
                <input type="submit" value="+" ></input>
            </form>
        </div>

    )
}

export default MenuForm;