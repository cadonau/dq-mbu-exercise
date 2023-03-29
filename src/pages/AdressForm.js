import MainNavigation from "../components/MainNavigation";


function AdressForm() {
    return (
        <div>
            <header>
                <MainNavigation />
            </header>
            <html>
                <form>
                    <label>
                        Vorname:
                        <input type="text" />
                    </label>

                    <label>
                        Name:
                        <input type="text" />
                    </label>
                    <label>
                        Email:
                        <input type="text" />
                    </label>
                    <label>
                        Telefonnr.:
                        <input type="text" />
                    </label>
                </form>
            </html>
        </div>



    );
}

export default AdressForm;

