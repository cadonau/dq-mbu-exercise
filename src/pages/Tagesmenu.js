
import MainNavigation from "../components/MainNavigation";
import MenuForm from "../components/MenuForm";
import MenuFormReact from "../components/MenuFormReact";

function Tagesmenu() {


    return (
        <div>
            <header>
                <MainNavigation />
            </header>
            <h1>
                <p>Aktuelles Angebot Alle Preisangaben in CHF</p>
            </h1>


            <table>
                <thead>
                    <tr>
                        <td>Tagesmenü</td>
                        <td>8.00</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Vegi-Hit</td>
                        <td>9.00</td>
                    </tr>
                </tbody>
            </table>

            <MenuForm />
            <br></br>
            <MenuFormReact />

        </div>

    );
}

export default Tagesmenu;