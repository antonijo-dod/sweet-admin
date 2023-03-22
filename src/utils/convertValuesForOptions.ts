export function convertValuesForOptions(values) {
    const options = values.map(value => {
        return {
            value: value.id,
            label: value.name,
        };
    });
    return options;
}
