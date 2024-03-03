export const addNewCategory = (newCategory) => {
    const categories = localStorage.getItem('usersCategories')?.length > 0 ?
        localStorage.getItem('usersCategories') :
        [];
    categories.push({
        value: newCategory,
        label: newCategory,
    })
}

export const getCategories = () => {
    const categories = localStorage.getItem('usersCategories')?.length > 0 ?
        localStorage.getItem('usersCategories') :
        [];
    return categories
}