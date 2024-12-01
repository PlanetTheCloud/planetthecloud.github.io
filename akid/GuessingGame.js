async function preloadImages(imageUrls) {
    const promises = [];
    const images = [];
    const number_of_urls = imageUrls.length

    for (let i = 0; i < number_of_urls; i++) {
        const img = new Image();
        images.push(img);
        promises.push(new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        }));
        img.src = imageUrls[i];
    }
    return Promise.all(promises).then(() => images);
};

const GuessingGame = {
    elements: {
        operator: {
            name: document.getElementById('operator_name'),
            rarity: document.getElementById('operator_rarity'),
            // To avoid confusion with "class"
            class_name: document.getElementById('operator_class_name'),
            class_image: document.getElementById('operator_class_image'),
            art: document.getElementById('operator_art')
        },
        game: {
            menu: document.getElementById('game_menu'),
            menu_content: document.getElementById('game_menu_content'),
            stats: document.getElementById('game_statistics'),
            main: document.getElementById('game_main'),
            answer_select: document.getElementById('game_answer_select'),
            score: {
                correct: document.getElementById('game_score_correct'),
                incorrect: document.getElementById('game_score_incorrect')
            },
            score_limit: {
                correct: document.getElementById('game_score_limit_correct'),
                incorrect: document.getElementById('game_score_limit_incorrect'),
            }
        }
    },
    stats: {
        guess_made: 0,
        games_played: 0,
        games_won: 0,
        games_lost: 0,
        correct_guess: 0,
        incorrect_guess: 0,
    },
    memory: {
        current_game: {
            score: {
                correct: 0,
                incorrect: 0
            },
            score_limit: {
                correct: 0,
                incorrect: 0
            },
        },
        current_question: {
            selected_answer: null,
            answered: false,
            operator: {}
        }
    },
    pool: {
        answeredCorrectly: [],
        operators: OPERATOR_LIST,
        classes: ['Vanguard', 'Sniper', 'Medic', 'Caster', 'Guard', 'Defender', 'Supporter', 'Specialist'],
        pick_not_answered() {
            let notAnsweredOperators = this.operators.filter(operator => 
                !this.answeredCorrectly.includes(operator.link)
            );
    
            if (notAnsweredOperators.length > 0) {
                let randomIndex = Math.floor(Math.random() * notAnsweredOperators.length);
                return notAnsweredOperators[randomIndex];
            } else {
                return null;
            }
        },
        mark_answered_correctly(link) {
            this.answeredCorrectly.push(link);
        },
        reset_pool() {
            this.answeredCorrectly = [];
        }
    },
    display: {
        set_operator_data(data) {
            let operator = {
                name: null,
                rarity: null,
                class: null,
                image: null
            }
            GuessingGame.memory.current_question.operator = { ...operator, ...data}
        },
        render_game_menu(games) {
            let toRender = '';
            games.forEach(g => {
                toRender += `<div class="col-3">
                        <div class="card option-bg text-white border border-2 border-white">
                            <img src="assets/game/${g.icon}.png" class="card-img-top p-4">
                            <div class="card-body">
                                <h5 class="card-title">${g.name}</h5>
                                <div class="d-grid">
                                    <button onclick="GuessingGame.game.start('${g.key}')" class="btn btn-light mt-2"><b class="fs-4">Start Game</b></b>
                                </div>
                            </div>
                        </div>
                    </div>`;
            });
            GuessingGame.elements.game.menu_content.innerHTML = toRender;
        },
        render_operator_data(reveal=false) {
            let data = GuessingGame.memory.current_question.operator;
            GuessingGame.elements.operator.art.src = `assets/characters/${data.image}`;

            if (!reveal) {
                GuessingGame.elements.operator.name.innerText = "? ? ?";
                GuessingGame.elements.operator.rarity.innerHTML = `<img src="assets/game/qmark.png" class="img-fluid qmark">`.repeat(6);
                GuessingGame.elements.operator.class_name.innerText = "???";
                GuessingGame.elements.operator.class_image.src = "assets/game/qmark.png";
                return;
            }
            
            GuessingGame.elements.operator.name.innerText = data.name;
            GuessingGame.elements.operator.name.style.fontSize = (data.name.length > 20) ? "1.6rem" : "2.25rem";
            GuessingGame.elements.operator.rarity.innerHTML = `<img src="assets/game/star.webp" class="img-fluid star">`.repeat(data.rarity);
            GuessingGame.elements.operator.class_name.innerText = data.class;
            GuessingGame.elements.operator.class_image.src = `assets/characters/class/${data.class.toLowerCase()}.png`;
        },
        render_options(options) {
            GuessingGame.elements.game.answer_select.innerHTML = options;
        },
        render_stats() {
            let toRender = '';
            for (const key in GuessingGame.stats) {
                if (Object.prototype.hasOwnProperty.call(GuessingGame.stats, key)) {
                    toRender += `${key}: ${GuessingGame.stats[key]}<br>`;
                }
            }

            toRender += `questions_left: ${GuessingGame.pool.operators.length - GuessingGame.pool.answeredCorrectly.length}<br>`;
            GuessingGame.elements.game.stats.innerHTML = toRender;
        }
    },
    game: {
        answer: {
            after_answered_taps: 0,
            select(answer) {
                if (GuessingGame.memory.current_question.answered) {
                    this.after_answered_taps++;
                    if (this.after_answered_taps > 1) {
                        GuessingGame.game.next_question_or_end();
                        this.after_answered_taps = 0;
                    }
                    return;
                }

                if (GuessingGame.memory.current_question.selected_answer == answer) {
                    return this.confirm_selection(answer);
                }
                GuessingGame.memory.current_question.selected_answer = answer;

                let GAME = GuessingGame.games[GuessingGame.memory.current_game.type];
                GAME.render_options(answer);
            },
            confirm_selection(answer) {
                GuessingGame.memory.current_question.answered = true;

                let GAME = GuessingGame.games[GuessingGame.memory.current_game.type];
                if (GAME.check_answer(answer)) {
                    GuessingGame.memory.current_game.score.correct++;
                    GuessingGame.stats.correct_guess++;
                    GuessingGame.pool.mark_answered_correctly(
                        GuessingGame.memory.current_question.operator.link
                    );
                } else {
                    GuessingGame.memory.current_game.score.incorrect++;
                    GuessingGame.stats.incorrect_guess++;
                }
                GuessingGame.stats.guess_made++;

                GAME.render_options(answer, true);
                GuessingGame.game.display_score();
                GuessingGame.display.render_operator_data(true);
            }
        },
        start(key) {
            this.reset_game_state();
            GuessingGame.memory.current_game.type = key;

            let GAME = GuessingGame.games[key];
            GuessingGame.memory.current_game.score_limit = GAME.score_limit;
            this.display_score();

            GAME.set_new_question_and_display();
            GAME.render_options();

            GuessingGame.elements.game.menu.classList.add('d-none');
            GuessingGame.elements.game.main.classList.remove('d-none');

            document.querySelector('body').requestFullscreen();
        },
        next_question_or_end() {
            if (GuessingGame.memory.current_game.score.correct >= GuessingGame.memory.current_game.score_limit.correct) {
                Swal.fire({
                    icon: "success",
                    title: "Congratulations!\nYou deserve a reward.",
                    showConfirmButton: true,
                });
                GuessingGame.stats.games_won++;
                return GuessingGame.game.end();
            }
            if (GuessingGame.memory.current_game.score.incorrect >= GuessingGame.memory.current_game.score_limit.incorrect) {
                Swal.fire({
                    icon: "error",
                    title: "Game Over.",
                    showConfirmButton: true,
                });
                GuessingGame.stats.games_lost++;
                return GuessingGame.game.end();
            }

            let GAME = GuessingGame.games[GuessingGame.memory.current_game.type];
            GAME.set_new_question_and_display();
            GAME.render_options();
            GuessingGame.memory.current_question.answered = false;
            GuessingGame.memory.current_question.selected_answer = null;
        },
        end() {
            GuessingGame.display.render_stats();
            this.reset_game_state();
            GuessingGame.stats.games_played++;
            GuessingGame.elements.game.menu.classList.remove('d-none');
            GuessingGame.elements.game.main.classList.add('d-none');
        },
        display_score() {
            GuessingGame.elements.game.score.correct.innerText = GuessingGame.memory.current_game.score.correct;
            GuessingGame.elements.game.score.incorrect.innerText = GuessingGame.memory.current_game.score.incorrect;
            GuessingGame.elements.game.score_limit.correct.innerText = GuessingGame.memory.current_game.score_limit.correct;
            GuessingGame.elements.game.score_limit.incorrect.innerText = GuessingGame.memory.current_game.score_limit.incorrect;
        },
        reset_game_state() {
            GuessingGame.memory = {
                current_game: {
                    score: {
                        correct: 0,
                        incorrect: 0
                    },
                    score_limit: {
                        correct: 0,
                        incorrect: 0
                    },
                },
                current_question: {
                    selected_answer: null,
                    answered: false,
                    operator: {}
                }
            }
        },
        set_question(question) {
            GuessingGame.memory.current_question.operator = question;
        },
        get_extra_classes_for_option(selected, option, correctAnswer, reveal) {
            if (!reveal) {
                return selected == option ? 'border-primary option-bg' : 'border-light option-bg';
            }
        
            // Reveal the answer
            if (selected == correctAnswer) {
                return correctAnswer == option ? 'border-success bg-success' : 'border-light option-bg';
            }
        
            // Player selected the wrong answer
            if (correctAnswer == option) {
                return 'border-success bg-success';
            }
            if (option == selected) {
                return 'border-primary bg-danger';
            }
        
            // Default style
            return 'border-light option-bg';
        }
    },
    games: {
        rarity_guesser: {
            score_limit: {
                correct: 3,
                incorrect: 2
            },
            set_new_question_and_display() {
                let operator = GuessingGame.pool.pick_not_answered();
                GuessingGame.game.set_question(operator);
                GuessingGame.display.render_operator_data();
            },
            render_options(selected=null, reveal=false) {
                let toRender = '';
                let correctAnswer = this.get_correct_answer();

                [6, 5, 4].forEach(option => {
                    let extraClasses = GuessingGame.game.get_extra_classes_for_option(selected, option, correctAnswer, reveal);
                    toRender += `<div class="card mb-4 border border-3 ${extraClasses}" onclick="GuessingGame.game.answer.select(${option})">
                            <div class="card-body text-white">
                                <div class="row d-flex justify-content-center">
                                    ${`<img src="assets/game/star_option.png" class="img-fluid star-option">`.repeat(option)}
                                    (${option})
                                </div>
                            </div>
                        </div>`;
                });

                GuessingGame.display.render_options(toRender);
            },
            check_answer(answer) {
                return String(this.get_correct_answer()) === String(answer);
            },
            get_correct_answer() {
                return GuessingGame.memory.current_question.operator.rarity;
            },
        },
        class_guesser: {
            score_limit: {
                correct: 3,
                incorrect: 2
            },
            set_new_question_and_display() {
                let operator = GuessingGame.pool.pick_not_answered();
                GuessingGame.game.set_question(operator);
                GuessingGame.display.render_operator_data();
            },
            render_options(selected=null, reveal=false) {
                let toRender = '<div class="row text-center">';
                let correctAnswer = this.get_correct_answer();

                GuessingGame.pool.classes.forEach(option => {
                    let extraClasses = GuessingGame.game.get_extra_classes_for_option(selected, option.toLowerCase(), correctAnswer, reveal);
                    toRender += `<div class="col-4">
                                <div class="card mb-4 border border-3 ${extraClasses}" onclick="GuessingGame.game.answer.select('${option.toLowerCase()}')">
                                    <div class="card-body text-white">
                                        <img src="assets/characters/class/${option.toLowerCase()}.png" class="img-fluid">
                                        ${option}
                                    </div>
                                </div>
                            </div>`;
                });
                toRender += '</div>'

                GuessingGame.display.render_options(toRender);
            },
            check_answer(answer) {
                return String(this.get_correct_answer()) === String(answer);
            },
            get_correct_answer() {
                return GuessingGame.memory.current_question.operator.class.toLowerCase();
            },
        },
    },
    run() {
        let games = [
            {
                name: "Rarity Guesser",
                key: "rarity_guesser",
                icon: "logo_rarity"
            },
            {
                name: "Class Guesser",
                key: "class_guesser",
                icon: "logo_class"
            },
        ];

        // Render main game selector
        this.display.render_game_menu(games);
        GuessingGame.display.render_stats();

        // Preload all images
        preloadImages(['assets/game/star_option.png']);
        preloadImages(this.pool.operators.map(o => `assets/characters/${o.image}`));
        preloadImages(this.pool.classes.map(c => `assets/characters/class/${c.toLowerCase()}.png`));
    }
}

GuessingGame.run()