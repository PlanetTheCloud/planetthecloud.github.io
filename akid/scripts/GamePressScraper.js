var scrapeE2Art = (function () {
    let results = [];
    let elements = document.getElementsByClassName('views-field-field-full-portrait-elite-2');

    elements = [...elements].filter(e => {
        return e.firstChild.children.length == 2;
    });

    results = elements.map(e => {
        let x = e.firstChild;
        return {
            name: x.innerText,
            link: x.lastElementChild.href,
            image: x.lastElementChild.firstElementChild.src
        }
    });

    let links = results.map(e => {
        return e.link;
    });

    return {
        links,
        results
    };
});

var Scraper = {
    state: {
        current_index: 0,
        next_index: 1,
        results: [],
        toScrape: [],
    },
    load_state() {
        this.state = JSON.parse(localStorage.getItem('gps_data') || '{"results":[], "toScrape":[], "current_index": 0, "next_index": 1}');
    },
    save_state() {
        localStorage.setItem('gps_data', JSON.stringify(this.state));
    },
    goto(i) {
        let nextLink = this.state.toScrape[i];
        setTimeout(() => {
            window.location.href = nextLink;
        }, 2000);
    },
    scrape_current() {
        let profession = document.getElementsByClassName('profession-cell')[0].firstElementChild;
        this.state.results.push({
            link: window.location.href,
            class: profession.lastElementChild.innerText,
            class_image: profession.firstElementChild.src,
            rarity: document.getElementsByClassName('rarity-cell')[0].children.length,
        });
        this.save_state();
    },
    scrape_data_and_goto_next() {
        if (this.state.current_index >= this.state.toScrape.length) {
            console.log("Scraping complete");
            return;
        }

        this.scrape_current();

        this.state.current_index = this.state.next_index;
        this.state.next_index += 1;
        
        this.save_state();

        console.log(`Scraping this page done, now we have ${this.state.results.length} data.`);

        this.goto(this.state.current_index);
    },
    init(toScrape) {
        this.state.toScrape = toScrape;
        this.save_state();
    },
    run() {
        this.load_state();
        if (this.state.toScrape.length < 1) {
            return;
        }
        if (this.state.current_index == 0 && window.location.href != this.state.toScrape[0]) {
            return this.goto(0);
        }
        console.log('Starting scrape for this page.');
        this.scrape_data_and_goto_next();
    }
}

window.addEventListener('DOMContentLoaded', function() {
    Scraper.run();
});
