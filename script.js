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
            {roll: 5, elementId: ""},
            {roll: 3, elementId: ""},
            {roll: 1, elementId: ""}
        ];

        const delveAction = [
            {roll: 4, elementId: ""},
            {roll: 2, elementId: ""},
            {roll: 1, elementId: ""}
        ];

        // To do... (maybe, just to tidy up...)
        const newSceneFormats = [
            {roll: 6, elementId: ""}
        ]
        
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

        // // LISTENERS
        imgD6.addEventListener('click', () => {
            let roll = roll1d6();
            alert("You rolled a " + roll);
        });

        btnD6NewSceneFormat.addEventListener('click', () => {
            let result = 0
            const roll = Math.floor(Math.random() * 6) + 1;
            if (roll >= 6) {
                result = "Meanwhile...";
            } else if (roll >= 4 ) {
                result = "Quiet";
            } else {
                result = "Action";
            }
            displayD6NewSceneFormat.innerHTML = " " + result;
        });

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
            const twistFocusEntry = findTwistFocusRow(twist_focus_die);
            changeTargetElementToOrange(twistFocusEntry.element_id);

            let twist_action_die = roll1d6();
            const twistActionEntry = findTwistActionRow(twist_action_die);
            changeTargetElementToOrange(twistActionEntry.element_id);
        };


        btnForceRandomEvent.addEventListener('click', () => {
            twistYes();
        });

        // TO DO...
        btnDelvingJourneying.addEventListener('click', () => {

        });

        
        // // HELPERS 

        // Change Outcome elements to black
        function revertElementsToBlack(elements) {
            elements.forEach(element => {
                element.classList.remove('orange');
            });
        };

        

        // Change target element to orange
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

        

        // Find actionOutcome row by dice
        function findActionOutcomeRow(diceRoll) {
            return actionOutcomes.find(data => data.roll === diceRoll);
        };

        // Find twistFocus row by dice
        function findTwistFocusRow(diceRoll) {
            return twistFocus.find(data => data.roll <= diceRoll);
        };

        // Find twistAction row by dice
        function findTwistActionRow(diceRoll) {
            return twistAction.find(data => data.roll <= diceRoll);
        };

        function roll1d6() {
            return Math.floor(Math.random() * 6) +1;
        };
        
        

        // Option A is Likely
        btnD6a.addEventListener('click', () => {
            let elements = document.querySelectorAll('.outcomes, .focus, .action')
            revertElementsToBlack(elements);
            const rolla1 = roll1d6();
            const rolla2 = roll1d6();
            const result = (rolla1 >= rolla2) ? rolla1 : rolla2;
            const outcome = findActionOutcomeRow(result);

            changeTargetElementToOrange(outcome.element_id);
            twistCheck();

        });

        // Option A and B have Equal Chance
        btnD6x.addEventListener('click', () => {
            let elements = document.querySelectorAll('.outcomes, .focus, .action')
            revertElementsToBlack(elements);
            const result = roll1d6();
            const outcome = findActionOutcomeRow(result);

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
            const outcome = findActionOutcomeRow(result);
            
            changeTargetElementToOrange(outcome.element_id);
            twistCheck();
        });