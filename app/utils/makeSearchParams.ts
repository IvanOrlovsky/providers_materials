export default function makeSearchParams(
    providerEditData: { [key: string]: string | object },
    providerMaterialsEditData: { [key: string]: string | object }
) {
    const searchParams = new URLSearchParams();


    Object.keys(providerEditData).forEach((key) => {
        const value = providerEditData[key];
        const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
        searchParams.append(key, stringValue);
    });


    Object.keys(providerMaterialsEditData).forEach((key) => {
        const value = providerMaterialsEditData[key];
        const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
        searchParams.append(key, stringValue);
    });


    const queryString = searchParams.toString();

    return queryString ? `?${queryString}` : ''; 
}

