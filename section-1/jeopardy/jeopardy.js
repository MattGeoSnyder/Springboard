// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

class Board {
    constructor(){
        this.board = [];
        for (let i = 0; i < NUM_QUESTIONS_PER_CAT; i++) {
            this.board.push([]);
            for (let j = 0; j < NUM_CATEGORIES; j++){
                this.board[i].push(null);
            }
        }
    }
    answered = false;
}

let categories = [];
const NUM_CATEGORIES = 6;
const NUM_QUESTIONS_PER_CAT = 5;
let jeopardyBoard = new Board();

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    let req = await axios.get('https://jservice.io/api/categories?count=100');
    categories = req.data;
    return sampleCategories();
}

function sampleCategories() {
    let categoryIDs = new Set;
    while (categoryIDs.size < NUM_CATEGORIES) {
        let rand = Math.floor(Math.random()*100);
        if (categories[rand].clues_count >= 5){
            categoryIDs.add(categories[rand].id);
        }
    }
    return [...categoryIDs];
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    let req = await axios.get('https://jservice.io/api/category?id=' + catId);
    return req.data;
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
    let head = document.querySelector('#jeopardy thead');
    let body = document.querySelector('#jeopardy tbody');
    let headRow = document.createElement('tr');

    let categoryIDs = await getCategoryIds();
    for (let i = 0; i < NUM_CATEGORIES; i++) {
        let category = await getCategory(categoryIDs[i]);
        let newTd = document.createElement('td');
        newTd.innerText = category.title.toUpperCase();
        headRow.appendChild(newTd);

        fillDataTable(category, i);
    }
    head.appendChild(headRow);

    for (let i = 0; i < NUM_QUESTIONS_PER_CAT; i++){
        let newTr = document.createElement('tr');
        for (let j = 0; j < NUM_CATEGORIES; j++){
            let newTd = document.createElement('td');
            newTd.setAttribute('row',`${i}`);
            newTd.setAttribute('col', `${j}`);
            newTd.innerText = "?";
            newTr.appendChild(newTd);
        }
        body.appendChild(newTr);    
    }
}

function fillDataTable(category, colInd) {
    for (let i = 0; i < NUM_QUESTIONS_PER_CAT; i++){
        jeopardyBoard.board[i][colInd] = {
            category: category.title,
            question: category.clues[i].question,
            answer: category.clues[i].answer
        };
    }
}


/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
    let status = evt.target.getAttribute('showing');

    if (!status){
        let question = jeopardyBoard.board[evt.target.attributes.row.value][evt.target.attributes.col.value].question;
        console.log(question);
        evt.target.innerText = question;
        evt.target.setAttribute('showing', 'question');
    } else if (status === 'question') {
        let answer = jeopardyBoard.board[evt.target.attributes.row.value][evt.target.attributes.col.value].answer;
        evt.target.innerText = answer;
        evt.target.setAttribute('showing', 'answer'); 
    } else {
        return;
    }

}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    $('#jeopardy').empty();
    $('#spin-container').show();
    $('#start').text('start');
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    $('#spin-container').hide();
    $('#jeopardy').show();
    $('#start').text('Reset');
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    await fillTable();
    hideLoadingView();
}

/** On click of start / restart button, set up game. */
$('#jeopardy').hide();
$('#start').on('click', setupAndStart);


/** On page load, add event handler for clicking clues */
// I don't understand why we would do this after building the HTML Table.
// It seems hard to wait for the html content to be loaded.
$('#jeopardy tbody').on('click', handleClick);

let spinner = document.querySelector('#spin-container i');
spinner.classList.add('fa-8x');