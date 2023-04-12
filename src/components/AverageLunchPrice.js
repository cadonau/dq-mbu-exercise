export default function AverageLunchPrice({lunchItems = []}) {
    const itemCount = lunchItems.length;

    // cf. https://react.dev/learn/conditional-rendering#conditionally-returning-nothing-with-null
    if (itemCount < 2) {
        return null;
    }

    // cf. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#sum_of_values_in_an_object_array
    const priceSum = lunchItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0);
    const averagePrice = priceSum / itemCount;

    return (
        <div>
            Durchschnittspreis: {averagePrice}
        </div>
    );
}
