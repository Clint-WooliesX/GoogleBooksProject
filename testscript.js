console.log('Ready...');

const submitSearch = (input) => {
    const cleanedSearch = input.split(' ').join('+');
    console.log(cleanedSearch);
};