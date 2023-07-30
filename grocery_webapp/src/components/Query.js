let query = "";

const findWordEntered = (searchedWord) => {
    query = searchedWord;
    console.log(query);
}

export {query, findWordEntered};