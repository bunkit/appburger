export const updateObject = (oldObject, properties) => {
    return {
        ...oldObject,
        ...properties
    }
}
