const actionOutcomes = [
    {roll: 6, element_id: "outcome-6"},
    {roll: 5, element_id: "outcome-5"},
    {roll: 4, element_id: "outcome-4"},
    {roll: 3, element_id: "outcome-3"},
    {roll: 2, element_id: "outcome-2"},
    {roll: 1, element_id: "outcome-1"}
];

const twistFocus = [
    {roll: 5, element_id: "focus-5"},
    {roll: 3, element_id: "focus-3"},
    {roll: 1, element_id: "focus-1"}
];

const twistAction = [
    {roll: 4, element_id: "action-4"},
    {roll: 1, element_id: "action-1"}
];

const delveFocus = [
    {roll: 5, elementId: "delve-focus-5"},
    {roll: 3, elementId: "delve-focus-3"},
    {roll: 1, elementId: "delve-focus-1"}
];

const delveAction = [
    {roll: 4, elementId: "delve-action-4"},
    {roll: 2, elementId: "delve-action-2"},
    {roll: 1, elementId: "delve-action-1"}
];

// To do... (maybe, just to tidy up...)
const newSceneFormats = [
    {roll: 6, elementId: "Meanwhile..."},
    {roll: 4, elementId: "Quiet"},
    {roll: 1, elementId: "Action"}
];


const imgD6 = document.getElementById('img-d6');
const btnD6NewSceneFormat = document.getElementById('btn-d6-new-scene-format');
const displayD6NewSceneFormat = document.getElementById('display-d6-new-scene-format');
const btnD6a = document.getElementById('btn-d6-a');
const btnD6x = document.getElementById('btn-d6-x');
const btnD6b = document.getElementById('btn-d6-b');
const btnForceRandomEvent = document.getElementById('btn-force-random-event');
const detailTakingAction = document.getElementById('detail-taking-action');
const titleRandomEvent = document.getElementById('title-random-event');
const btnDelvingJourneying = document.getElementById('btn-delving-journeying');


function twistYes() {
    
    let elements;
    
    elements = document.querySelectorAll('.focus, .action')
    revertElementsToBlack(elements);

    // color pulse
    titleRandomEvent.classList.add('orange');
    setTimeout(() => {
        titleRandomEvent.classList.remove('orange');
    }, 1000);

    // movement animation (restart every time)
    titleRandomEvent.classList.remove('move-right-left');
    void titleRandomEvent.offsetWidth;
    titleRandomEvent.classList.add('move-right-left');


    let twist_focus_die = roll1d6();
    const twistFocusEntry = findRow(twistFocus, twist_focus_die);
    changeTargetElementToOrange(twistFocusEntry.element_id);

    let twist_action_die = roll1d6();
    const twistActionEntry = findRow(twistAction, twist_action_die);
    changeTargetElementToOrange(twistActionEntry.element_id);
};


btnForceRandomEvent.addEventListener('click', () => {
    twistYes();
});



// // HELPERS 

// Revert elements to black
function revertElementsToBlack(elements) {
    elements.forEach(element => {
        element.classList.remove('orange');
    });
};


// Change target elements to orange
function changeTargetElementToOrange(elementId) {
    const elementToColor = document.getElementById(elementId);
    elementToColor.classList.add('orange');
};


function twistCheck() {
    const twist_check = roll1d6();
    if ( twist_check == 1 ) {
        twistYes();
    }
};


// Access the particular array, and cross-reference the die roll with the row
function findRow(array, diceRoll) {
    return array.find(data => data.roll <= diceRoll);
};


function roll1d6() {
    return Math.floor(Math.random() * 6) +1;
};


// // LISTENERS
imgD6.addEventListener('click', () => {
    let roll = roll1d6();
    alert("You rolled a " + roll);
});

// New function for Meanwhile, Quiet, Action
btnD6NewSceneFormat.addEventListener('click', () => {
    let roll = roll1d6();
    const outcome = findRow(newSceneFormats, roll);
    displayD6NewSceneFormat.innerHTML = outcome.elementId;
});

// Option A is Likely
btnD6a.addEventListener('click', () => {
    let elements = document.querySelectorAll('.outcomes, .focus, .action')
    revertElementsToBlack(elements);
    const rolla1 = roll1d6();
    const rolla2 = roll1d6();
    const result = (rolla1 >= rolla2) ? rolla1 : rolla2;
    const outcome = findRow(actionOutcomes, result);

    changeTargetElementToOrange(outcome.element_id);
    twistCheck();

});

// Option A and B have Equal Chance
btnD6x.addEventListener('click', () => {
    let elements = document.querySelectorAll('.outcomes, .focus, .action')
    revertElementsToBlack(elements);
    
    const result = roll1d6();
    const outcome = findRow(actionOutcomes, result);

    changeTargetElementToOrange(outcome.element_id);
    twistCheck();
});

// Option B is Likely
btnD6b.addEventListener('click', () => {
    let elements = document.querySelectorAll('.outcomes, .focus, .action')
    revertElementsToBlack(elements);

    const rolla1 = roll1d6();
    const rolla2 = roll1d6();
    const result = (rolla1 >= rolla2) ? rolla2 : rolla1;
    const outcome = findRow(actionOutcomes, result);
    
    changeTargetElementToOrange(outcome.element_id);
    twistCheck();
});


btnDelvingJourneying.addEventListener('click', () => {
    let die;
    let entry;
    let elements = document.querySelectorAll('.delve-focus, .delve-event');
    revertElementsToBlack(elements);

    
    die = roll1d6();
    entry = findRow(delveFocus, die);
    changeTargetElementToOrange(entry.elementId);

    die = roll1d6();
    entry = findRow(delveAction, die);
    changeTargetElementToOrange(entry.elementId);

    function balls(array) {
        die = roll1d6();
        entry = findRow(array, die);
        changeTargetElementToOrange(entry.elementId);
    }
});

