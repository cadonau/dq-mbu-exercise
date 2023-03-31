// import MenuFormFinal from "../components/MenuFormFinal";
import MainNavigation from "../components/MainNavigation";
import MenuFormUseState from "../components/MenuFormUseState";

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
            <hr />
            <MenuFormUseState />
            <hr />
            {/* <MenuFormFinal /> */}

        </div>

    );
}

export default Tagesmenu;