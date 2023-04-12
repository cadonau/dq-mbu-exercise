import MainNavigation from "../components/MainNavigation";
import LunchItemForm from "../components/LunchItemForm";
import {useState} from "react";

function LunchMenu() {

    const [lunchItems, setLunchItems] = useState([
        {
            description: "Tagesmenü",
            price: 8.00,
            id: crypto.randomUUID() // cf. https://react.dev/learn/rendering-lists#where-to-get-your-key
        },
        {
            description: "Vegetarischer Tageshit",
            price: 9.00,
            id: crypto.randomUUID() // cf. https://react.dev/learn/rendering-lists#where-to-get-your-key
        }
    ]);

    function addLunchItem(lunchItem) {
        lunchItem.id = crypto.randomUUID();
        setLunchItems(prevState => ([
            ...prevState,
            lunchItem
        ]));
    }

    // cf. https://react.dev/learn/updating-arrays-in-state#making-other-changes-to-an-array
    const sortedLunchItems = [...lunchItems].sort((a, b) => a.price - b.price);

    return (
        <div className="container">
            <header>
                <MainNavigation/>
            </header>
            <h1>Aktuelle Angebote</h1>


            <table className="table">
                <caption>Alle Preisangaben in CHF</caption>
                <thead>
                <tr>
                    <th>Angebot</th>
                    <th>Preis</th>
                </tr>
                </thead>
                <tbody>
                {sortedLunchItems.map(item =>
                    // cf. https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
                    <tr key={item.id}>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                    </tr>
                )}
                </tbody>
            </table>

            <LunchItemForm onItemAddition={addLunchItem}/>

        </div>

    );
}

export default LunchMenu;
